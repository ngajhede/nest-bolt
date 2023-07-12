/**
 * Decorator may listen and react to slack Message events.
 */
export declare const Message: (pattern: string | RegExp) => (target: object, propertyKey: string | symbol) => void;
