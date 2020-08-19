import {MigrationInterface, QueryRunner} from "typeorm";

export class production1597861366138 implements MigrationInterface {
    name = 'production1597861366138'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_05a1c77ff8451d95dc6b42477de"`, undefined);
        await queryRunner.query(`ALTER TABLE "order_detail" RENAME COLUMN "produtoIdId" TO "productId"`, undefined);
        await queryRunner.query(`ALTER TABLE "admin_bio" ADD "permision" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "demand" ADD "shipExpectedDate" TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "demand" ADD "shipExpectedDateLimit" TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "order_detail" ALTER COLUMN "productId" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_a3647bd11aed3cf968c9ce9b835" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_a3647bd11aed3cf968c9ce9b835"`, undefined);
        await queryRunner.query(`ALTER TABLE "order_detail" ALTER COLUMN "productId" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "demand" DROP COLUMN "shipExpectedDateLimit"`, undefined);
        await queryRunner.query(`ALTER TABLE "demand" DROP COLUMN "shipExpectedDate"`, undefined);
        await queryRunner.query(`ALTER TABLE "admin_bio" DROP COLUMN "permision"`, undefined);
        await queryRunner.query(`ALTER TABLE "order_detail" RENAME COLUMN "productId" TO "produtoIdId"`, undefined);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_05a1c77ff8451d95dc6b42477de" FOREIGN KEY ("produtoIdId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
