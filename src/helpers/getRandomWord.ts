
let words: string[] = [

    'PAPAYA',
    'AGUACATE',
    'CARRO',
    'CASA',
    'ANIMAL', 
    'PERRO',
    'GATO', 
    'APARTAMENTO',
    'MOTO'

];

export function getRandomWord() {

    const randomIndex = Math.floor( Math.random() * words.length );    
    return words[randomIndex];
}