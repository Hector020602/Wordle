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
var _LetterChecker_pickedWord, _LetterChecker_actualWord, _LetterChecker_turn, _LetterChecker_userInterface;
import { MAX_WORD_SIZE } from "./env.js";
import { UIChanger } from "./UIChanger.js";
export class LetterChecker {
    constructor(pickedWord) {
        _LetterChecker_pickedWord.set(this, void 0);
        _LetterChecker_actualWord.set(this, void 0);
        _LetterChecker_turn.set(this, void 0);
        _LetterChecker_userInterface.set(this, void 0);
        this.checkRightLetters = () => {
            for (let i = 0; i < __classPrivateFieldGet(this, _LetterChecker_actualWord, "f").length; i++) {
                if (__classPrivateFieldGet(this, _LetterChecker_pickedWord, "f")[i] == __classPrivateFieldGet(this, _LetterChecker_actualWord, "f")[i]) {
                    __classPrivateFieldGet(this, _LetterChecker_userInterface, "f").changeBackgroundPosition(__classPrivateFieldGet(this, _LetterChecker_turn, "f"), i, "rightLetter");
                }
            }
        };
        __classPrivateFieldSet(this, _LetterChecker_pickedWord, pickedWord, "f");
        __classPrivateFieldSet(this, _LetterChecker_actualWord, "", "f");
        __classPrivateFieldSet(this, _LetterChecker_turn, 1, "f");
        __classPrivateFieldSet(this, _LetterChecker_userInterface, new UIChanger(), "f");
    }
    static checkWrongLetters(actualWord, pickedWord, turn, userInterface) {
        let actualLetter = "";
        let pattern;
        let numberOfCoincidencesPickedWord = 0;
        for (let i = 0; i < MAX_WORD_SIZE; i++) {
            actualLetter = actualWord[i];
            pattern = new RegExp(actualLetter, "g");
            numberOfCoincidencesPickedWord = (pickedWord.match(pattern) || []).length;
            if (numberOfCoincidencesPickedWord == 0)
                userInterface.changeBackgroundPosition(turn, i, "wrongLetter");
        }
    }
    static checkMisplacedLetters(actualWord, pickedWord, turn, userInterface) {
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
    static countOccurrences(word, letter) {
        const regex = new RegExp(letter, "g");
        return (word.match(regex) || []).length;
    }
}
_LetterChecker_pickedWord = new WeakMap(), _LetterChecker_actualWord = new WeakMap(), _LetterChecker_turn = new WeakMap(), _LetterChecker_userInterface = new WeakMap();
