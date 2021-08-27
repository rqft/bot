import * as TypeScript from "typescript";
export function jsEval<T>(code: string): T {
  return eval(code);
}
export function compileTypescript(
  code: string,
  compileOptions?: TypeScript.CompilerOptions
): string {
  return TypeScript.transpile(code, compileOptions);
}
export function tsEval<T>(
  code: string,
  compilerOptions?: TypeScript.CompilerOptions
): T {
  return jsEval(compileTypescript(code, compilerOptions));
}
export function _eval<T>(
  language: "js" | "ts" = "ts",
  code: string,
  compilerOptions?: TypeScript.CompilerOptions
): T {
  return language === "js" ? jsEval<T>(code) : tsEval<T>(code, compilerOptions);
}
