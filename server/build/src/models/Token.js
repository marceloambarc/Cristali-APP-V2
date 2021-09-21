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
const typeorm_1 = require("typeorm");
let Token = class Token {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Token.prototype, "id", void 0);
__decorate([
    typeorm_1.Index("ix_token1", { synchronize: false }),
    typeorm_1.Column("nvarchar", { length: 255 }),
    __metadata("design:type", String)
], Token.prototype, "token_celular", void 0);
__decorate([
    typeorm_1.Column("datetime"),
    typeorm_1.Index("ix_token2", { synchronize: false }),
    __metadata("design:type", Date)
], Token.prototype, "dt_criado", void 0);
__decorate([
    typeorm_1.Column("datetime"),
    typeorm_1.Index("ix_token3", { synchronize: false }),
    __metadata("design:type", Date)
], Token.prototype, "dt_modificado", void 0);
Token = __decorate([
    typeorm_1.Entity()
], Token);
exports.default = Token;
