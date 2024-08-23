import { OnModuleInit, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { App } from '@slack/bolt';
import { IMetadataBase } from '../interfaces/metadata/metadata.interface';
export declare class SlackService implements OnModuleInit {
    private readonly moduleRef;
    private readonly _app;
    constructor(moduleRef: ModuleRef, _app: App);
    onModuleInit(): void;
    /**
     * Returns the Slack App instance
     */
    get app(): App<import("@slack/bolt/dist/types/helpers").StringIndexed>;
    /**
     * Returns the Slack Web API client
     */
    get client(): import("@slack/web-api").WebClient;
    registerMessages(messages: Type<unknown>[]): void;
    registerCommands(commands: Type<unknown>[]): void;
    registerShortcuts(shortcuts: Type<unknown>[]): void;
    registerEvents(events: Type<unknown>[]): void;
    registerActions(actions: Type<unknown>[]): void;
    register<T extends IMetadataBase, K extends string | RegExp = string | RegExp>(types: Type<unknown>[], metadataKey: string, eventType: string, callback: (pattern: K, fn: () => Promise<void>) => void): void;
}
