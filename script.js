/* SWITCH LANGUAGE */

document.getElementById('languageToggle').addEventListener('click', function () {
    const elementsToTranslate = document.querySelectorAll('[data-es][data-en]');
    const currentLang = document.documentElement.getAttribute('lang');
    const newLang = currentLang === 'es' ? 'en' : 'es';

    elementsToTranslate.forEach(element => {
        const translation = element.dataset[newLang];
        
        // Handle CV download link specially
        if(element.classList.contains('cv-button')) {
            element.innerHTML = translation;
            element.href = newLang === 'en' 
                ? './assets/cv/CV-Santiago-Gonzalez-Gomila-EN.pdf' 
                : './assets/cv/CV-Santiago-Gonzalez-Gomila.pdf';
        }
        // Handle elements with spans
        else if (element.querySelector('span')) {
            // Create a temporary container
            const temp = document.createElement('div');
            temp.innerHTML = translation;
            
            // Find all spans in the original element
            const originalSpans = element.querySelectorAll('span');
            const newSpans = temp.querySelectorAll('span');
            
            // Transfer classes from original spans to new spans
            originalSpans.forEach((span, index) => {
                if (newSpans[index]) {
                    newSpans[index].className = span.className;
                }
            });
            
            element.innerHTML = temp.innerHTML;
        } else {
            element.innerHTML = translation;
        }
    });

    // Update button text
    this.textContent = newLang === 'es' ? 'Switch to English' : 'Cambiar a Español';

    // Update the language attribute on the HTML root element
    document.documentElement.setAttribute('lang', newLang);
});

/* SCROLL BEHAVIOUR */

document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.navbar a');
    
    // Add click event listeners to each nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section id from the href
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // Smooth scroll to the section
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Handle regular scrolling
    let isScrolling;
    window.addEventListener('scroll', function() {
        // Clear the timeout throughout the scroll
        window.clearTimeout(isScrolling);

        // Set a timeout to detect when scrolling ends
        isScrolling = setTimeout(function() {
            // Get current scroll position
            const scrollPosition = window.scrollY;
            
            // Find which section is currently in view
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop - 100 && 
                    scrollPosition < sectionTop + sectionHeight - 100) {
                    // Update URL without triggering scroll
                    const sectionId = section.getAttribute('id');
                    history.replaceState(null, null, `#${sectionId}`);
                    
                    // Update active state in navigation
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, 66);
    });
});