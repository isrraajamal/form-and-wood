document.addEventListener('DOMContentLoaded', function() {
    
    /* Data Source */
    const medias = [].slice.call(document.getElementsByClassName("bg-image"));
    medias.forEach((e) => {
        const data = e.getAttribute("data-src");
        if (data) {
            e.style.backgroundImage = `url("${data}")`;
        }
    });
    /* End Data Source */
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled', 'fixed-top');
            navbar.classList.remove('position-absolute');
        } else {
            navbar.classList.remove('scrolled', 'fixed-top');
            navbar.classList.add('position-absolute');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initialize immediately to handle page refreshes midway down the page
    handleScroll();

    // Initialize Tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    if (typeof bootstrap !== 'undefined') {
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }

    // Mobile Menu Background Fix
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', () => {
            navbar.classList.toggle('mobile-open');
        });
    }

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements to animate
    const animatedElements = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-left, .reveal-right');
    animatedElements.forEach(el => observer.observe(el));
    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.getAttribute('data-target'));
                const isDecimal = counter.hasAttribute('data-decimal');
                const duration = 2000; // 2 seconds
                const stepTime = 20; 
                const steps = duration / stepTime;
                const increment = target / steps;


                
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = isDecimal ? current.toFixed(1) : Math.ceil(current);
                        setTimeout(updateCounter, stepTime);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));

    // Interactive Project Filtering
    const filterButtons = document.querySelectorAll('.project-filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                filterButtons.forEach(b => {
                    b.classList.remove('active');
                    b.classList.remove('btn-gold');
                });
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                projectItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        item.style.display = '';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 20);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Executive Custom Select Handlers
    const customSelects = document.querySelectorAll('.custom-select-wrapper');
    
    customSelects.forEach(wrapper => {
        const trigger = wrapper.querySelector('.custom-select-trigger');
        const label = wrapper.querySelector('.custom-select-label');
        const hiddenInput = wrapper.querySelector('input[type="hidden"]');
        const options = wrapper.querySelectorAll('.custom-select-option');
        
        if (!trigger || !options.length) return;
        
        // Toggle Dropdown
        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = wrapper.classList.contains('is-open');
            
            // Close any other open select
            customSelects.forEach(s => {
                if (s !== wrapper) {
                    s.classList.remove('is-open');
                    const otherTrigger = s.querySelector('.custom-select-trigger');
                    if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
                }
            });
            
            if (isOpen) {
                wrapper.classList.remove('is-open');
                trigger.setAttribute('aria-expanded', 'false');
            } else {
                wrapper.classList.add('is-open');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Option Click
        options.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                const val = this.getAttribute('data-value');
                const text = this.querySelector('span') ? this.querySelector('span').textContent.trim() : this.textContent.trim();
                
                // Update selected state
                options.forEach(opt => opt.classList.remove('is-selected'));
                this.classList.add('is-selected');
                
                // Update label & hidden input
                if (label) {
                    label.textContent = text;
                    label.classList.remove('placeholder-text');
                }
                if (hiddenInput) {
                    hiddenInput.value = val;
                    hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
                }
                
                // Close dropdown
                wrapper.classList.remove('is-open');
                trigger.setAttribute('aria-expanded', 'false');
                trigger.focus();
            });
        });
    });
    
    // Close Custom Selects on Outside Click or Escape
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.custom-select-wrapper')) {
            customSelects.forEach(s => {
                s.classList.remove('is-open');
                const tr = s.querySelector('.custom-select-trigger');
                if (tr) tr.setAttribute('aria-expanded', 'false');
            });
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            customSelects.forEach(s => {
                s.classList.remove('is-open');
                const tr = s.querySelector('.custom-select-trigger');
                if (tr) tr.setAttribute('aria-expanded', 'false');
            });
        }
    });

    // Consultation Form Submission Handling with Custom Select Validation
    const consultationForm = document.getElementById('projectConsultationForm');
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate Sector Custom Select
            const sectorInput = document.getElementById('sectorInput');
            if (sectorInput && !sectorInput.value) {
                const wrapper = sectorInput.closest('.custom-select-wrapper');
                if (wrapper) {
                    const trigger = wrapper.querySelector('.custom-select-trigger');
                    trigger.style.borderColor = 'var(--gold)';
                    trigger.style.boxShadow = '0 0 0 4px rgba(255, 107, 0, 0.25)';
                    trigger.focus();
                    wrapper.classList.add('is-open');
                    trigger.setAttribute('aria-expanded', 'true');
                    return false;
                }
            }
            
            consultationForm.style.display = 'none';
            const successBanner = document.getElementById('intakeSuccessMessage');
            if (successBanner) {
                successBanner.style.display = 'block';
                successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }
});

// Initialize GLightbox
if (typeof GLightbox !== 'undefined') {
    const lightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Dynamically insert line breaks for index page hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && heroTitle.textContent.includes('Creating Energy')) {
        heroTitle.innerHTML = 'Creating Energy<br>That Inspires<br>Future Living';
    }

    // Dynamic Word Highlighter (Added by location number so backend can output flat strings)
    const highlightRules = [
        { path: 'index.html', selector: '.hero-section h1', lineIndex: 1, classList: ['fst-italic', 'fw-light'], style: 'color: #e3cda8;' },
        { path: 'services.html', selector: '.hero-section h1', lineIndex: 1, classList: ['fst-italic', 'text-gold'] },
        { path: 'services.html', selector: '.container h2.display-5', wordStart: 2, wordCount: 1, classList: ['fst-italic', 'text-gold'] },
        { path: 'about.html', selector: '.hero-section h1', lineIndex: 1, classList: ['fst-italic', 'text-gold'] },
        { path: 'about.html', selector: 'h2.display-5.text-dark', lineIndex: 1, classList: ['fst-italic', 'text-gold'] }, // Tradition of Engineering Excellence
        { path: 'about.html', selector: '.container .mx-auto h2.display-5', wordStart: 1, wordCount: 1, classList: ['fst-italic', 'text-gold'] }, // Powering Progress (assume 1st word after first)
        { path: 'blog.html', selector: '.hero-section h1', wordStart: 2, wordCount: 1, classList: ['fst-italic', 'text-gold'] },
        { path: 'blog-details.html', selector: '.hero-section h1', lineIndex: 1, classList: ['fst-italic', 'text-gold'] },
        { path: 'contact.html', selector: '.hero-section h1', wordStart: 3, wordCount: 1, classList: ['fst-italic', 'text-gold'] },
        { path: 'project-details.html', selector: '.hero-section h1', lineIndex: 1, classList: ['fst-italic', 'text-gold'] },
        { path: 'projects.html', selector: '.hero-section h1', wordStart: 0, wordCount: 1, classList: ['fst-italic', 'text-gold'] }, // Mega-Scale Engineering -> wait, Mega-Scale is word 0.
        { path: 'service-details.html', selector: '.hero-section h1', lineIndex: 1, classList: ['fst-italic', 'text-gold'] }
    ];

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const rules = highlightRules.filter(r => r.path === currentPath);

    rules.forEach(rule => {
        // Select elements
        const elements = document.querySelectorAll(rule.selector);
        elements.forEach(el => {
            // Function to wrap words
            let currentWordIndex = 0;
            let currentLineIndex = 0;
            
            function processNode(node) {
                if (node.nodeType === Node.TEXT_NODE) {
                    const parts = node.nodeValue.split(/(\s+)/);
                    const fragment = document.createDocumentFragment();
                    
                    parts.forEach(part => {
                        if (part.trim().length > 0) {
                            let shouldWrap = false;
                            if (rule.lineIndex !== undefined) {
                                if (currentLineIndex === rule.lineIndex) shouldWrap = true;
                            } else if (rule.wordStart !== undefined) {
                                if (currentWordIndex >= rule.wordStart && currentWordIndex < rule.wordStart + rule.wordCount) {
                                    shouldWrap = true;
                                }
                            }
                            
                            if (shouldWrap) {
                                const span = document.createElement('span');
                                span.classList.add(...rule.classList);
                                if (rule.style) span.style.cssText = rule.style;
                                span.textContent = part;
                                fragment.appendChild(span);
                            } else {
                                fragment.appendChild(document.createTextNode(part));
                            }
                            currentWordIndex++;
                        } else {
                            fragment.appendChild(document.createTextNode(part));
                        }
                    });
                    node.parentNode.replaceChild(fragment, node);
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.tagName.toLowerCase() === 'br') {
                        currentLineIndex++;
                    } else if (node.tagName.toLowerCase() !== 'span' || !node.classList.contains('fst-italic')) {
                        // don't recurse into already wrapped spans
                        Array.from(node.childNodes).forEach(processNode);
                    }
                }
            }
            
            Array.from(el.childNodes).forEach(processNode);
        });
    });
});


