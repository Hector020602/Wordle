export class CodeTransformer {
    static transform(code: string): string {
        if (code === "Semicolon") {
            return "Ñ";
        } else {
            return code.split("y")[1];
        }
    }
}