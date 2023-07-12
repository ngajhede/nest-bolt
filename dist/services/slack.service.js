"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SlackService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlackService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const bolt_1 = require("@slack/bolt");
const constants_1 = require("../decorators/constants");
const invalid_event_exception_1 = require("../exceptions/invalid-event.exception");
const MESSAGE = 'Message';
const COMMAND = 'Command';
const SHORTCUT = 'Shortcut';
const ACTION = 'Action';
const EVENT = 'Event';
let SlackService = SlackService_1 = class SlackService {
    constructor(moduleRef, _app) {
        this.moduleRef = moduleRef;
        this._app = _app;
        this._logger = new common_1.Logger(SlackService_1.name);
    }
    onModuleInit() {
        this._app.start();
    }
    /**
     * Returns the Slack App instance
     */
    get app() {
        return this._app;
    }
    /**
     * Returns the Slack Web API client
     */
    get client() {
        return this._app.client;
    }
    registerMessages(messages) {
        this.register(messages, constants_1.SLACK_MESSAGE_METADATA, MESSAGE, (pattern, callback) => this._app.message(pattern, callback));
    }
    registerCommands(commands) {
        this.register(commands, constants_1.SLACK_COMMAND_METADATA, COMMAND, (pattern, callback) => this._app.command(pattern, callback));
    }
    registerShortcuts(shortcuts) {
        this.register(shortcuts, constants_1.SLACK_SHORTCUT_METADATA, SHORTCUT, (pattern, callback) => this._app.shortcut(pattern, callback));
    }
    registerEvents(events) {
        this.register(events, constants_1.SLACK_EVENT_METADATA, EVENT, (pattern, callback) => this._app.event(pattern, callback));
    }
    registerActions(actions) {
        this.register(actions, constants_1.SLACK_ACTION_METADATA, ACTION, (pattern, callback) => this._app.action(pattern, callback));
    }
    register(types, metadataKey, eventType, callback) {
        const eventHandlers = types
            .map((target) => {
            const metadata = Reflect.getMetadata(metadataKey, target) || [];
            const instance = this.moduleRef.get(target, { strict: false });
            if (!instance) {
                throw new invalid_event_exception_1.InvalidEventException();
            }
            return metadata.map((data) => ({
                pattern: data.pattern,
                fn: instance[data.propertyKey].bind(instance),
            }));
        })
            .reduce((a, b) => [...a, ...b], []);
        eventHandlers.forEach((event) => {
            callback(event.pattern, event.fn);
            this._logger.log(`Mapped {'${event.pattern}', ${eventType}} event`);
        });
    }
};
SlackService = SlackService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('CONNECTION')),
    __metadata("design:paramtypes", [core_1.ModuleRef,
        bolt_1.App])
], SlackService);
exports.SlackService = SlackService;
