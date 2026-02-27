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
            let response = "I am processing your query. For detailed specs, ask about 'WordPress', 'Marketing', 'Android', 'Shopify', 'Full Stack', 'Video', 'Graphics', or 'UI/UX'.";

            if (text.includes('wordpress')) response = "Our WordPress mastery course covers everything from theme development to high-end CMS customization.";
            if (text.includes('marketing')) response = "Digital Marketing at Ztech focuses on SEO, SEM, and modern performance marketing strategies.";
            if (text.includes('android')) response = "The Android Development program turns you into a mobile architect using Kotlin and modern app frameworks.";
            if (text.includes('shopify') || text.includes('e-commerce')) response = "Learn to launch and scale profitable stores using Shopify and specialized E-Commerce stacks.";
            if (text.includes('full stack') || text.includes('stack')) response = "Our Full Stack program is a deep-dive into MERN (MongoDB, Express, React, Node) architecture.";
            if (text.includes('ui/ux') || text.includes('design')) response = "UI/UX Design at Ztech is about creating digital poetry—blending aesthetics with seamless user journeys.";
            if (text.includes('web')) response = "Our Web Development division constructs high-performance, responsive digital architecture with futuristic aesthetics.";
            if (text.includes('ai')) response = "The AI Nexus develops autonomous agents tailored for efficiency and next-gen intelligence.";
            if (text.includes('video')) response = "Our Video commanders specialize in cinematic transitions and mind-bending visual effects.";
            if (text.includes('graphics')) response = "Graphic design at Ztech involves creating branding that lives and breathes in the digital void.";
            if (text.includes('internship') || text.includes('job')) response = "Our paid internships are the bridge to your career. Perform well in your course, and you're in!";
            if (text.includes('hello') || text.includes('hi')) response = "Greetings. I am Nexus. Ready to assist in your digital transcendence?";

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

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Visual feedback - simulate processing
            const button = form.querySelector('button');
            button.innerText = 'SUBMITTING...';
            button.style.opacity = '0.5';

            setTimeout(() => {
                form.style.display = 'none';
                successMsg.style.display = 'block';
                successMsg.classList.add('levitating');
            }, 1500);
        });
    }

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
