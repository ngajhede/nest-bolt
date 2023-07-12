/**
 * Decorator may listen and react to various slack events (Message, Command).
 */
export declare const MetadataBase: <T extends string | RegExp = string | RegExp>(metadataKey: string) => (pattern: T) => (target: object, propertyKey: string | symbol) => void;
