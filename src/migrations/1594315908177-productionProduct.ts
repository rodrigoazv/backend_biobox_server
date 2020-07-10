import {MigrationInterface, QueryRunner} from "typeorm";

export class productionProduct1594315908177 implements MigrationInterface {
    name = 'productionProduct1594315908177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin_bio" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_ad163a1cf72022448ff153431ea" UNIQUE ("email"), CONSTRAINT "PK_f8713fed3a795ee3648a61d9e0c" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user_bio" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "completName" character varying NOT NULL, "Sexo" character varying NOT NULL, "email" character varying NOT NULL, "cpf" character varying NOT NULL, "dateNasc" TIMESTAMP NOT NULL, "number" character varying NOT NULL, "password" character varying NOT NULL, "passTokenRecovery" character varying, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "lastPresentLoggedDate" TIMESTAMP, "lastSuccessfulLoggedDate" TIMESTAMP, "lastFailedLoggedDate" TIMESTAMP, "adressId" uuid, CONSTRAINT "UQ_97b02401e0b33662208eaceef11" UNIQUE ("email"), CONSTRAINT "UQ_c58cf157d09165ea9b60fc8f8fd" UNIQUE ("cpf"), CONSTRAINT "UQ_cbb161019fb3cdcbceac5e68929" UNIQUE ("number"), CONSTRAINT "REL_e0de893f88683381927cc206b4" UNIQUE ("adressId"), CONSTRAINT "PK_45b9aab90519ed3864cedf01fa8" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "adress" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "zipcode" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "street" character varying NOT NULL, "number" character varying NOT NULL, "neighborhood" character varying NOT NULL, "complement" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f108093ea9cd9f59d72c2f1a057" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "order_detail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "productName" character varying NOT NULL, "productDescription" character varying NOT NULL, "price" double precision NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "produtoIdId" uuid, CONSTRAINT "PK_0afbab1fa98e2fb0be8e74f6b38" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "product_tec_elements" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "iconUrl" character varying NOT NULL, "productId" uuid, CONSTRAINT "PK_9106b68afd5fa47862811aea064" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productName" character varying NOT NULL, "productDescription" character varying NOT NULL, "productTecDescription" character varying NOT NULL, "productPrice" double precision NOT NULL, "productVol" character varying NOT NULL, "photoUrl" character varying NOT NULL, "photoName" character varying NOT NULL, "brand" character varying NOT NULL, "stock" integer NOT NULL, "categoryId" integer, "subCategoryId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "sub_category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "categoryId" integer, CONSTRAINT "PK_59f4461923255f1ce7fc5e7423c" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "demand" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "totalPrice" integer NOT NULL, "shipValue" double precision NOT NULL, "vaucher" character varying NOT NULL, "shipStatus" character varying NOT NULL, "shipZipcode" character varying NOT NULL, "shipCity" character varying NOT NULL, "shipState" character varying NOT NULL, "shipStreet" character varying NOT NULL, "shipNumber" character varying NOT NULL, "shipNeighborhood" character varying NOT NULL, "shipComplement" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_2e27cd7b3d79c50d197cb0b3924" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "email_list" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "status" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_af02c738cd005f2e65dcf963163" UNIQUE ("email"), CONSTRAINT "PK_70780e70d69d6755543eb9ed74d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "demand_orders_order_detail" ("demandId" uuid NOT NULL, "orderDetailId" uuid NOT NULL, CONSTRAINT "PK_59464647dca20d65e49e57610ab" PRIMARY KEY ("demandId", "orderDetailId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_2a1db6d4ead906bf65665bd50b" ON "demand_orders_order_detail" ("demandId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_cb331d38e89164ee365b136426" ON "demand_orders_order_detail" ("orderDetailId") `, undefined);
        await queryRunner.query(`ALTER TABLE "user_bio" ADD CONSTRAINT "FK_e0de893f88683381927cc206b4d" FOREIGN KEY ("adressId") REFERENCES "adress"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_05a1c77ff8451d95dc6b42477de" FOREIGN KEY ("produtoIdId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "product_tec_elements" ADD CONSTRAINT "FK_04e6214891dafbcf40c9ea6ca0d" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_463d24f6d4905c488bd509164e6" FOREIGN KEY ("subCategoryId") REFERENCES "sub_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_51b8c0b349725210c4bd8b9b7a7" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "demand" ADD CONSTRAINT "FK_152583518482d92b3b620a46dd5" FOREIGN KEY ("userId") REFERENCES "user_bio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "demand_orders_order_detail" ADD CONSTRAINT "FK_2a1db6d4ead906bf65665bd50bc" FOREIGN KEY ("demandId") REFERENCES "demand"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "demand_orders_order_detail" ADD CONSTRAINT "FK_cb331d38e89164ee365b1364264" FOREIGN KEY ("orderDetailId") REFERENCES "order_detail"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "demand_orders_order_detail" DROP CONSTRAINT "FK_cb331d38e89164ee365b1364264"`, undefined);
        await queryRunner.query(`ALTER TABLE "demand_orders_order_detail" DROP CONSTRAINT "FK_2a1db6d4ead906bf65665bd50bc"`, undefined);
        await queryRunner.query(`ALTER TABLE "demand" DROP CONSTRAINT "FK_152583518482d92b3b620a46dd5"`, undefined);
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_51b8c0b349725210c4bd8b9b7a7"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_463d24f6d4905c488bd509164e6"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`, undefined);
        await queryRunner.query(`ALTER TABLE "product_tec_elements" DROP CONSTRAINT "FK_04e6214891dafbcf40c9ea6ca0d"`, undefined);
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_05a1c77ff8451d95dc6b42477de"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_bio" DROP CONSTRAINT "FK_e0de893f88683381927cc206b4d"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_cb331d38e89164ee365b136426"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_2a1db6d4ead906bf65665bd50b"`, undefined);
        await queryRunner.query(`DROP TABLE "demand_orders_order_detail"`, undefined);
        await queryRunner.query(`DROP TABLE "email_list"`, undefined);
        await queryRunner.query(`DROP TABLE "demand"`, undefined);
        await queryRunner.query(`DROP TABLE "category"`, undefined);
        await queryRunner.query(`DROP TABLE "sub_category"`, undefined);
        await queryRunner.query(`DROP TABLE "product"`, undefined);
        await queryRunner.query(`DROP TABLE "product_tec_elements"`, undefined);
        await queryRunner.query(`DROP TABLE "order_detail"`, undefined);
        await queryRunner.query(`DROP TABLE "adress"`, undefined);
        await queryRunner.query(`DROP TABLE "user_bio"`, undefined);
        await queryRunner.query(`DROP TABLE "admin_bio"`, undefined);
    }

}
