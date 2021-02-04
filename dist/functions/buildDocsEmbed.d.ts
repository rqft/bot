import { MessageEmbed } from "discord.js";
import { AlgoliaResult } from "../interfaces/IPylonDocs";
export declare function lookup(query: string, page?: number): Promise<AlgoliaResult>;
export declare function buildDocsEmbed(data: AlgoliaResult, maxResults?: number): MessageEmbed;
