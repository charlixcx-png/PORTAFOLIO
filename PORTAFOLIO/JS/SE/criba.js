document.addEventListener("DOMContentLoaded", function () {
    // Función para implementar la criba de Eratóstenes
    var sieve = function (n) {
      "use strict";
  
      var array = new Array(n + 1).fill(true); // Creamos una lista de n+1 elementos y los llenamos con `true`
      var primes = [];
  
      array[0] = array[1] = false; // 0 y 1 no son primos
  
      // Inicia desde el número 2, que es el primer número primo
      for (var p = 2; p * p <= n; p++) {
        if (array[p] === true) {
          // Marca todos los múltiplos de p como no primos
          for (var i = p * p; i <= n; i += p) {
            array[i] = false;
          }
        }
      }
  
      // Añadimos todos los números que siguen marcados como `true` a la lista de primos
      for (var j = 2; j <= n; j++) {
        if (array[j] === true) {
          primes.push(j);
        }
      }
  
      return primes;
    };
  
    // Función para manejar el evento cuando el botón es presionado
    document.getElementById("btn").addEventListener("click", function () {
      var num = parseInt(document.getElementById("num").value, 10); // Obtener el número del input
      if (isNaN(num) || num < 2) {
        document.getElementById("primes").innerHTML = "Please enter a number greater than or equal to 2.";
        return;
      }
  
      // Llamamos a la función `sieve` y mostramos los primos
      var primes = sieve(num);
      document.getElementById("primes").innerHTML = primes.join(", ");
    });
  });
  