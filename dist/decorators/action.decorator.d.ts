/**
 * Decorator may listen and react to slack Action events.
 */
export declare const Action: (pattern: string | RegExp) => (target: object, propertyKey: string | symbol) => void;
