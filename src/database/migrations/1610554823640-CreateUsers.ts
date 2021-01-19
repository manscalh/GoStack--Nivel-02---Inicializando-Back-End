import { formatDistanceToNow } from "date-fns";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateUsers1610554823640 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: "250",
          },
          {
            name: 'email',
            type: 'varchar',
            length: "250",
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            length: "250",
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'getdate()',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'getdate()',
          }
        ]
      })
    );

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }

}
