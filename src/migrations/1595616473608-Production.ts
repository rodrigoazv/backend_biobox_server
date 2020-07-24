import {MigrationInterface, QueryRunner} from "typeorm";

export class Production1595616473608 implements MigrationInterface {
    name = 'Production1595616473608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "demand" DROP COLUMN "totalPrice"`, undefined);
        await queryRunner.query(`ALTER TABLE "demand" ADD "totalPrice" double precision NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "demand" DROP COLUMN "totalPrice"`, undefined);
        await queryRunner.query(`ALTER TABLE "demand" ADD "totalPrice" integer NOT NULL`, undefined);
    }

}
