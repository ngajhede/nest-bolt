"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
const base_decorator_1 = require("./base.decorator");
const constants_1 = require("./constants");
/**
 * Decorator may listen and react to slack Action events.
 */
exports.Action = (0, base_decorator_1.MetadataBase)(constants_1.SLACK_ACTION_METADATA);
