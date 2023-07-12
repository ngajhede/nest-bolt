import { OnApplicationBootstrap } from '@nestjs/common';
import { ExplorerService } from './services/explorer.service';
import { SlackService } from './services/slack.service';
export declare class SlackModule implements OnApplicationBootstrap {
    private readonly slackService;
    private readonly explorerService;
    constructor(slackService: SlackService, explorerService: ExplorerService);
    onApplicationBootstrap(): void;
}
