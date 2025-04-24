// Initialize particles.js
document.addEventListener('DOMContentLoaded', function () {
    // Initialize particles
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800,
                    },
                },
                color: {
                    value: '#6c63ff',
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000',
                    },
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                    },
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                    },
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#6c63ff',
                    opacity: 0.4,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                    },
                },
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab',
                    },
                    onclick: {
                        enable: true,
                        mode: 'push',
                    },
                    resize: true,
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1,
                        },
                    },
                    push: {
                        particles_nb: 4,
                    },
                },
            },
            retina_detect: true,
        })
    }

    // Get the current path from the URL
    const currentPath = window.location.pathname

    // Get all navigation links
    const navLinks = document.querySelectorAll('.main-nav .nav-link')

    // Loop through each link
    navLinks.forEach((link) => {
        // Get the href attribute
        const href = link.getAttribute('href')

        // If the href matches the current path or
        // if we're on the homepage and the href is "/"
        if (href === currentPath) {
            // Add the "active" class
            link.classList.add('active')
        } else {
            // Remove the "active" class (if it exists)
            link.classList.remove('active')
        }
    })

    // Form elements
    const form = document.getElementById('resume-form')
    const submitBtn = document.querySelector('.submit-btn')
    const clearBtn = document.getElementById('clear-btn')
    const sampleBtn = document.getElementById('sample-btn')
    const resumeTextarea = document.getElementById('resume_text')
    const jobCategorySelect = document.getElementById('job_category')

    // Track if a file is selected
    let fileSelected = false

    // Sample resumes for demonstration
    const sampleResumes = {
        'Software Development': `JANE DOE
Software Developer
jane.doe@email.com | (555) 123-4567 | github.com/janedoe | linkedin.com/in/janedoe

PROFESSIONAL SUMMARY
Experienced software developer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and AWS. Passionate about creating scalable applications and optimizing performance.

SKILLS
• Languages: JavaScript, TypeScript, Python, Java, SQL
• Front-end: React, Redux, HTML5, CSS3, SASS, Bootstrap
• Back-end: Node.js, Express, Django, Spring Boot
• Database: MongoDB, PostgreSQL, MySQL
• Cloud: AWS (EC2, S3, Lambda), Google Cloud Platform
• Tools: Git, Docker, Kubernetes, Jenkins, Jira

EXPERIENCE
Senior Software Developer | TechCorp Inc. | Jan 2020 - Present
• Led development of a React-based dashboard that improved user engagement by 40%
• Implemented microservices architecture using Node.js and Docker, reducing deployment time by 65%
• Optimized database queries resulting in 30% faster application response time
• Mentored junior developers through code reviews and pair programming sessions

Software Developer | WebSolutions LLC | Mar 2017 - Dec 2019
• Developed RESTful APIs using Express.js for integration with third-party services
• Built responsive web applications with React and Redux, serving 10,000+ daily users
• Implemented automated testing using Jest and Cypress, achieving 85% code coverage

EDUCATION
Bachelor of Science in Computer Science | University of Technology | 2017
• GPA: 3.8/4.0
• Relevant coursework: Data Structures, Algorithms, Software Engineering, Database Systems

PROJECTS
E-commerce Platform (github.com/janedoe/ecommerce)
• Built a full-stack e-commerce application using MERN stack with Stripe payment integration
• Implemented JWT authentication and authorization

Weather Forecast App (github.com/janedoe/weatherapp)
• Created a React Native app that displays weather forecasts using OpenWeatherMap API
• Implemented geolocation and push notifications for weather alerts

CERTIFICATIONS
• AWS Certified Developer - Associate | 2022
• MongoDB Certified Developer | 2021`,

        Marketing: `ALEX JOHNSON
Digital Marketing Specialist
alex.johnson@email.com | (555) 987-6543 | linkedin.com/in/alexjohnson | alexjohnsonmarketing.com

PROFESSIONAL SUMMARY
Creative digital marketing specialist with 6+ years of experience developing and executing comprehensive marketing strategies. Proven track record of increasing online engagement and driving conversion rates through data-driven campaigns.

SKILLS
• Digital Marketing: SEO, SEM, Social Media Marketing, Content Marketing, Email Marketing
• Analytics: Google Analytics, Google Tag Manager, SEMrush, Ahrefs, HubSpot
• Advertising: Google Ads, Facebook Ads, LinkedIn Ads, Display Advertising
• Content Creation: Copywriting, Blogging, Video Production, Graphic Design
• Tools: Adobe Creative Suite, Mailchimp, Hootsuite, WordPress, Canva

EXPERIENCE
Senior Digital Marketing Manager | GrowthMedia Inc. | Jun 2020 - Present
• Developed and implemented digital marketing strategies that increased organic traffic by 75% in 12 months
• Managed $500K annual advertising budget across multiple platforms, achieving 3.5x ROI
• Led content marketing initiative that generated 15K new email subscribers and 2.5M blog views
• Collaborated with sales team to create conversion-focused landing pages that improved lead quality by 40%

Digital Marketing Specialist | BrandBoost Agency | Sep 2017 - May 2020
• Executed SEO strategies that resulted in 15 high-value keywords ranking in top 3 positions
• Created and managed social media campaigns across Facebook, Instagram, and LinkedIn, increasing engagement by 65%
• Produced weekly email newsletters with 32% open rate and 5% click-through rate
• Analyzed campaign performance and prepared monthly reports for clients across various industries

EDUCATION
Bachelor of Business Administration, Marketing | State University | 2017
• GPA: 3.7/4.0
• Minor in Graphic Design

CERTIFICATIONS
• Google Analytics Individual Qualification | 2023
• HubSpot Content Marketing Certification | 2022
• Facebook Blueprint Certification | 2021
• Google Ads Search Certification | 2020

PROJECTS
Rebranding Campaign - FitLife Supplements
• Led complete digital rebranding effort that increased social following by 150% and website visits by 200%
• Developed customer personas and journey maps to create targeted content strategy

Digital Marketing Workshop Series
• Created and delivered 5-part workshop series on digital marketing fundamentals for local small businesses
• Received 4.8/5 average rating from 75+ attendees

ACHIEVEMENTS
• Speaker at Regional Digital Marketing Conference 2022
• Published guest articles on leading marketing blogs including MarketingProfs and SEMrush`,
    }

    // Handle form submission with animation
    if (form) {
        form.addEventListener('submit', function (e) {
            // Only run the animation in a real form submission scenario
            if (!e.submitter || e.submitter.type === 'submit') {
                submitBtn.classList.add('loading')

                // In a real application, this timeout would be replaced by the actual form processing
                setTimeout(() => {
                    submitBtn.classList.remove('loading')
                }, 2000)
            }
        })
    }

    // Clear button functionality
    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            resumeTextarea.value = ''
            resumeTextarea.focus()
        })
    }

    // Sample resume button functionality
    if (sampleBtn) {
        sampleBtn.addEventListener('click', function () {
            const selectedCategory = jobCategorySelect.value
            if (selectedCategory && sampleResumes[selectedCategory]) {
                resumeTextarea.value = sampleResumes[selectedCategory]
            } else if (Object.keys(sampleResumes).length > 0) {
                // If no category selected or category not found in samples, use the first sample
                const firstCategory = Object.keys(sampleResumes)[0]
                resumeTextarea.value = sampleResumes[firstCategory]

                // If possible, also select the corresponding category
                if (
                    Array.from(jobCategorySelect.options).some(
                        (option) => option.value === firstCategory
                    )
                ) {
                    jobCategorySelect.value = firstCategory
                }
            }
        })
    }

    // Form validation
    if (form) {
        form.addEventListener('submit', function (e) {
            let valid = true
            const hasText = resumeTextarea.value.trim() !== ''
            const hasFile = fileSelected

            // Validate job category
            if (jobCategorySelect.value === '') {
                jobCategorySelect.parentElement.classList.add('shake')
                setTimeout(() => {
                    jobCategorySelect.parentElement.classList.remove('shake')
                }, 500)
                valid = false
            }

            // Validate at least one resume input
            if (!hasText && !hasFile) {
                // Highlight both inputs to show error
                resumeTextarea.parentElement.classList.add('shake')
                fileUploadBox.classList.add('shake')

                setTimeout(() => {
                    resumeTextarea.parentElement.classList.remove('shake')
                    fileUploadBox.classList.remove('shake')
                }, 500)

                // Show error message
                alert('Please either paste your resume text or upload a file')
                valid = false
            }

            if (!valid) {
                e.preventDefault()
            } else {
                // Show loading state
                submitBtn.classList.add('loading')
            }
        })
    }

    // File upload functionality
    const fileInput = document.getElementById('resume_file')
    const fileUploadBox = document.getElementById('file-upload-box')
    const filePreview = document.getElementById('file-preview')
    const fileName = document.querySelector('.file-name')
    const fileSize = document.querySelector('.file-size')
    const removeFileBtn = document.getElementById('remove-file')

    if (fileInput) {
        // Handle file selection
        fileInput.addEventListener('change', handleFileSelect)

        // Handle drag and drop events
        ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
            fileUploadBox.addEventListener(eventName, preventDefaults, false)
        })

        function preventDefaults(e) {
            e.preventDefault()
            e.stopPropagation()
        }

        ;['dragenter', 'dragover'].forEach((eventName) => {
            fileUploadBox.addEventListener(
                eventName,
                () => {
                    fileUploadBox.classList.add('dragover')
                },
                false
            )
        })
        ;['dragleave', 'drop'].forEach((eventName) => {
            fileUploadBox.addEventListener(
                eventName,
                () => {
                    fileUploadBox.classList.remove('dragover')
                },
                false
            )
        })

        fileUploadBox.addEventListener('drop', handleDrop, false)

        function handleDrop(e) {
            const dt = e.dataTransfer
            const files = dt.files
            fileInput.files = files
            handleFileSelect()
        }

        function handleFileSelect() {
            if (fileInput.files && fileInput.files[0]) {
                const file = fileInput.files[0]
                fileSelected = true

                // Check if file type is allowed
                const fileExtension = file.name.split('.').pop().toLowerCase()
                const allowedExtensions = ['pdf', 'doc', 'docx']

                if (!allowedExtensions.includes(fileExtension)) {
                    alert('Please upload a PDF, DOC, or DOCX file.')
                    fileInput.value = ''
                    return
                }

                // Update file preview
                fileName.textContent = file.name
                fileSize.textContent = formatFileSize(file.size)

                // Show file preview, hide upload box
                filePreview.style.display = 'flex'
                fileUploadBox.style.display = 'none'

                // Set file icon based on file type
                const fileIcon = document.querySelector('.file-icon')
                if (fileExtension === 'pdf') {
                    fileIcon.className = 'fas fa-file-pdf file-icon'
                    fileIcon.style.color = '#e74c3c'
                } else if (
                    fileExtension === 'doc' ||
                    fileExtension === 'docx'
                ) {
                    fileIcon.className = 'fas fa-file-word file-icon'
                    fileIcon.style.color = '#3498db'
                }
            }
        }

        // Format file size
        function formatFileSize(bytes) {
            if (bytes < 1024) return bytes + ' bytes'
            else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
            else return (bytes / 1048576).toFixed(1) + ' MB'
        }

        // Remove file
        if (removeFileBtn) {
            removeFileBtn.addEventListener('click', function () {
                fileInput.value = ''
                filePreview.style.display = 'none'
                fileUploadBox.style.display = 'block'
                fileName.textContent = 'No file selected'
                fileSize.textContent = ''
            })
        }
    }

    // Initialize score animation if score exists
    const scoreCircle = document.querySelector('.score-circle')
    if (scoreCircle) {
        const score = parseInt(scoreCircle.getAttribute('data-score'))

        // Set score color based on range
        let scoreColor
        if (score >= 9) {
            scoreColor = '#28a745' // Excellent (green)
        } else if (score >= 7) {
            scoreColor = '#5cb85c' // Good (light green)
        } else if (score >= 5) {
            scoreColor = '#f0ad4e' // Fair (yellow/orange)
        } else if (score >= 3) {
            scoreColor = '#d9534f' // Weak (red)
        } else {
            scoreColor = '#c9302c' // Poor (dark red)
        }

        // Apply the color to CSS variables
        scoreCircle.style.setProperty('--score-color', scoreColor)
        scoreCircle.style.setProperty('--score-value', score)

        // Generate appropriate message based on score
        const scoreMessage = document.getElementById('score-message')
        if (scoreMessage) {
            let message = ''
            if (score >= 9) {
                message =
                    'Excellent! Your resume is highly optimized for this position.'
            } else if (score >= 7) {
                message =
                    'Great job! Your resume matches well with this job category.'
            } else if (score >= 5) {
                message =
                    'Good start. Consider enhancing key skills and experiences.'
            } else if (score >= 3) {
                message =
                    'Your resume needs improvement to be competitive for this role.'
            } else {
                message =
                    'Your resume requires significant updates to match this job category.'
            }
            scoreMessage.textContent = message

            // Optional: Apply color to message border if needed
            scoreMessage.style.borderLeftColor = scoreColor
        }
    }

    // Animations for elements when they come into view
    const animateOnScroll = function () {
        const elements = document.querySelectorAll(
            '.card, .result, .about-section'
        )

        elements.forEach((element) => {
            const elementPosition = element.getBoundingClientRect().top
            const screenPosition = window.innerHeight / 1.2

            if (elementPosition < screenPosition) {
                if (!element.classList.contains('animate__fadeIn')) {
                    element.classList.add(
                        'animate__animated',
                        'animate__fadeIn'
                    )
                }
            }
        })
    }

    window.addEventListener('scroll', animateOnScroll)
    // Run once on page load
    animateOnScroll()
})

// Toggle FAQ item - About Page
function toggleFaq(element) {
    // Check if this item is already active
    const isActive = element.classList.contains('active')

    // Close all FAQ items
    const allFaqs = document.querySelectorAll('.faq-item')
    allFaqs.forEach((item) => {
        item.classList.remove('active')
    })

    // If the clicked item wasn't active, open it
    if (!isActive) {
        element.classList.add('active')
    }
}
