import {MigrationInterface, QueryRunner} from "typeorm";

export class postgres1591727704056 implements MigrationInterface {
    name = 'postgres1591727704056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin_bio" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_ad163a1cf72022448ff153431ea" UNIQUE ("email"), CONSTRAINT "PK_f8713fed3a795ee3648a61d9e0c" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "admin_bio"`, undefined);
    }

}
