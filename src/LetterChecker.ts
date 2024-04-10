import { MAX_WORD_SIZE } from "./env.js";
import { UIChanger } from "./UIChanger.js";

export class LetterChecker {
    #pickedWord: string
    #actualWord: string
    #turn: number
    #userInterface: UIChanger

    constructor(pickedWord: string){     
        this.#pickedWord = pickedWord;
        this.#actualWord = "";
        this.#turn = 1;
        this.#userInterface = new UIChanger();

    }

    static checkWrongLetters(actualWord: string | string[], pickedWord: string, turn: number, userInterface: UIChanger) {
        let actualLetter = "";
        let pattern;
        let numberOfCoincidencesPickedWord = 0;
        for (let i = 0; i < MAX_WORD_SIZE; i++) {
            actualLetter = actualWord[i];
            pattern = new RegExp(actualLetter, "g");
            numberOfCoincidencesPickedWord = (pickedWord.match(pattern) || []).length;
            if (numberOfCoincidencesPickedWord == 0) userInterface.changeBackgroundPosition(turn, i, "wrongLetter");
        }
    }

    checkRightLetters = ():void=>{
        for(let i=0; i<this.#actualWord.length; i++){
            if (this.#pickedWord[i]==this.#actualWord[i]){
                this.#userInterface.changeBackgroundPosition(this.#turn, i, "rightLetter");
            }
        }
    }

    static checkMisplacedLetters(actualWord: string, pickedWord: string, turn: number, userInterface: UIChanger) {
        for (let i = 0; i < MAX_WORD_SIZE; i++) {
            const actualLetter = actualWord[i];
            const numberOfCoincidencesPickedWord = this.countOccurrences(pickedWord, actualLetter);
            const numberOfCoincidencesActualWord = this.countOccurrences(actualWord, actualLetter);
            const differenceOfCoincidences = Math.abs(numberOfCoincidencesActualWord - numberOfCoincidencesPickedWord);

            if (differenceOfCoincidences === 1 || (differenceOfCoincidences === 0 && pickedWord[i] !== actualWord[i])) {
                userInterface.changeBackgroundPosition(turn, i, "misplacedLetter");
            }
        }
    }

    static countOccurrences(word: string, letter: string | RegExp) {
        const regex = new RegExp(letter, "g");
        return (word.match(regex) || []).length;
    }
}