// Array to store calculated Fibonacci numbers
var memo = {};

function fibonacci() {
    "use strict";
    // Get the value entered by the user
    var n = parseInt(document.getElementById("num").value);
    
    // Validate if the input is a positive integer
    if (isNaN(n) || n < 1) {
        alert("Please enter a valid positive integer.");
        return;
    }

    // Calculate Fibonacci value
    var val = f(n);

    // Display the result in the HTML
    document.getElementById("fibonacciLbl").textContent = "Fibonacci(" + n + ") = " + val;
}

function f(n) {

    if (n === 1 || n === 2) {
        return 1;
    }

    // Check if the value is already in the memo
    if (memo.hasOwnProperty(n)) {
        return memo[n];
    }

    // Calculate Fibonacci
    var value = f(n - 1) + f(n - 2);
    memo[n] = value;  // Save the result in memo to avoid recalculating
    
    return value;
}
