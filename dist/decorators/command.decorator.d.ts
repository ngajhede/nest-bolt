/**
 * Decorator may listen and react to slack Command events.
 */
export declare const Command: (pattern: string | RegExp) => (target: object, propertyKey: string | symbol) => void;
