// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    const typingEl = document.getElementById('typing');

    function hideWelcome() {
        welcomeScreen.style.opacity = '0';
        setTimeout(() => welcomeScreen.style.display = 'none', 600);
    }

    // Auto hide after 6 seconds
    setTimeout(hideWelcome, 6000);

    // Typing animation
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
