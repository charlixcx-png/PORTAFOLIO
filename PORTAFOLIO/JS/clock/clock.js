function drawClock(ctx, radius) {
    drawFace(ctx, radius); // Dibuja la esfera del reloj
    drawNumbers(ctx, radius); // Dibuja los números
    drawTime(ctx, radius); // Dibuja las manecillas
}

function drawFace(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI); // Dibuja el círculo del reloj
    ctx.fillStyle = "white"; // Color de fondo de la esfera
    ctx.fill();

    // Dibuja el círculo central
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
    ctx.fillStyle = "#333";
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    for (num = 1; num <= 12; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang); // Rota al ángulo del número
        ctx.translate(0, -radius * 0.85); // Traslada el texto al borde del reloj
        ctx.rotate(-ang); // Rota el número a su posición correcta
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang); // Restaura la rotación
        ctx.translate(0, radius * 0.85); // Regresa a la posición original
        ctx.rotate(-ang); // Corrige la rotación de vuelta
    }
}

function drawTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    // Calcula el ángulo de la manecilla de las horas
    hour = (hour % 12) * Math.PI / 6 + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.07); // Dibuja la manecilla de las horas

    // Calcula el ángulo de la manecilla de los minutos
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.07); // Dibuja la manecilla de los minutos

    // Calcula el ángulo de la manecilla de los segundos
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, radius * 0.02); // Dibuja la manecilla de los segundos
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round"; // Redondea los extremos de las manecillas
    ctx.moveTo(0, 0); // Empieza en el centro
    ctx.rotate(pos); // Rota al ángulo calculado
    ctx.lineTo(0, -length); // Dibuja la manecilla
    ctx.stroke(); // Aplica el trazo
    ctx.rotate(-pos); // Deshace la rotación
}
