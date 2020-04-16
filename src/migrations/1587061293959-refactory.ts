import {MigrationInterface, QueryRunner} from "typeorm";

export class refactory1587061293959 implements MigrationInterface {
    name = 'refactory1587061293959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "adress" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "zipcode" character varying NOT NULL, "street" character varying NOT NULL, "number" character varying NOT NULL, "neighborhood" character varying NOT NULL, "complement" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f108093ea9cd9f59d72c2f1a057" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "demand" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_2e27cd7b3d79c50d197cb0b3924" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productName" character varying NOT NULL, "productDescription" character varying NOT NULL, "productTecDescription" character varying NOT NULL, "productPrice" integer NOT NULL, "productVol" character varying NOT NULL, "photoUrl" character varying NOT NULL, "category" character varying NOT NULL, "stock" integer NOT NULL, "quantityBuy" integer NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "completName" character varying NOT NULL, "email" character varying NOT NULL, "cpf" character varying, "dateNasc" TIMESTAMP, "number" character varying, "password" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "lastPresentLoggedDate" TIMESTAMP, "lastSuccessfulLoggedDate" TIMESTAMP, "lastFailedLoggedDate" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TABLE "product"`, undefined);
        await queryRunner.query(`DROP TABLE "demand"`, undefined);
        await queryRunner.query(`DROP TABLE "adress"`, undefined);
    }

}
