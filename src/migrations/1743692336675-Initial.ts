import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1743692336675 implements MigrationInterface {
    name = 'Initial1743692336675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "parceiros" ("id" SERIAL NOT NULL, "nome" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "userID" bigint, CONSTRAINT "PK_c641dd3567834fa7ae0d67e4835" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "oportunidades" ("id" SERIAL NOT NULL, "nome" character varying(255) NOT NULL, "telefone" character varying(255) NOT NULL, "endereco" character varying(255) NOT NULL, "tipoDeContato" character varying(255) NOT NULL, "fonte" character varying(255) NOT NULL, "tipoDeAcao" character varying(255) NOT NULL, "cpf" character varying(30) NOT NULL, "comentario" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "file_path" text, CONSTRAINT "PK_9cc49a8d41b2a5acf30d752b2bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."usuarios_role_enum" AS ENUM('Gerente', 'Administrador', 'Operador', 'Parceiro')`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" "public"."usuarios_role_enum" NOT NULL DEFAULT 'Parceiro', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "oportunidades_parceiros_parceiros" ("oportunidadesId" integer NOT NULL, "parceirosId" integer NOT NULL, CONSTRAINT "PK_bf7e229c703374e4acb941f8adf" PRIMARY KEY ("oportunidadesId", "parceirosId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2b125631722a49e2ba23712396" ON "oportunidades_parceiros_parceiros" ("oportunidadesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b7913325585bc47b3b8305de76" ON "oportunidades_parceiros_parceiros" ("parceirosId") `);
        await queryRunner.query(`ALTER TABLE "oportunidades_parceiros_parceiros" ADD CONSTRAINT "FK_2b125631722a49e2ba23712396b" FOREIGN KEY ("oportunidadesId") REFERENCES "oportunidades"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "oportunidades_parceiros_parceiros" ADD CONSTRAINT "FK_b7913325585bc47b3b8305de762" FOREIGN KEY ("parceirosId") REFERENCES "parceiros"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "oportunidades_parceiros_parceiros" DROP CONSTRAINT "FK_b7913325585bc47b3b8305de762"`);
        await queryRunner.query(`ALTER TABLE "oportunidades_parceiros_parceiros" DROP CONSTRAINT "FK_2b125631722a49e2ba23712396b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b7913325585bc47b3b8305de76"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2b125631722a49e2ba23712396"`);
        await queryRunner.query(`DROP TABLE "oportunidades_parceiros_parceiros"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TYPE "public"."usuarios_role_enum"`);
        await queryRunner.query(`DROP TABLE "oportunidades"`);
        await queryRunner.query(`DROP TABLE "parceiros"`);
    }

}
