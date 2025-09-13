/* Your JS here. */
/* Navbar and section highlight on scroll */
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('nav ul li');
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    let sectionFound = false;

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        // check if section top is above middle of viewport and bottom below middle
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            navItems.forEach(i => i.classList.remove('active'));
            navItems[index].classList.add('active');
            sectionFound = true;
        }
    });

    // If no section matches (scrolled to very bottom), highlight last item
    if (!sectionFound) {
        navItems.forEach(i => i.classList.remove('active'));
        navItems[navItems.length - 1].classList.add('active');
    }
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const target = document.getElementById(item.dataset.target);
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

/* Carousel functionality */
let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-item'); // was '.slide'
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

function showSlide(n) {
    // Wrap around
    if (n < 0) {
        slideIndex = slides.length - 1;
    } else if (n >= slides.length) {
        slideIndex = 0;
    } else {
        slideIndex = n;
    }

    // Move the carousel track
    const track = document.querySelector('.carousel-track');
    track.style.transform = `translateX(-${slideIndex * 100}%)`;
}

next.addEventListener('click', () => {
    showSlide(slideIndex + 1);
});

prev.addEventListener('click', () => {
    showSlide(slideIndex - 1);
});

// Initialize
showSlide(0);

setInterval(() => {
    showSlide(slideIndex + 1);
}, 4000);



/* Modal handling */
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("recipeModal");
    const modalTitle = document.getElementById("recipeTitle");
    const modalText = document.getElementById("recipeText");
    const closeBtn = modal.querySelector(".close");

    document.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("click", () => {
            const key = item.dataset.key;
            const recipe = recipes[key];

            if (!recipe) return console.error(`No recipe for key: ${key}`);

            modalTitle.textContent = recipe.title;
            const ingredientsHTML = `
    <h3>Ingredients</h3>
    <ul>
      ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
    </ul>
  `;

            const instructionsHTML = `
    <h3>Instructions</h3>
    <p>${recipe.instructions.replace(/\n/g, "<br>")}</p>
  `;

            modalText.innerHTML = ingredientsHTML + instructionsHTML;


            modal.style.display = "flex";
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
});