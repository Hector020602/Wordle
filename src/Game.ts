import {MAX_WORD_SIZE, MAX_ATTEMPTS} from "./env.js";
import {UIChanger} from "./UIChanger.js";
import { LetterChecker } from "./LetterChecker.js";
import { CodeTransformer } from "./CodeTransformer.js";

export class Game{
    #pickedWord: string
    #actualWord: string
    #turn: number
    #actualPosition: number
    #validLetterCodes: string[]
    #userInterface: UIChanger

    constructor(pickedWord: string){     
        this.#pickedWord = pickedWord;
        this.#actualWord = "";
        this.#turn = 1;
        this.#actualPosition = 0;
        this.#validLetterCodes = ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Semicolon"];
        this.#userInterface = new UIChanger();

    }

    get pickedWord(){
        return this.#pickedWord;
    }
    set pickedWord(word){
        this.#pickedWord = word;
    }

    get actualWord(){
        return this.#actualWord;
    }
    set actualWord(word){
        this.#actualWord = word;
    }

    get turn(){
        return this.#turn;
    }
    set turn(num){
        this.#turn = num;
    }

    get actualPosition(){
        return this.#actualPosition;
    }
    set actualPosition(num){
        this.#actualPosition = num;
    }

    get validLetterCodes() {
        return this.#validLetterCodes
    }
    set validLetterCodes(letters) {
        this.#validLetterCodes = letters;
    }

    get interface() {
        return this.#userInterface;
    }
    set interface(i) {
        this.#userInterface = i;
    }

    isValidLetter(code: string):boolean {
        
        return  this.#validLetterCodes.includes(code) && this.#actualWord.length < this.#pickedWord.length;
    }

    isEnterKey(code: string):boolean {
        return code=="Enter";
    }

    isBackspaceKey(code: string):boolean{
        return code=="Backspace";
    }

    newLetter(code: string):void{
        if (this.#actualPosition >= this.#pickedWord.length) {
            return;
        }
        
        let letter: string = this.transformCodeToLetter(code);
        this.#userInterface.setNewLetter(this.turn, this.actualPosition, letter);
        this.#actualPosition++;
        this.#actualWord += letter;
    }

    checkWordIsRight():void{
        if (this.#actualWord == this.#pickedWord){
            location.assign("/winner");
        }
    }

    checkWrongLetters(): void {
        LetterChecker.checkWrongLetters(this.#actualWord, this.#pickedWord, this.#turn, this.#userInterface);
    }

    checkMisplacedLetters(): void {
        LetterChecker.checkMisplacedLetters(this.#actualWord, this.#pickedWord, this.#turn, this.#userInterface);
    }

    transformCodeToLetter(code: string): string {
        return CodeTransformer.transform(code);
    }

    updateAfterANewWord = ():void=>{
        this.checkMisplacedLetters();
        this.checkWrongLetters();
        this.#turn = this.#turn + 1;
        this.#actualPosition = 0;
        this.#actualWord = "";
    }

    enterPressed():void{
        if (this.#actualWord.length == MAX_WORD_SIZE){
            this.checkWordIsRight();
            this.checkGameIsOver();
            this.updateAfterANewWord();
        }
    }

    //He cambiado para que al borrar la ultima letra de una palabra y poner otra me deje, antes no se podia
    backspacePressed():void{
        if (this.#actualPosition > 0) {
            this.#actualPosition -= 1;
            this.#userInterface.deleteLetter(this.#turn, this.#actualPosition);
            this.actualWord = this.actualWord.slice(0, this.actualPosition);
        }
    }

    newKeyPressed(code: string):void{ 
        if (this.isValidLetter(code)) this.newLetter(code);
        if (this.isEnterKey(code)) this.enterPressed();
        if (this.isBackspaceKey(code)) this.backspacePressed();
        this.#userInterface.changeBackgroundKey(code);
    }

    //He hecho que al poner la ultima palabra mal pierdas, que no funcionaba bien
    checkGameIsOver():void{
        if (this.turn == MAX_ATTEMPTS && this.actualWord != this.#pickedWord){
            location.assign("/loser");
        }
    }
}