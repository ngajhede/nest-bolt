import { Type } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Module } from '@nestjs/core/injector/module';
import { ModulesContainer } from '@nestjs/core/injector/modules-container';
import { IEventHandler } from '../interfaces/events/event-handler.interface';
import { IEvent } from '../interfaces/events/event.interface';
export declare class ExplorerService {
    private readonly modulesContainer;
    private readonly reflector;
    constructor(modulesContainer: ModulesContainer, reflector: Reflector);
    explore(): {
        messages: Type<IEventHandler<IEvent>>[];
        actions: Type<IEventHandler<IEvent>>[];
        commands: Type<IEventHandler<IEvent>>[];
        events: Type<IEventHandler<IEvent>>[];
        shortcuts: Type<IEventHandler<IEvent>>[];
    };
    flatMap<T>(modules: Module[], callback: (instance: InstanceWrapper) => Type<any> | undefined): Type<T>[];
    filterProvider(wrapper: InstanceWrapper, metadataKey: string): Type<any> | undefined;
    extractMetadata(instance: Record<string, any>, metadataKey: string): Type<any>;
}
