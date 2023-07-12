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
exports.SlackModule = void 0;
const common_1 = require("@nestjs/common");
const explorer_service_1 = require("./services/explorer.service");
const slack_service_1 = require("./services/slack.service");
const config_1 = require("@nestjs/config");
const bolt_1 = require("@slack/bolt");
const logger_proxy_1 = require("./loggers/logger.proxy");
const SLACK = 'Slack';
const slackServiceFactory = {
    provide: 'CONNECTION',
    useFactory: (configService, loggerProxy) => {
        loggerProxy.setName(SLACK);
        const options = {
            logger: loggerProxy,
            token: configService.get('SLACK_BOT_TOKEN'),
            signingSecret: configService.get('SLACK_SIGNING_SECRET'),
            socketMode: !!configService.get('SLACK_SOCKET_MODE'),
            appToken: configService.get('SLACK_APP_TOKEN'),
        };
        return new bolt_1.App(options);
    },
    inject: [config_1.ConfigService, logger_proxy_1.LoggerProxy],
};
let SlackModule = class SlackModule {
    constructor(slackService, explorerService) {
        this.slackService = slackService;
        this.explorerService = explorerService;
    }
    onApplicationBootstrap() {
        const { messages, actions, commands, events, shortcuts } = this.explorerService.explore();
        this.slackService.registerMessages(messages);
        this.slackService.registerActions(actions);
        this.slackService.registerCommands(commands);
        this.slackService.registerEvents(events);
        this.slackService.registerShortcuts(shortcuts);
        // TODO register other events handler
    }
};
SlackModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot()],
        providers: [explorer_service_1.ExplorerService, logger_proxy_1.LoggerProxy, slack_service_1.SlackService, slackServiceFactory],
        exports: [slack_service_1.SlackService],
    }),
    __metadata("design:paramtypes", [slack_service_1.SlackService,
        explorer_service_1.ExplorerService])
], SlackModule);
exports.SlackModule = SlackModule;
