export class CodeTransformer {
    static transform(code) {
        if (code === "Semicolon") {
            return "Ñ";
        }
        else {
            return code.split("y")[1];
        }
    }
}
