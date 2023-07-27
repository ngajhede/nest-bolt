import { Injectable, Logger, LogLevel } from '@nestjs/common';

@Injectable()
export class LoggerProxy extends Logger {
  constructor(name: string) {
    super(name);
  }

  info(...msg: any[]) {
    this.log(msg);
  }

  setLevel(levels: LogLevel[]) {
    super.localInstance.setLogLevels(levels);
  }

  getLevel(): LogLevel[] {
    return super.localInstance.getLogLevels();
  }

  setName(name: string) {
    super.context = name;
  }
}
