from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
from pdfminer.high_level import extract_text
from pdfminer.layout import LAParams
from docx import Document
from resume_parser import ResumeParser
import os

app = Flask(__name__)
# Upload file configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Initialize parser (load trained model)
MODEL_PATH = 'models/resume_parser.pkl'
parser = ResumeParser(MODEL_PATH)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_pdf(filepath):
    """Extract text from PDF with layout preservation"""
    laparams = LAParams(
        line_overlap=0.5,
        char_margin=2.0,
        line_margin=0.5,
        word_margin=0.1,
        boxes_flow=0.5,
        detect_vertical=True,
        all_texts=True
    )
    try:
        return extract_text(filepath, laparams=laparams)
    except Exception as e:
        print(f"PDF extraction failed: {str(e)}")
        raise ValueError("Failed to extract text from PDF")
    

def extract_text_from_docx(filepath):
    """Extract text from Word documents"""
    try:
        doc = Document(filepath)
        return "\n".join([para.text for para in doc.paragraphs])
    except Exception as e:
        print(f"DOCX extraction failed: {str(e)}")
        raise ValueError("Failed to extract text from Word document")

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        resume_text = request.form.get('resume_text', '')
        job_category = request.form.get('job_category')
        uploaded_file = request.files.get('resume_file')

        # Check if file was uploaded
        if uploaded_file and uploaded_file.filename != '':
            if allowed_file(uploaded_file.filename):
                try:
                    # Save the file temporarily
                    filename = secure_filename(uploaded_file.filename)
                    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
                    uploaded_file.save(filepath)
                    
                    # Extract text
                    if filename.lower().endswith('.pdf'):
                        resume_text = extract_text_from_pdf(filepath)
                    elif filename.lower().endswith(('.docx', '.doc')):
                        resume_text = extract_text_from_docx(filepath)
                    # Clean up the temporary file
                    os.remove(filepath)
                except Exception as e:
                    return render_template('index.html',
                                         error=f"Error processing file: {str(e)}",
                                         categories=parser.get_available_categories())
            else:
                return render_template('index.html',
                                     error="Invalid file type. Allowed: PDF, DOC, DOCX",
                                     categories=parser.get_available_categories())
        
        # Validate inputs
        if not resume_text or not job_category:
            return render_template('index.html', 
                                 error="Please provide both resume text and job category",
                                 categories=parser.get_available_categories())
        
        # Score the resume
        try:
            score = parser.score_resume(resume_text, job_category)
            return render_template('index.html', 
                                 score=score,
                                 job_category=job_category,
                                 resume_text=resume_text,
                                 categories=parser.get_available_categories())
        except Exception as e:
            return render_template('index.html', 
                                 error=f"Error processing resume: {str(e)}",
                                 categories=parser.get_available_categories())
    # GET request - show form
    return render_template('index.html', categories=parser.get_available_categories())

@app.route('/about')
def about():
    return render_template('about.html')


# API for resume_text only
# @app.route('/api/score', methods=['POST'])
# def api_score():
#     """JSON API endpoint"""
#     data = request.get_json()
#     if not data or 'resume_text' not in data or 'job_category' not in data:
#         return jsonify({'error': 'Missing resume_text or job_category'}), 400
    
#     try:
#         score = parser.score_resume(data['resume_text'], data['job_category'])
#         return jsonify({
#             'score': score,
#             'job_category': data['job_category'],
#             'status': 'success'
#         })
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# API for both resume_text and resume_file
@app.route('/api/score', methods=['POST'])
def api_score():
    """JSON API endpoint"""
    data = request.get_json()
    if not data or ('resume_text' not in data and 'resume_file' not in data) or 'job_category' not in data:
        return jsonify({'error': 'Missing resume content or job_category'}), 400
    
    try:
        resume_text = data.get('resume_text', '')
        
        # Handle file upload via API if needed
        if not resume_text and 'resume_file' in data:
            # This would need base64 file handling for API
            return jsonify({'error': 'File upload via API not implemented'}), 400
            
        score = parser.score_resume(resume_text, data['job_category'])
        return jsonify({
            'score': score,
            'job_category': data['job_category'],
            'status': 'success'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)