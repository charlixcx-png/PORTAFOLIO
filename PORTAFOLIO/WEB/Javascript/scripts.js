document.addEventListener('DOMContentLoaded', function () {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
});
// Selecciona todos los botones de "Ver más"
const toggleButtons = document.querySelectorAll('.toggle-info');

// Añade el evento de clic para desplegar la información extra
toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
        const moreInfo = this.parentElement.nextElementSibling; // Encuentra el div .more-info cercano

        // Ver más/menos
        if (moreInfo.style.display === "block") {
            moreInfo.style.display = "none";
            this.textContent = "Ver más";
        } else {
            moreInfo.style.display = "block";
            this.textContent = "Ver menos";
        }

        console.log('Botón "Ver más" clickeado'); // Aquí puedes ver si se registra el clic
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const progresses = document.querySelectorAll('.progress');

    progresses.forEach(progress => {
        const value = progress.getAttribute('data-value');
        progress.style.width = `${value}%`;
    });
});

