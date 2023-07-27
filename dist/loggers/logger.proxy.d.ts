import { Logger, LogLevel } from '@nestjs/common';
export declare class LoggerProxy extends Logger {
    constructor(name: string);
    info(...msg: any[]): void;
    setLevel(levels: LogLevel[]): void;
    getLevel(): LogLevel[];
    setName(name: string): void;
}
