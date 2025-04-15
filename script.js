document.addEventListener('DOMContentLoaded', function () {
    // Observador de intersección para animar los elementos cuando sean visibles
    const specialOfferTitle = document.querySelector('.special-offer-title');
    const specialOfferDescription = document.querySelector('.special-offer-description');
    const spaImage = document.querySelector('.spa-image-column img'); // Seleccionar la imagen

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.5
    });

    observer.observe(specialOfferTitle);
    observer.observe(specialOfferDescription);
    observer.observe(spaImage); // Observar la imagen
});

let currentIndex = 0;
const imagesToShow = 4;
const images = document.querySelectorAll('.custom-carousel img');
const totalImages = images.length;
const track = document.querySelector('.custom-carousel-track');
const slideWidth = images[0].offsetWidth + 10; // 10px es el margen entre imágenes

// Duplicar las imágenes para crear el efecto de bucle
function duplicateImages() {
    const firstImage = images[0].cloneNode(true);  // Clona la primera imagen
    const lastImage = images[images.length - 1].cloneNode(true); // Clona la última imagen
    track.appendChild(firstImage); // Añadirla al final del track
    track.insertBefore(lastImage, track.firstChild); // Añadirla al principio del track
}

// Mueve las imágenes sin reiniciar el índice.
function moveSlide(direction) {
    if (direction === 1) {
        // Mover a la siguiente imagen
        if (currentIndex < totalImages - 1) {
            currentIndex++;
            updateCarousel();
        } else {
            // Cuando llegue a la última imagen, vamos a la primera.
            currentIndex = 0;
            setTimeout(() => {
                track.style.transition = 'none';  // Desactivar transición momentáneamente
                updateCarousel();
                setTimeout(() => {
                    track.style.transition = 'transform 0.5s ease-in-out'; // Volver a activar la transición
                }, 50); // Volver a la transición después de un breve retraso
            }, 500);  // Espera medio segundo para completar el deslizamiento
        }
    } else if (direction === -1) {
        // Mover a la imagen anterior
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        } else {
            // Cuando esté en la primera imagen, volver a la última.
            currentIndex = totalImages - 1;
            setTimeout(() => {
                track.style.transition = 'none';  // Desactivar transición momentáneamente
                updateCarousel();
                setTimeout(() => {
                    track.style.transition = 'transform 0.5s ease-in-out'; // Volver a activar la transición
                }, 50); // Volver a la transición después de un breve retraso
            }, 500);  // Espera medio segundo para completar el deslizamiento
        }
    }
}

// Actualiza la posición del carrusel
function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// Inicialización
duplicateImages();
updateCarousel();