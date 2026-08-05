// Функция для инициализации отдельной галереи
function initGallery(gallerySelector, modalId, bigImageId) {
    const images = document.querySelectorAll(gallerySelector + " img");
    const modal = document.getElementById(modalId);
    const bigImage = document.getElementById(bigImageId);
    const left = modal.querySelector(".left");
    const right = modal.querySelector(".right");
    const close = modal.querySelector(".close");
    
    let current = 0;

    function openImage(index) {
        current = index;
        bigImage.src = images[current].src;
        
        modal.style.display = "flex";
        
        requestAnimationFrame(() => {
            modal.classList.add("show");
        });
    }

    function closeModal() {
        modal.classList.remove("show");
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }

    function nextImage() {
        current = (current + 1) % images.length;
        bigImage.src = images[current].src;
    }

    function prevImage() {
        current = (current - 1 + images.length) % images.length;
        bigImage.src = images[current].src;
    }

    // Открытие по клику на изображение
    images.forEach((img, index) => {
        img.onclick = () => {
            openImage(index);
        };
    });

    // Кнопки навигации
    right.onclick = (e) => {
        e.stopPropagation();
        nextImage();
    };

    left.onclick = (e) => {
        e.stopPropagation();
        prevImage();
    };

    // Закрытие
    close.onclick = (e) => {
        e.stopPropagation();
        closeModal();
    };

    // Закрытие по клику на фон
    modal.onclick = (e) => {
        if (e.target === modal) closeModal();
    };

    // Клавиатура для этого модального окна
    document.addEventListener("keydown", (e) => {
        if (modal.style.display !== "flex") return;
        
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "Escape") closeModal();
    });
}

// Универсальная функция копирования
function copyText(element) {
    const text = element.getAttribute('data-copy-text');
    
    if (!text) {
        console.error('Текст для копирования не найден');
        return;
    }
    
    navigator.clipboard.writeText(text)
        .then(() => {
            const originalText = element.innerHTML;
            element.innerHTML = 'Скопировано';
            element.style.backgroundColor = '#7a7a7ad0';
            
            setTimeout(() => {
                element.innerHTML = originalText;
                element.style.backgroundColor = 'rgba(92, 92, 92, 0.493)';
            }, 2000);
        })
        .catch(() => {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            const originalText = element.innerHTML;
            element.innerHTML = 'Скопировано';
            element.style.backgroundColor = '#7a7a7ad0';
            
            setTimeout(() => {
                element.innerHTML = originalText;
                element.style.backgroundColor = 'rgba(92, 92, 92, 0.493)';
            }, 2000);
        });
}

// Функция для прокрутки галереи со стрелками
function scrollGallery(galleryClass, direction) {
    const gallery = document.querySelector('.' + galleryClass);
    if (!gallery) return;
    
    const scrollAmount = 440; // ширина изображения (400) + gap (40)
    gallery.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

// Инициализируем все галереи
initGallery(".gallery-1", "modal1", "bigImage1");
initGallery(".gallery-2", "modal2", "bigImage2");
initGallery(".gallery-3", "modal3", "bigImage3");
initGallery(".gallery-4", "modal4", "bigImage4");
initGallery(".gallery-5", "modal5", "bigImage5");
initGallery(".gallery-6", "modal6", "bigImage6");