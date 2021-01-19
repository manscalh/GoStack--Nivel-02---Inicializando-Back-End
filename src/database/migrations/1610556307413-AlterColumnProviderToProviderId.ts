import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export default class AlterColumnProviderToProviderId1610556307413 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn('appointments', 'provider',
      new TableColumn({
        name: 'provider_id',
        type: 'int',
        isNullable:true,
      }))

    await queryRunner.createForeignKey('appointments',
      new TableForeignKey({
          name: 'provider_id',
          columnNames: ['provider_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete:'SET NULL',
          onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments','provider_id');
    await queryRunner.changeColumn('appointments', 'provider_id',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
        length: "250"
      }))
  }

}
