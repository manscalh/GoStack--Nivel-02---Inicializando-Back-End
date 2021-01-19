"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class AlterColumnProviderToProviderId1610556307413 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.changeColumn('appointments', 'provider', new typeorm_1.TableColumn({
                name: 'provider_id',
                type: 'int',
                isNullable: true,
            }));
            yield queryRunner.createForeignKey('appointments', new typeorm_1.TableForeignKey({
                name: 'provider_id',
                columnNames: ['provider_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropForeignKey('appointments', 'provider_id');
            yield queryRunner.changeColumn('appointments', 'provider_id', new typeorm_1.TableColumn({
                name: 'provider',
                type: 'varchar',
                length: "250"
            }));
        });
    }
}
exports.default = AlterColumnProviderToProviderId1610556307413;
