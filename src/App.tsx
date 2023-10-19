import { useEffect, useState } from "react";
import {letters} from "./helpers/letters";
import './App.css'
import { HangImage } from "./components/HangImage";
import { getRandomWord } from "./helpers/getRandomWord";

function App() {
  const [word, setWord] = useState( getRandomWord() );
  const [hiddenWord, setHiddenWorld] = useState('_ '.repeat(word.length));
  const [ attempts, setAttemps ] = useState(0);
  const [lose, setLose] = useState(false);
  const [won, setWon] = useState(false);

// DETERMINAR SI LA PERSONA PERDIÓ
  useEffect( () => {
    if ( attempts >= 9 ) {
      setLose(true);
    }
  }, [attempts] ) // HOOKS


// DETERMINAR SI LA PERSONA GANÓ 

  useEffect( () => {
    console.log(hiddenWord);
    const currentHiddenWord = hiddenWord.split(' ').join('');
    if (currentHiddenWord === word) {
      setWon(true);
    }    
  }, [hiddenWord] );

  const checkLetter = (letter: string) => {

    if ( lose ) return; // PODEMOS PONER EL RETURN SIN LLAVES SI EL IF SOLO TIENE UNA LÍNEA

    if (!word.includes(letter)) {
      setAttemps( Math.min(attempts + 1, 9));    
      return;
    }

    const hiddenWordArray = hiddenWord.split(' ');
    
    for(let i = 0; i < word.length; i++) {
      if ( word[i] === letter) {
        hiddenWordArray[i] = letter;
      }
    }

    setHiddenWorld( hiddenWordArray.join(' '));

  }

  const newGame = () => {
    
    const newWord = getRandomWord();

    setWord( newWord );
    setHiddenWorld('_ '.repeat(newWord.length));

    setAttemps( 0 );
    setLose( false );
    setWon( false );

  }
  
  return (
    
    <div className="App">

      {/* Imágenes // CONTROL + K + C Para hacer comentarios */}  

      <HangImage imageNumber = { attempts }/>

      <h3>{hiddenWord} </h3>

      {/* Contador de intentos */}

      <h3>Intentos: { attempts } </h3>

      {/* Mensaje si perdio */}

      {
        (lose) ? <h2>Perdió {word} </h2>: ''
      }

      {/* Mensaje si ganó */}

      {
        (won) ? <h2>Felicidades, usted ha ganado!</h2>: ''
      }

      {/* Botónes de letras */}

      {
        letters.map( (letter) => (
          <button 
          onClick={ () => checkLetter( letter ) }
          key={letter}>
             {letter} 
          </button>
        ) )
      }


      <br /><br />

      <button onClick={ newGame }>¿ Quieres jugar de nuevo ?</button>


    </div>
  )
  
}

export default App
