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
var _Letter_pickedWord, _Letter_actualWord, _Letter_turn, _Letter_actualPosition, _Letter_validLetterCodes, _Letter_userInterface;
import { MAX_WORD_SIZE } from "./env.js";
import { UIChanger } from "./UIChanger.js";
export class Letter {
    constructor(pickedWord) {
        _Letter_pickedWord.set(this, void 0);
        _Letter_actualWord.set(this, void 0);
        _Letter_turn.set(this, void 0);
        _Letter_actualPosition.set(this, void 0);
        _Letter_validLetterCodes.set(this, void 0);
        _Letter_userInterface.set(this, void 0);
        this.checkRightLetters = () => {
            for (let i = 0; i < __classPrivateFieldGet(this, _Letter_actualWord, "f").length; i++) {
                if (__classPrivateFieldGet(this, _Letter_pickedWord, "f")[i] == __classPrivateFieldGet(this, _Letter_actualWord, "f")[i]) {
                    __classPrivateFieldGet(this, _Letter_userInterface, "f").changeBackgroundPosition(__classPrivateFieldGet(this, _Letter_turn, "f"), i, "rightLetter");
                }
            }
        };
        this.checkMisplacedLetters = () => {
            let actualLetter = "";
            let pattern;
            let numberOfCoincidencesPickedWord = 0;
            let numberOfCoincidencesActualWord = 0;
            let differenceOfCoincidences = 0;
            let isMisplacedLetter = true;
            for (let i = 0; i < MAX_WORD_SIZE; i++) {
                isMisplacedLetter = true;
                actualLetter = __classPrivateFieldGet(this, _Letter_actualWord, "f")[i];
                pattern = new RegExp(actualLetter, "g");
                numberOfCoincidencesPickedWord = (__classPrivateFieldGet(this, _Letter_pickedWord, "f").match(pattern) || []).length;
                numberOfCoincidencesActualWord = (__classPrivateFieldGet(this, _Letter_actualWord, "f").match(pattern) || []).length;
                differenceOfCoincidences = Math.abs(numberOfCoincidencesActualWord - numberOfCoincidencesPickedWord);
                if (differenceOfCoincidences == 1) {
                    for (let j = 0; j < MAX_WORD_SIZE; j++) {
                        if (__classPrivateFieldGet(this, _Letter_pickedWord, "f")[j] == actualLetter) {
                            isMisplacedLetter = false;
                            break;
                        }
                    }
                }
                if (differenceOfCoincidences == 0 && __classPrivateFieldGet(this, _Letter_pickedWord, "f")[i] == __classPrivateFieldGet(this, _Letter_actualWord, "f")[i]) {
                    isMisplacedLetter = false;
                }
                if (numberOfCoincidencesPickedWord > 0 && isMisplacedLetter)
                    __classPrivateFieldGet(this, _Letter_userInterface, "f").changeBackgroundPosition(__classPrivateFieldGet(this, _Letter_turn, "f"), i, "misplacedLetter");
            }
        };
        this.checkWrongLetters = () => {
            let actualLetter = "";
            let pattern;
            let numberOfCoincidencesPickedWord = 0;
            for (let i = 0; i < MAX_WORD_SIZE; i++) {
                actualLetter = __classPrivateFieldGet(this, _Letter_actualWord, "f")[i];
                pattern = new RegExp(actualLetter, "g");
                numberOfCoincidencesPickedWord = (__classPrivateFieldGet(this, _Letter_pickedWord, "f").match(pattern) || []).length;
                if (numberOfCoincidencesPickedWord == 0)
                    __classPrivateFieldGet(this, _Letter_userInterface, "f").changeBackgroundPosition(__classPrivateFieldGet(this, _Letter_turn, "f"), i, "wrongLetter");
            }
        };
        this.updateAfterANewWord = () => {
            this.checkRightLetters();
            this.checkMisplacedLetters();
            this.checkWrongLetters();
            __classPrivateFieldSet(this, _Letter_turn, __classPrivateFieldGet(this, _Letter_turn, "f") + 1, "f");
            __classPrivateFieldSet(this, _Letter_actualPosition, 0, "f");
            __classPrivateFieldSet(this, _Letter_actualWord, "", "f");
        };
        __classPrivateFieldSet(this, _Letter_pickedWord, pickedWord, "f");
        __classPrivateFieldSet(this, _Letter_actualWord, "", "f");
        __classPrivateFieldSet(this, _Letter_turn, 1, "f");
        __classPrivateFieldSet(this, _Letter_actualPosition, 0, "f");
        __classPrivateFieldSet(this, _Letter_validLetterCodes, ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Semicolon"], "f");
        __classPrivateFieldSet(this, _Letter_userInterface, new UIChanger(), "f");
    }
    get pickedWord() {
        return __classPrivateFieldGet(this, _Letter_pickedWord, "f");
    }
    set pickedWord(word) {
        __classPrivateFieldSet(this, _Letter_pickedWord, word, "f");
    }
    get actualWord() {
        return __classPrivateFieldGet(this, _Letter_actualWord, "f");
    }
    set actualWord(word) {
        __classPrivateFieldSet(this, _Letter_actualWord, word, "f");
    }
    get turn() {
        return __classPrivateFieldGet(this, _Letter_turn, "f");
    }
    set turn(num) {
        __classPrivateFieldSet(this, _Letter_turn, num, "f");
    }
    get actualPosition() {
        return __classPrivateFieldGet(this, _Letter_actualPosition, "f");
    }
    set actualPosition(num) {
        __classPrivateFieldSet(this, _Letter_actualPosition, num, "f");
    }
    get validLetterCodes() {
        return __classPrivateFieldGet(this, _Letter_validLetterCodes, "f");
    }
    set validLetterCodes(letters) {
        __classPrivateFieldSet(this, _Letter_validLetterCodes, letters, "f");
    }
    get interface() {
        return __classPrivateFieldGet(this, _Letter_userInterface, "f");
    }
    set interface(i) {
        __classPrivateFieldSet(this, _Letter_userInterface, i, "f");
    }
    isValidLetter(code) {
        return __classPrivateFieldGet(this, _Letter_validLetterCodes, "f").includes(code) && __classPrivateFieldGet(this, _Letter_actualWord, "f").length < __classPrivateFieldGet(this, _Letter_pickedWord, "f").length;
    }
    isEnterKey(code) {
        return code == "Enter";
    }
    isBackspaceKey(code) {
        return code == "Backspace";
    }
    transformCodeToLetter(code) {
        let letter = "";
        if (code == "Semicolon")
            letter = "Ñ";
        else
            letter = code.split("y")[1];
        return letter;
    }
    newLetter(code) {
        var _a;
        if (__classPrivateFieldGet(this, _Letter_actualPosition, "f") >= __classPrivateFieldGet(this, _Letter_pickedWord, "f").length) {
            return;
        }
        let letter = this.transformCodeToLetter(code);
        __classPrivateFieldGet(this, _Letter_userInterface, "f").setNewLetter(this.turn, this.actualPosition, letter);
        __classPrivateFieldSet(this, _Letter_actualPosition, (_a = __classPrivateFieldGet(this, _Letter_actualPosition, "f"), _a++, _a), "f");
        __classPrivateFieldSet(this, _Letter_actualWord, __classPrivateFieldGet(this, _Letter_actualWord, "f") + letter, "f");
    }
    checkWordIsRight() {
        if (__classPrivateFieldGet(this, _Letter_actualWord, "f") == __classPrivateFieldGet(this, _Letter_pickedWord, "f")) {
            location.assign("/winner");
        }
    }
    enterPressed() {
        if (__classPrivateFieldGet(this, _Letter_actualWord, "f").length == MAX_WORD_SIZE) {
            this.checkWordIsRight();
            this.updateAfterANewWord();
        }
    }
    //He cambiado para que al borrar la ultima letra de una palabra y poner otra me deje, antes no se podia
    backspacePressed() {
        if (__classPrivateFieldGet(this, _Letter_actualPosition, "f") > 0) {
            __classPrivateFieldSet(this, _Letter_actualPosition, __classPrivateFieldGet(this, _Letter_actualPosition, "f") - 1, "f");
            __classPrivateFieldGet(this, _Letter_userInterface, "f").deleteLetter(__classPrivateFieldGet(this, _Letter_turn, "f"), __classPrivateFieldGet(this, _Letter_actualPosition, "f"));
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
        __classPrivateFieldGet(this, _Letter_userInterface, "f").changeBackgroundKey(code);
    }
}
_Letter_pickedWord = new WeakMap(), _Letter_actualWord = new WeakMap(), _Letter_turn = new WeakMap(), _Letter_actualPosition = new WeakMap(), _Letter_validLetterCodes = new WeakMap(), _Letter_userInterface = new WeakMap();
