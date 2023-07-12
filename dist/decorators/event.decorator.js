"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const base_decorator_1 = require("./base.decorator");
const constants_1 = require("./constants");
/**
 * Decorator may listen and react to slack events.
 */
exports.Event = (0, base_decorator_1.MetadataBase)(constants_1.SLACK_EVENT_METADATA);
