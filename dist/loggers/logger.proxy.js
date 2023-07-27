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
exports.LoggerProxy = void 0;
const common_1 = require("@nestjs/common");
let LoggerProxy = class LoggerProxy extends common_1.Logger {
    constructor(name) {
        super(name);
    }
    info(...msg) {
        this.log(msg);
    }
    setLevel(levels) {
        super.localInstance.setLogLevels(levels);
    }
    getLevel() {
        return super.localInstance.getLogLevels();
    }
    setName(name) {
        super.context = name;
    }
};
LoggerProxy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String])
], LoggerProxy);
exports.LoggerProxy = LoggerProxy;
