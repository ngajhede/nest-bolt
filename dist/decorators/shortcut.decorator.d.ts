/**
 * Decorator may listen and react to slack Shortcut events.
 */
export declare const Shortcut: (pattern: string | RegExp) => (target: object, propertyKey: string | symbol) => void;
