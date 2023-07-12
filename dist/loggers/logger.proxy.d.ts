import { Logger } from '@nestjs/common';
import { LogLevel } from '@slack/bolt';
export declare class LoggerProxy extends Logger {
    constructor(name: string);
    info(...msg: any[]): void;
    setLevel(level: LogLevel): void;
    getLevel(): LogLevel;
    setName(name: string): void;
}
