"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataBase = void 0;
/**
 * Decorator may listen and react to various slack events (Message, Command).
 */
const MetadataBase = (metadataKey) => {
    return (pattern) => {
        return (target, propertyKey) => {
            const properties = Reflect.getMetadata(metadataKey, target.constructor) || [];
            Reflect.defineMetadata(metadataKey, [
                ...properties,
                {
                    target: target.constructor.name,
                    propertyKey,
                    pattern,
                },
            ], target.constructor);
        };
    };
};
exports.MetadataBase = MetadataBase;
