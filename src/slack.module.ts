import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ExplorerService } from './services/explorer.service';
import { SlackService } from './services/slack.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { App, AppOptions } from '@slack/bolt';

const SLACK = 'Slack';

const slackServiceFactory = {
  provide: 'CONNECTION',
  useFactory: (configService: ConfigService) => {
    const options: AppOptions = {
      token: configService.get('SLACK_BOT_TOKEN'),
      signingSecret: configService.get('SLACK_SIGNING_SECRET'),
      socketMode: !!configService.get<boolean>('SLACK_SOCKET_MODE'),
      appToken: configService.get('SLACK_APP_TOKEN'),
    };
    return new App(options);
  },
  inject: [ConfigService],
};

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ExplorerService, SlackService, slackServiceFactory],
  exports: [SlackService],
})
export class SlackModule implements OnApplicationBootstrap {
  constructor(
    private readonly slackService: SlackService,
    private readonly explorerService: ExplorerService,
  ) {}

  onApplicationBootstrap() {
    const { messages, actions, commands, events, shortcuts } =
      this.explorerService.explore();

    this.slackService.registerMessages(messages);
    this.slackService.registerActions(actions);
    this.slackService.registerCommands(commands);
    this.slackService.registerEvents(events);
    this.slackService.registerShortcuts(shortcuts);
    // TODO register other events handler
  }
}
