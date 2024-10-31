// Función para verificar si un número es primo
function isPrime(num) {
    if (num <= 1) return false;
    for (var i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Función para encontrar el siguiente número primo después del número ingresado
function checkPrime(number) {
    var maxNum = 1299827;
    if (number < maxNum && !isNaN(number)) {
        for (var i = number + 1; i < maxNum; i++) {
            if (isPrime(i)) {
                return i;
            }
        }
    }
    return null;
}

// Función para obtener los factores primos del número ingresado
function getPrimeFactors(n) {
    var factors = [];
    // Manejo del factor 2
    while (n % 2 === 0) {
        factors.push(2);
        n = n / 2;
    }
    // Manejo de los factores impares
    for (var i = 3; i <= Math.sqrt(n); i += 2) {
        while (n % i === 0) {
            factors.push(i);
            n = n / i;
        }
    }
    // Si n es un número primo mayor que 2
    if (n > 2) {
        factors.push(n);
    }
    return factors;
}

// Función para actualizar la interfaz con el siguiente número primo y los factores primos
function updateResults() {
    var number = parseInt(document.getElementById("num").value);
    if (!isNaN(number) && number > 1) {
        // Obtener y mostrar el siguiente número primo
        var nextPrime = checkPrime(number);
        if (nextPrime) {
            document.getElementById("nextPrime").textContent = "Next Prime: " + nextPrime;
        } else {
            document.getElementById("nextPrime").textContent = "No next prime found within the limit.";
        }

        // Obtener y mostrar los factores primos
        var factors = getPrimeFactors(number);
        document.getElementById("pf").textContent = "Prime Factors: " + factors.join(", ");
    } else {
        window.alert("Please enter a valid number greater than 1.");
    }
}
