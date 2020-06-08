import {MigrationInterface, QueryRunner} from "typeorm";

export class teste1591270393200 implements MigrationInterface {
    name = 'teste1591270393200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "completName" character varying NOT NULL, "Sexo" character varying NOT NULL, "email" character varying NOT NULL, "cpf" character varying NOT NULL, "dateNasc" TIMESTAMP NOT NULL, "number" character varying NOT NULL, "password" character varying NOT NULL, "passTokenRecovery" character varying, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "lastPresentLoggedDate" TIMESTAMP, "lastSuccessfulLoggedDate" TIMESTAMP, "lastFailedLoggedDate" TIMESTAMP, "adressId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_a6235b5ef0939d8deaad755fc87" UNIQUE ("cpf"), CONSTRAINT "UQ_81e762f957fa9a13524029a3b7f" UNIQUE ("number"), CONSTRAINT "REL_5731a570bc86d6ad75f85ddc77" UNIQUE ("adressId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "adress" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "zipcode" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "street" character varying NOT NULL, "number" character varying NOT NULL, "neighborhood" character varying NOT NULL, "complement" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f108093ea9cd9f59d72c2f1a057" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productName" character varying NOT NULL, "productDescription" character varying NOT NULL, "productTecDescription" character varying NOT NULL, "productPrice" integer NOT NULL, "productVol" character varying NOT NULL, "photoUrl" character varying NOT NULL, "photoName" character varying NOT NULL, "category" character varying NOT NULL, "stock" integer NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "order_detail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "price" integer NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "produtoIdId" uuid, CONSTRAINT "PK_0afbab1fa98e2fb0be8e74f6b38" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "demand" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "userId" uuid, CONSTRAINT "PK_2e27cd7b3d79c50d197cb0b3924" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "demand_orders_order_detail" ("demandId" uuid NOT NULL, "orderDetailId" uuid NOT NULL, CONSTRAINT "PK_59464647dca20d65e49e57610ab" PRIMARY KEY ("demandId", "orderDetailId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_2a1db6d4ead906bf65665bd50b" ON "demand_orders_order_detail" ("demandId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_cb331d38e89164ee365b136426" ON "demand_orders_order_detail" ("orderDetailId") `, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_5731a570bc86d6ad75f85ddc772" FOREIGN KEY ("adressId") REFERENCES "adress"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_05a1c77ff8451d95dc6b42477de" FOREIGN KEY ("produtoIdId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "demand" ADD CONSTRAINT "FK_152583518482d92b3b620a46dd5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "demand_orders_order_detail" ADD CONSTRAINT "FK_2a1db6d4ead906bf65665bd50bc" FOREIGN KEY ("demandId") REFERENCES "demand"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "demand_orders_order_detail" ADD CONSTRAINT "FK_cb331d38e89164ee365b1364264" FOREIGN KEY ("orderDetailId") REFERENCES "order_detail"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "demand_orders_order_detail" DROP CONSTRAINT "FK_cb331d38e89164ee365b1364264"`, undefined);
        await queryRunner.query(`ALTER TABLE "demand_orders_order_detail" DROP CONSTRAINT "FK_2a1db6d4ead906bf65665bd50bc"`, undefined);
        await queryRunner.query(`ALTER TABLE "demand" DROP CONSTRAINT "FK_152583518482d92b3b620a46dd5"`, undefined);
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_05a1c77ff8451d95dc6b42477de"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_5731a570bc86d6ad75f85ddc772"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_cb331d38e89164ee365b136426"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_2a1db6d4ead906bf65665bd50b"`, undefined);
        await queryRunner.query(`DROP TABLE "demand_orders_order_detail"`, undefined);
        await queryRunner.query(`DROP TABLE "demand"`, undefined);
        await queryRunner.query(`DROP TABLE "order_detail"`, undefined);
        await queryRunner.query(`DROP TABLE "product"`, undefined);
        await queryRunner.query(`DROP TABLE "adress"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }

}
