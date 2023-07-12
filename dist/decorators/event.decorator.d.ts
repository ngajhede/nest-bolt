/**
 * Decorator may listen and react to slack events.
 */
export declare const Event: (pattern: string) => (target: object, propertyKey: string | symbol) => void;
