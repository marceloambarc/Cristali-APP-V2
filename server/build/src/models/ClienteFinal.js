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
let Clientefinal = class Clientefinal {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: "PK_clientefinal" }),
    __metadata("design:type", Number)
], Clientefinal.prototype, "cd_pessoa", void 0);
__decorate([
    typeorm_1.Index("ix_clientefinal1", { synchronize: false }),
    typeorm_1.Column("nvarchar", { length: 100 }),
    __metadata("design:type", String)
], Clientefinal.prototype, "nm_nome", void 0);
__decorate([
    typeorm_1.Column("nvarchar", { length: 14 }),
    typeorm_1.Index("ix_clientefinal2", { synchronize: false }),
    __metadata("design:type", String)
], Clientefinal.prototype, "tx_cgc", void 0);
__decorate([
    typeorm_1.Column("nvarchar", { length: 14 }),
    typeorm_1.Index("ix_clientefinal3", { synchronize: false }),
    __metadata("design:type", String)
], Clientefinal.prototype, "tx_fone", void 0);
__decorate([
    typeorm_1.Column("nvarchar", { length: 100 }),
    __metadata("design:type", String)
], Clientefinal.prototype, "tx_email", void 0);
__decorate([
    typeorm_1.Column("nvarchar", { length: 200 }),
    typeorm_1.Index("ix_clientefinal4", { synchronize: false }),
    __metadata("design:type", String)
], Clientefinal.prototype, "tx_obs", void 0);
__decorate([
    typeorm_1.Index("ix_clientefinal5", { synchronize: false }),
    typeorm_1.Column("nvarchar", { length: 6 }),
    __metadata("design:type", String)
], Clientefinal.prototype, "cd_id_ccli", void 0);
Clientefinal = __decorate([
    typeorm_1.Entity()
], Clientefinal);
exports.default = Clientefinal;
