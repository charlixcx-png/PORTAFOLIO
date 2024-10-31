import swQuotes from 'star-wars-quotes';
import superheroes from 'superheroes';
import supervillains from 'supervillains';

// Imprimir una cita de Star Wars
console.log(swQuotes.sw());

// Crear una batalla épica
const hero = superheroes.random();
const villain = supervillains.random();
console.log(`¡Una batalla épica entre ${hero} y ${villain}!`);
