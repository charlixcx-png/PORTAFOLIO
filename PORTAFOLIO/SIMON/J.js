// Array global que contiene los colores del juego
var buttonColors = ["red", "blue", "green", "yellow",];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Evento para iniciar el juego al presionar una tecla
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// Función que genera la secuencia de colores aleatorios
function nextSequence() {
    userClickedPattern = [];  // Resetear el patrón del usuario

    level++;  // Incrementar el nivel
    $("#level-title").text("Level " + level);  // Actualizar el encabezado con el nivel actual

    var randomNumber = Math.floor(Math.random() * 5);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    

    // Animar el botón seleccionado
    animatePress(randomChosenColor);

    // Reproducir el sonido correspondiente
    playSound(randomChosenColor);
}

// Evento de clic para todos los botones
$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");  // Obtener el color del botón clicado
    userClickedPattern.push(userChosenColor);  // Añadir el color clicado al patrón del usuario

    playSound(userChosenColor);  // Reproducir el sonido correspondiente
    animatePress(userChosenColor);  // Animar el botón clicado

    // Verificar la respuesta del usuario
    checkAnswer(userClickedPattern.length - 1);
});

// Función para verificar la respuesta del usuario
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
        console.log("wrong");
        // Reproducir el sonido "wrong"
        playSound("wrong");

        // Añadir la clase gameOver para cambiar el fondo por 200 ms
        $("body").addClass("gameOver");
        setTimeout(function() {
            $("body").removeClass("gameOver");
        }, 500);

        // Mostrar el mensaje de Game Over
        $("#level-title").text("Game over :( Press Any Key to Restart");

        // Llamar a la función para reiniciar el juego
        startOver();
    }
}
// Función para reproducir el sonido correspondiente al color
function playSound(color) {
    var audio = new Audio("Sounds/" + color + ".mp3");
    audio.play();
}

// Función para animar el botón
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// Función para reiniciar el juego
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}