export declare namespace TerminalColor {
    const enum normal {
        BLACK = "\u001B[30m",
        RED = "\u001B[31m",
        GREEN = "\u001B[32m",
        YELLOW = "\u001B[33m",
        BLUE = "\u001B[34m",
        MAGENTA = "\u001B[35m",
        CYAN = "\u001B[36m",
        WHITE = "\u001B[37m"
    }
    const enum bright {
        BRIGHT_BLACK = "\u001B[30;1m",
        BRIGHT_RED = "\u001B[31;1m",
        BRIGHT_GREEN = "\u001B[32;1m",
        BRIGHT_YELLOW = "\u001B[33;1m",
        BRIGHT_BLUE = "\u001B[34;1m",
        BRIGHT_MAGENTA = "\u001B[35;1m",
        BRIGHT_CYAN = "\u001B[36;1m",
        BRIGHT_WHITE = "\u001B[37;1m"
    }
    const enum format {
        BOLD = "\u001B[1m",
        UNDERLINE = "\u001B[4m",
        REVERSED = "\u001B[7m"
    }
    const reset = "\u001B[0m";
}
export declare function color(s: any, color: TerminalColor.bright | TerminalColor.format | TerminalColor.normal): string;
