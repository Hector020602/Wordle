var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Game_pickedWord, _Game_actualWord, _Game_turn, _Game_actualPosition, _Game_validLetterCodes, _Game_userInterface;
import { MAX_WORD_SIZE, MAX_ATTEMPTS } from "./env.js";
import { UIChanger } from "./UIChanger.js";
import { LetterChecker } from "./LetterChecker.js";
import { CodeTransformer } from "./CodeTransformer.js";
export class Game {
    constructor(pickedWord) {
        _Game_pickedWord.set(this, void 0);
        _Game_actualWord.set(this, void 0);
        _Game_turn.set(this, void 0);
        _Game_actualPosition.set(this, void 0);
        _Game_validLetterCodes.set(this, void 0);
        _Game_userInterface.set(this, void 0);
        this.updateAfterANewWord = () => {
            this.checkMisplacedLetters();
            this.checkWrongLetters();
            __classPrivateFieldSet(this, _Game_turn, __classPrivateFieldGet(this, _Game_turn, "f") + 1, "f");
            __classPrivateFieldSet(this, _Game_actualPosition, 0, "f");
            __classPrivateFieldSet(this, _Game_actualWord, "", "f");
        };
        __classPrivateFieldSet(this, _Game_pickedWord, pickedWord, "f");
        __classPrivateFieldSet(this, _Game_actualWord, "", "f");
        __classPrivateFieldSet(this, _Game_turn, 1, "f");
        __classPrivateFieldSet(this, _Game_actualPosition, 0, "f");
        __classPrivateFieldSet(this, _Game_validLetterCodes, ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Semicolon"], "f");
        __classPrivateFieldSet(this, _Game_userInterface, new UIChanger(), "f");
    }
    get pickedWord() {
        return __classPrivateFieldGet(this, _Game_pickedWord, "f");
    }
    set pickedWord(word) {
        __classPrivateFieldSet(this, _Game_pickedWord, word, "f");
    }
    get actualWord() {
        return __classPrivateFieldGet(this, _Game_actualWord, "f");
    }
    set actualWord(word) {
        __classPrivateFieldSet(this, _Game_actualWord, word, "f");
    }
    get turn() {
        return __classPrivateFieldGet(this, _Game_turn, "f");
    }
    set turn(num) {
        __classPrivateFieldSet(this, _Game_turn, num, "f");
    }
    get actualPosition() {
        return __classPrivateFieldGet(this, _Game_actualPosition, "f");
    }
    set actualPosition(num) {
        __classPrivateFieldSet(this, _Game_actualPosition, num, "f");
    }
    get validLetterCodes() {
        return __classPrivateFieldGet(this, _Game_validLetterCodes, "f");
    }
    set validLetterCodes(letters) {
        __classPrivateFieldSet(this, _Game_validLetterCodes, letters, "f");
    }
    get interface() {
        return __classPrivateFieldGet(this, _Game_userInterface, "f");
    }
    set interface(i) {
        __classPrivateFieldSet(this, _Game_userInterface, i, "f");
    }
    isValidLetter(code) {
        return __classPrivateFieldGet(this, _Game_validLetterCodes, "f").includes(code) && __classPrivateFieldGet(this, _Game_actualWord, "f").length < __classPrivateFieldGet(this, _Game_pickedWord, "f").length;
    }
    isEnterKey(code) {
        return code == "Enter";
    }
    isBackspaceKey(code) {
        return code == "Backspace";
    }
    newLetter(code) {
        var _a;
        if (__classPrivateFieldGet(this, _Game_actualPosition, "f") >= __classPrivateFieldGet(this, _Game_pickedWord, "f").length) {
            return;
        }
        let letter = this.transformCodeToLetter(code);
        __classPrivateFieldGet(this, _Game_userInterface, "f").setNewLetter(this.turn, this.actualPosition, letter);
        __classPrivateFieldSet(this, _Game_actualPosition, (_a = __classPrivateFieldGet(this, _Game_actualPosition, "f"), _a++, _a), "f");
        __classPrivateFieldSet(this, _Game_actualWord, __classPrivateFieldGet(this, _Game_actualWord, "f") + letter, "f");
    }
    checkWordIsRight() {
        if (__classPrivateFieldGet(this, _Game_actualWord, "f") == __classPrivateFieldGet(this, _Game_pickedWord, "f")) {
            location.assign("/winner");
        }
    }
    checkWrongLetters() {
        LetterChecker.checkWrongLetters(__classPrivateFieldGet(this, _Game_actualWord, "f"), __classPrivateFieldGet(this, _Game_pickedWord, "f"), __classPrivateFieldGet(this, _Game_turn, "f"), __classPrivateFieldGet(this, _Game_userInterface, "f"));
    }
    checkMisplacedLetters() {
        LetterChecker.checkMisplacedLetters(__classPrivateFieldGet(this, _Game_actualWord, "f"), __classPrivateFieldGet(this, _Game_pickedWord, "f"), __classPrivateFieldGet(this, _Game_turn, "f"), __classPrivateFieldGet(this, _Game_userInterface, "f"));
    }
    transformCodeToLetter(code) {
        return CodeTransformer.transform(code);
    }
    enterPressed() {
        if (__classPrivateFieldGet(this, _Game_actualWord, "f").length == MAX_WORD_SIZE) {
            this.checkWordIsRight();
            this.checkGameIsOver();
            this.updateAfterANewWord();
        }
    }
    //He cambiado para que al borrar la ultima letra de una palabra y poner otra me deje, antes no se podia
    backspacePressed() {
        if (__classPrivateFieldGet(this, _Game_actualPosition, "f") > 0) {
            __classPrivateFieldSet(this, _Game_actualPosition, __classPrivateFieldGet(this, _Game_actualPosition, "f") - 1, "f");
            __classPrivateFieldGet(this, _Game_userInterface, "f").deleteLetter(__classPrivateFieldGet(this, _Game_turn, "f"), __classPrivateFieldGet(this, _Game_actualPosition, "f"));
            this.actualWord = this.actualWord.slice(0, this.actualPosition);
        }
    }
    newKeyPressed(code) {
        if (this.isValidLetter(code))
            this.newLetter(code);
        if (this.isEnterKey(code))
            this.enterPressed();
        if (this.isBackspaceKey(code))
            this.backspacePressed();
        __classPrivateFieldGet(this, _Game_userInterface, "f").changeBackgroundKey(code);
    }
    //He hecho que al poner la ultima palabra mal pierdas, que no funcionaba bien
    checkGameIsOver() {
        if (this.turn == MAX_ATTEMPTS && this.actualWord != __classPrivateFieldGet(this, _Game_pickedWord, "f")) {
            location.assign("/loser");
        }
    }
}
_Game_pickedWord = new WeakMap(), _Game_actualWord = new WeakMap(), _Game_turn = new WeakMap(), _Game_actualPosition = new WeakMap(), _Game_validLetterCodes = new WeakMap(), _Game_userInterface = new WeakMap();
