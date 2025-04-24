from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import pickle
import os
import re

class ResumeParser:
    def __init__(self, model_path=None):
        """
        Initialize parser with optional path to pre-trained model
        Args:
            model_path: (str) Path to saved model file (.pkl)
        """
        self.model = SentenceTransformer('all-mpnet-base-v2')  # 768-dim embeddings
        self.job_profiles = {}
        
        if model_path and os.path.exists(model_path):
            self.load_model(model_path)

    def get_available_categories(self):
        """Return list of available job categories"""
        return list(self.job_profiles.keys())
    
    def preprocess(self, text):
        """Enhanced text cleaning while keeping technical terms"""
        # Lowercase and normalize whitespace
        text = text.lower().replace('\n', ' ')
        # Remove special characters but keep technical symbols
        text = re.sub(r'[^a-zA-Z0-9\s.,*+/!-]', '', text)
        # Collapse multiple spaces
        return ' '.join(text.split())
    
    def train(self, df, save_path=None):
        """
        Train the model on resume data
        Args:
            df: (DataFrame) Contains 'Category' and 'Resume' columns
            save_path: (str) Optional path to save trained model
        """
        print("Preprocessing resumes...")
        df['Cleaned_Resume'] = df['Resume'].apply(self.preprocess)
        
        print("Generating embeddings...")
        embeddings = np.array([self.model.encode(text) for text in df['Cleaned_Resume']])
        
        print("Creating job profiles...")
        for category, group in df.groupby('Category'):
            self.job_profiles[category] = {
                'embedding': embeddings[group.index].mean(axis=0),
                'sample_count': len(group)
            }
        
        if save_path:
            self.save_model(save_path)
    
    def save_model(self, path):
        """Save the trained model to disk"""
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, 'wb') as f:
            pickle.dump({
                'job_profiles': self.job_profiles,
                'model_version': 'all-mpnet-base-v2'
            }, f)
        print(f"Model saved to {path}")
    
    def load_model(self, path):
        """Load a pre-trained model from disk"""
        with open(path, 'rb') as f:
            data = pickle.load(f)
            self.job_profiles = data['job_profiles']
            assert data['model_version'] == 'all-mpnet-base-v2', "Model version mismatch"
        print(f"Loaded model with {len(self.job_profiles)} job categories")
    
    def score_resume(self, resume_text, job_category, verbose=False):
        """
        Score a resume against a job category
        Args:
            resume_text: (str) Resume content
            job_category: (str) Target job category
            verbose: (bool) Show scoring details
        Returns:
            float: Score between 0-10
        """
        if job_category not in self.job_profiles:
            if verbose:
                available = list(self.job_profiles.keys())
                print(f"Unknown category '{job_category}'. Available: {available}")
            return 0.0
        
        # Preprocess and encode
        cleaned_text = self.preprocess(resume_text)
        resume_embed = self.model.encode(cleaned_text)
        profile = self.job_profiles[job_category]
        
        # Calculate similarity
        similarity = cosine_similarity(
            [resume_embed],
            [profile['embedding']]
        )[0][0]
        
        # Original scaling (0-10)
        score = round(similarity * 10, 2)
        
        if verbose:
            print(f"Scoring against '{job_category}' (trained on {profile['sample_count']} samples)")
            print(f"Similarity: {similarity:.3f} → Score: {score}/10")
        
        return min(10, max(0, score))  # Ensure within bounds