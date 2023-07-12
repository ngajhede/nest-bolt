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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExplorerService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const modules_container_1 = require("@nestjs/core/injector/modules-container");
const constants_1 = require("../decorators/constants");
let ExplorerService = class ExplorerService {
    constructor(modulesContainer, reflector) {
        this.modulesContainer = modulesContainer;
        this.reflector = reflector;
    }
    explore() {
        const modules = [...this.modulesContainer.values()];
        const messages = this.flatMap(modules, (instance) => this.filterProvider(instance, constants_1.SLACK_MESSAGE_METADATA));
        const actions = this.flatMap(modules, (instance) => this.filterProvider(instance, constants_1.SLACK_ACTION_METADATA));
        const commands = this.flatMap(modules, (instance) => this.filterProvider(instance, constants_1.SLACK_COMMAND_METADATA));
        const events = this.flatMap(modules, (instance) => this.filterProvider(instance, constants_1.SLACK_EVENT_METADATA));
        const shortcuts = this.flatMap(modules, (instance) => this.filterProvider(instance, constants_1.SLACK_SHORTCUT_METADATA));
        return { messages, actions, commands, events, shortcuts };
    }
    flatMap(modules, callback) {
        const items = modules
            .map((module) => [...module.controllers.values()].map(callback))
            .reduce((a, b) => a.concat(b), []);
        return items.filter((element) => !!element);
    }
    filterProvider(wrapper, metadataKey) {
        const { instance } = wrapper;
        if (!instance) {
            return undefined;
        }
        return this.extractMetadata(instance, metadataKey);
    }
    extractMetadata(instance, metadataKey) {
        if (!instance.constructor) {
            return;
        }
        const metadata = this.reflector.get(metadataKey, instance.constructor);
        return metadata ? instance.constructor : undefined;
    }
};
ExplorerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [modules_container_1.ModulesContainer,
        core_1.Reflector])
], ExplorerService);
exports.ExplorerService = ExplorerService;
