import {MigrationInterface, QueryRunner} from "typeorm";

export class productionProduct1594298269864 implements MigrationInterface {
    name = 'productionProduct1594298269864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "subCategory" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "product" ADD "brand" character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "brand"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "subCategory"`, undefined);
    }

}
