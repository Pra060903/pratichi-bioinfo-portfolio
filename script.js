document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    const typingEl = document.getElementById('typing');

    const isIndexPage = window.location.pathname.includes("index") || window.location.pathname === "/" || window.location.pathname.endsWith("index.html");
    const hasVisited = localStorage.getItem('hasVisited');

    if (welcomeScreen && isIndexPage && !hasVisited) {
        welcomeScreen.style.display = 'flex';

        function hideWelcome() {
            welcomeScreen.style.opacity = '0';
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
                localStorage.setItem('hasVisited', 'true');
            }, 600);
        }

        setTimeout(hideWelcome, 6000);
        window.hideWelcome = hideWelcome;
    } else if (welcomeScreen) {
        welcomeScreen.style.display = 'none';
    }

    // Typing animation
    if (typingEl) {
        const words = ["Bioinformatics Enthusiast", "Creative Developer", "Fast Learner"];
        let i = 0, j = 0, isDeleting = false, currentWord = '';

        function type() {
            if (i < words.length) {
                if (!isDeleting && j <= words[i].length) {
                    currentWord = words[i].substring(0, j++);
                } else if (isDeleting && j >= 0) {
                    currentWord = words[i].substring(0, j--);
                }

                typingEl.innerHTML = currentWord;

                if (j === words[i].length) {
                    isDeleting = true;
                    setTimeout(type, 1500);
                } else if (isDeleting && j === 0) {
                    isDeleting = false;
                    i = (i + 1) % words.length;
                    setTimeout(type, 500);
                } else {
                    setTimeout(type, isDeleting ? 120 : 200);
                }
            }
        }
        type();
    }

    // Scroll fade-in effect
    const faders = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    faders.forEach(el => observer.observe(el));
});
