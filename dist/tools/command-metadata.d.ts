export declare enum CommandType {
    IMAGE = "image",
    TOOLS = "tools",
    FUN = "fun"
}
export interface CommandMetadata {
    category: CommandType;
    description: string;
    examples?: Array<string>;
    id?: string;
    nsfw?: boolean;
    usage: string;
}
export declare function Metadata(type: CommandType, description: string, usage?: string, examples?: Array<string>): CommandMetadata;
export declare function ImageMetadata(description: string, usage?: string, examples?: Array<string>): CommandMetadata;
export declare function ToolsMetadata(description: string, usage?: string, examples?: Array<string>): CommandMetadata;
export declare function FunMetadata(description: string, usage?: string, examples?: Array<string>): CommandMetadata;
