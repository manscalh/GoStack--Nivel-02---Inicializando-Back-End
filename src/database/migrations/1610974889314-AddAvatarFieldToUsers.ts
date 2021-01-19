import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddAvatarFieldToUsers1610974889314 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.addColumn('users', new TableColumn({
          name:'avatar',
          type: 'varchar',
          length:'500',
          isNullable:true
       }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('users','avatar');
   }


}
