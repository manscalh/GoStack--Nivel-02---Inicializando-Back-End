import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreteAppointments1610495581591 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'provider',
            type: 'varchar',
            length: "250",
            isNullable: false
          },
          {
            name: 'date',
            type: 'datetime',
            isNullable: false
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
    await queryRunner.dropTable('appointments');
  }
}
