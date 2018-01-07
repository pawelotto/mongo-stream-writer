/// <reference types="node" />
import { Writable } from 'stream';
export interface mongoStreamWriterOptions {
    dbString: string;
    collection: string;
    batchSize: number;
    verbose?: boolean;
}
export declare const mwriter: (opts: mongoStreamWriterOptions) => Writable;
