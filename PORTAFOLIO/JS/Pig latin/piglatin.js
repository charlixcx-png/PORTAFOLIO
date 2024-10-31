/*
Pig Latin
*/

function igpayAtinlay() {
  var inputText = document.getElementById("txtVal").value; // Leer el valor del campo de texto
  if (!inputText) {
      document.getElementById("pigLatLbl").textContent = "Please enter a word.";
      return;
  }
  
  var wordArray = inputText.split(" "); // Dividir el texto en palabras
  var returnArray = [];

  // Iterar sobre cada palabra
  for (var i = 0; i < wordArray.length; i++) {
      var word = wordArray[i];
      var beginning = word.charAt(0);
      var restOfWord = "";

      // Si la palabra empieza con una vocal
      if (/[aeiouAEIOU]/.test(beginning)) {
          returnArray.push(word + "yay"); // Agregar 'way' al final
          continue;
      }

      // Si la palabra empieza con una consonante o grupo de consonantes
      for (var ii = 1; ii < word.length; ii++) {
          if (/[aeiouAEIOU]/.test(word.charAt(ii))) {
              restOfWord = word.slice(ii); // Obtener la parte después de la primera vocal
              break;
          } else {
              beginning += word.charAt(ii); // Agregar la consonante a la variable "beginning"
          }
      }

      returnArray.push(restOfWord + beginning + "ay"); // Reorganizar la palabra en Pig Latin
  }

  // Mostrar el resultado en el HTML
  document.getElementById("pigLatLbl").textContent = returnArray.join(" ");
}
