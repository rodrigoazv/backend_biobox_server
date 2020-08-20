import {MigrationInterface, QueryRunner} from "typeorm";

export class ManyTec1597931107425 implements MigrationInterface {
    name = 'ManyTec1597931107425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_element_product_tec_elements" ("productId" uuid NOT NULL, "productTecElementsId" integer NOT NULL, CONSTRAINT "PK_bf30d6751d44d832a7d0bef8c80" PRIMARY KEY ("productId", "productTecElementsId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_24113eb6fdd977810c7b6b6366" ON "product_element_product_tec_elements" ("productId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_3b2106bb9f74048d615fcf1209" ON "product_element_product_tec_elements" ("productTecElementsId") `, undefined);
        await queryRunner.query(`ALTER TABLE "product_element_product_tec_elements" ADD CONSTRAINT "FK_24113eb6fdd977810c7b6b63668" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "product_element_product_tec_elements" ADD CONSTRAINT "FK_3b2106bb9f74048d615fcf12098" FOREIGN KEY ("productTecElementsId") REFERENCES "product_tec_elements"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_element_product_tec_elements" DROP CONSTRAINT "FK_3b2106bb9f74048d615fcf12098"`, undefined);
        await queryRunner.query(`ALTER TABLE "product_element_product_tec_elements" DROP CONSTRAINT "FK_24113eb6fdd977810c7b6b63668"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_3b2106bb9f74048d615fcf1209"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_24113eb6fdd977810c7b6b6366"`, undefined);
        await queryRunner.query(`DROP TABLE "product_element_product_tec_elements"`, undefined);
    }

}
