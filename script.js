document.addEventListener('DOMContentLoaded', () => {
    // Parallax Effect for Levitating Cards
    const cards = document.querySelectorAll('.levitating');

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2);
        mouseY = (e.clientY - window.innerHeight / 2);
    });

    function animate() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        cards.forEach((card, index) => {
            const factor = (index + 1) * 0.01;
            const x = currentX * factor;
            const y = currentY * factor;
            card.style.transform = `translate(${x}px, ${y}px)`;
        });

        requestAnimationFrame(animate);
    }
    animate();

    // Typewriter Engine
    const typeTarget = document.getElementById('typewriter-text');
    const textToType = "Defy Gravity\nWith Ztech";
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < textToType.length) {
            const char = textToType.charAt(charIndex);
            if (char === '\n') {
                typeTarget.innerHTML += '<br>';
            } else {
                typeTarget.innerHTML += char;
            }

            // Highlight keywords after they are typed
            if (typeTarget.innerHTML.includes("Gravity")) {
                typeTarget.innerHTML = typeTarget.innerHTML.replace("Gravity", '<span class="gradient-text">Gravity</span>');
            }
            if (typeTarget.innerHTML.includes("Ztech")) {
                typeTarget.innerHTML = typeTarget.innerHTML.replace("Ztech", '<span class="gradient-text">Ztech</span>');
            }

            charIndex++;
            setTimeout(typeWriter, 100);
        } else {
            document.querySelector('.cursor').style.animation = 'blink 1.5s infinite';
        }
    }
    typeWriter();


    // Skill Universe Generator - Orbital Model
    const universe = document.getElementById('universe-container');
    const skills = [
        { name: 'React', radius: 120, speed: 20 },
        { name: 'Next.js', radius: 120, speed: 25 },
        { name: 'Node.js', radius: 180, speed: 30 },
        { name: 'PyTorch', radius: 180, speed: 35 },
        { name: 'Figma', radius: 240, speed: 40 },
        { name: 'Blender', radius: 240, speed: 45 },
        { name: 'Premiere', radius: 300, speed: 50 },
        { name: 'Hardhat', radius: 300, speed: 55 }
    ];

    skills.forEach((skill, i) => {
        // Create Orbit Ring (one for each radius level)
        if (i % 2 === 0) {
            const ring = document.createElement('div');
            ring.className = 'orbit-ring';
            ring.style.width = `${skill.radius * 2}px`;
            ring.style.height = `${skill.radius * 2}px`;
            universe.appendChild(ring);
        }

        const bubble = document.createElement('div');
        bubble.className = 'glass-effect skill-planet';
        bubble.innerText = skill.name;
        bubble.style.padding = '8px 16px';
        bubble.style.borderRadius = '20px';
        bubble.style.fontSize = '0.75rem';
        bubble.style.fontWeight = 'bold';

        // Orbital variables
        bubble.style.setProperty('--radius', `${skill.radius}px`);
        bubble.style.setProperty('--duration', `${skill.speed}s`);

        // Randomize start position
        bubble.style.animationDelay = `-${Math.random() * skill.speed}s`;

        // Interactive glow
        bubble.addEventListener('mouseenter', () => {
            bubble.style.borderColor = 'var(--neon-purple)';
            bubble.style.boxShadow = '0 0 20px var(--neon-purple)';
            bubble.style.animationPlayState = 'paused';
        });
        bubble.addEventListener('mouseleave', () => {
            bubble.style.borderColor = 'var(--glass-border)';
            bubble.style.boxShadow = 'none';
            bubble.style.animationPlayState = 'running';
        });

        universe.appendChild(bubble);
    });

    // Chatbot Nexus Logic
    const chatFab = document.getElementById('chat-fab');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const chatBody = document.getElementById('chat-body');
    const sendChat = document.getElementById('send-chat');

    const toggleChat = () => {
        chatWindow.classList.toggle('active');
    };

    chatFab.addEventListener('click', toggleChat);
    closeChat.addEventListener('click', toggleChat);

    const addMessage = (text, type) => {
        const msg = document.createElement('div');
        msg.className = `${type === 'ai' ? 'ai-msg' : 'user-msg'} glass-effect`;
        msg.innerText = text;
        chatBody.appendChild(msg);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    const handleChat = () => {
        const text = chatInput.value.trim().toLowerCase();
        if (!text) return;

        addMessage(chatInput.value, 'user');
        chatInput.value = '';

        // Simulated AI logic
        setTimeout(() => {
            let response = "I am processing your query. Feel free to ask about our courses, paid internships, location, or contact info.";

            if (text.includes('course') || text.includes('service')) response = "We provide Android Development, E-commerce/Shopify, Video Editing, Graphic Designing, and UI/UX Design.";
            else if (text.includes('internship') || text.includes('job') || text.includes('training')) response = "We offer both training and internships. After students complete our specialized courses, we onboard them for internships. We explicitly offer Paid Internships to deserving candidates based on their performance.";
            else if (text.includes('location') || text.includes('address') || text.includes('where')) response = "Our office is located Opposite COMSATS University, Abbottabad.";
            else if (text.includes('contact') || text.includes('phone') || text.includes('whatsapp') || text.includes('number')) response = "You can reach us via Phone/WhatsApp at +92 315 4565603.";
            else if (text.includes('wordpress')) response = "Our WordPress mastery course covers everything from theme development to high-end CMS customization.";
            else if (text.includes('marketing')) response = "Digital Marketing at Ztech focuses on SEO, SEM, and modern performance marketing strategies.";
            else if (text.includes('android')) response = "The Android Development program turns you into a mobile architect using Kotlin and modern app frameworks.";
            else if (text.includes('shopify') || text.includes('e-commerce')) response = "Learn to launch and scale profitable stores using Shopify and specialized E-Commerce stacks.";
            else if (text.includes('full stack') || text.includes('stack')) response = "Our Full Stack program is a deep-dive into MERN (MongoDB, Express, React, Node) architecture.";
            else if (text.includes('ui/ux') || text.includes('design')) response = "UI/UX Design at Ztech is about creating digital poetry—blending aesthetics with seamless user journeys.";
            else if (text.includes('web')) response = "Our Web Development division constructs high-performance, responsive digital architecture with futuristic aesthetics.";
            else if (text.includes('ai')) response = "The AI Nexus develops autonomous agents tailored for efficiency and next-gen intelligence.";
            else if (text.includes('video')) response = "Our Video commanders specialize in cinematic transitions and mind-bending visual effects.";
            else if (text.includes('graphics')) response = "Graphic design at Ztech involves creating branding that lives and breathes in the digital void.";
            else if (text.includes('hello') || text.includes('hi')) response = "Greetings. I am the Ztech Support Assistant. How can I assist you today? You can ask me about our courses, paid internships, location, or contact info.";

            addMessage(response, 'ai');
        }, 1000);
    };

    sendChat.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChat();
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });

    // Registration Form Submission Logic
    const form = document.getElementById('registration-form');
    const successMsg = document.getElementById('form-success');
    const API_URL = '/api';

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                contact: document.getElementById('contact').value,
                course: document.getElementById('course').value,
                message: document.getElementById('message').value,
                type: 'admission'
            };

            const button = form.querySelector('button');
            button.innerText = 'TRANSMITTING...';
            button.style.opacity = '0.5';

            try {
                const res = await fetch(`${API_URL}/apply`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (res.ok) {
                    form.style.display = 'none';
                    successMsg.style.display = 'block';
                    successMsg.classList.add('levitating');
                    
                    setTimeout(() => {
                        form.reset();
                        form.style.display = 'block';
                        successMsg.style.display = 'none';
                        successMsg.classList.remove('levitating');
                        button.innerText = 'SUBMIT';
                        button.style.opacity = '1';
                    }, 5000);
                } else {
                    throw new Error('Nexus Sync Failed');
                }
            } catch (err) {
                alert('Connection to Ztech Nexus failed. Ensure engine is online.');
                button.innerText = 'SUBMIT';
                button.style.opacity = '1';
            }
        });
    }

    // Internship Modal Logic
    const internshipTrigger = document.getElementById('internship-trigger');
    const internshipModal = document.getElementById('internship-modal');
    const modalClose = document.getElementById('modal-close');
    const internshipForm = document.getElementById('internship-form');

    if (internshipTrigger && internshipModal) {
        internshipTrigger.addEventListener('click', () => {
            internshipModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        const closeModal = () => {
            internshipModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        modalClose.addEventListener('click', closeModal);

        internshipModal.addEventListener('click', (e) => {
            if (e.target === internshipModal) {
                closeModal();
            }
        });

        if (internshipForm) {
            internshipForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const formData = {
                    name: document.getElementById('intern-name').value,
                    email: document.getElementById('intern-email').value,
                    contact: document.getElementById('intern-contact').value,
                    portfolio: document.getElementById('intern-portfolio').value,
                    course: document.getElementById('intern-skill').value,
                    type: 'internship'
                };

                const submitBtn = internshipForm.querySelector('.submit-btn');
                submitBtn.innerHTML = 'TRANSMITTING...';
                submitBtn.style.pointerEvents = 'none';
                submitBtn.style.opacity = '0.7';

                try {
                    const res = await fetch(`${API_URL}/apply`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    });

                    if (res.ok) {
                        internshipForm.style.display = 'none';
                        
                        let successMsg = internshipModal.querySelector('.internship-success');
                        if (!successMsg) {
                            successMsg = document.createElement('div');
                            successMsg.className = 'internship-success';
                            successMsg.innerHTML = `
                                <div style="text-align: center; padding: 20px;">
                                    <h2 class="orbitron-text gradient-text">Transmission Successful!</h2>
                                    <p style="margin-top: 20px; color: #e0e0e0; opacity: 0.9;">Your application has been logged into the Ztech Core. Our commanders will contact you soon.</p>
                                </div>
                            `;
                            internshipForm.parentElement.appendChild(successMsg);
                        }
                        successMsg.style.display = 'block';

                        setTimeout(() => {
                            internshipForm.reset();
                            internshipForm.style.display = 'block';
                            successMsg.style.display = 'none';
                            submitBtn.innerHTML = 'SUBMIT APPLICATION 🚀';
                            submitBtn.style.pointerEvents = 'auto';
                            submitBtn.style.opacity = '1';
                        }, 5000);
                    } else {
                        throw new Error('Sync Failed');
                    }
                } catch (err) {
                    alert('Sync with Ztech Core failed. Ensure engine is online.');
                    submitBtn.innerHTML = 'SUBMIT APPLICATION 🚀';
                    submitBtn.style.pointerEvents = 'auto';
                    submitBtn.style.opacity = '1';
                }
            });
        }
    }

    // Skill Detail Modal Logic
    const skillDetailModal = document.getElementById('skill-detail-modal');
    const skillModalClose = document.getElementById('skill-modal-close');
    const skillModalBody = document.getElementById('skill-modal-body');

    const skillData = {
        'fullstack': {
            title: 'Full Stack Development',
            scope: 'The backbone of the digital world. Companies globally are in desperate need of engineers who can handle both frontend and backend architectures.',
            advantages: 'High salary potential, flexibility to work in startups or tech giants, and the ability to build complete products from scratch.',
            courseId: 'fullstack'
        },
        'wordpress': {
            title: 'WordPress Mastery',
            scope: 'Powering over 40% of the web. Essential for quick, high-performance CMS solutions for businesses and e-commerce.',
            advantages: 'Fastest way to start a freelancing career, high demand in international markets, and easy to maintain.',
            courseId: 'wordpress'
        },
        'marketing': {
            title: 'Digital Marketing',
            scope: 'In a digital-first economy, attention is the new currency. Mastering SEO, SEM, and Social Ads is crucial for any business growth.',
            advantages: 'Work remotely for global brands, data-driven career path, and directly impact revenue generation.',
            courseId: 'marketing'
        },
        'android': {
            title: 'Android Development',
            scope: 'With billions of devices, mobile apps are the primary touchpoint for users. Kotlin and Java specialists remain highly sought after.',
            advantages: 'Build world-changing apps, high job security, and deep integration with hardware technologies.',
            courseId: 'android'
        },
        'shopify': {
            title: 'E-Commerce / Shopify',
            scope: 'The e-commerce boom is here. Businesses are moving online, requiring expert store setups and optimization.',
            advantages: 'Niche expertise with high barrier to entry, recurring client work, and high-profit potential in the dropshipping space.',
            courseId: 'shopify'
        },
        'video': {
            title: 'Video Editing',
            scope: 'Content is king. From YouTube to Cinema, high-quality video editing is the most engaged form of media today.',
            advantages: 'Highly creative work, essential for the social media era, and great networking opportunities in the creative industry.',
            courseId: 'video'
        },
        'graphics': {
            title: 'Graphic Designing',
            scope: 'Visual identity defines a brand. Every business needs logos, marketing materials, and digital assets.',
            advantages: 'Immediate freelance opportunities, portfolio-based growth, and a blend of art and technology.',
            courseId: 'graphics'
        },
        'uiux': {
            title: 'UI/UX Design',
            scope: 'Experience is everything. Designing intuitive, beautiful interfaces is what separates successful products from failures.',
            advantages: 'High-end consulting roles, critical for product development, and a deeply satisfying problem-solving career.',
            courseId: 'uiux'
        }
    };

    document.querySelectorAll('.card[data-skill]').forEach(card => {
        card.addEventListener('click', () => {
            const skillId = card.getAttribute('data-skill');
            const data = skillData[skillId];

            if (data) {
                skillModalBody.innerHTML = `
                    <div class="skill-detail-content">
                        <div class="skill-header">
                            <h2 class="orbitron-text">${data.title}</h2>
                        </div>
                        <div class="skill-info-grid">
                            <div class="info-box">
                                <h4>Global Scope</h4>
                                <p>${data.scope}</p>
                            </div>
                            <div class="info-box">
                                <h4>Key Advantages</h4>
                                <p>${data.advantages}</p>
                            </div>
                        </div>
                        <div class="ztech-promise-banner">
                            <h4><span class="gradient-text">The Ztech Nexus Approach</span></h4>
                            <p>We believe in practical evolution. At Ztech, you don't just learn theory; you are mentored by commanders to master the stack, followed by a <strong>Guaranteed Paid Internship</strong> to launch your professional orbit.</p>
                        </div>
                        <div class="skill-modal-actions">
                            <button class="submit-btn apply-now-btn" data-course="${data.courseId}" style="max-width: 300px;">
                                APPLY NOW TO JOIN 🚀
                            </button>
                        </div>
                    </div>
                `;
                skillDetailModal.classList.add('active');
                document.body.style.overflow = 'hidden';

                // Handle Apply Now inside modal
                skillModalBody.querySelector('.apply-now-btn').addEventListener('click', function () {
                    const courseId = this.getAttribute('data-course');
                    skillDetailModal.classList.remove('active');
                    document.body.style.overflow = 'auto';

                    // Scroll to registration and select course
                    const registerSection = document.getElementById('register');
                    const courseSelect = document.getElementById('course');

                    if (registerSection) {
                        registerSection.scrollIntoView({ behavior: 'smooth' });
                    }
                    if (courseSelect) {
                        courseSelect.value = courseId;
                        // Trigger change event for any listeners
                        courseSelect.dispatchEvent(new Event('change'));
                    }
                });
            }
        });
    });

    const closeSkillModal = () => {
        skillDetailModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    if (skillModalClose) {
        skillModalClose.addEventListener('click', closeSkillModal);
    }

    if (skillDetailModal) {
        skillDetailModal.addEventListener('click', (e) => {
            if (e.target === skillDetailModal) {
                closeSkillModal();
            }
        });
    }

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});



