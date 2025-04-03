import { MigrationInterface, QueryRunner } from "typeorm";

export class CascadeDelete1743647939602 implements MigrationInterface {
    name = 'CascadeDelete1743647939602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "oportunidades_parceiros_parceiros" DROP CONSTRAINT "FK_b7913325585bc47b3b8305de762"`);
        await queryRunner.query(`ALTER TABLE "oportunidades_parceiros_parceiros" ADD CONSTRAINT "FK_b7913325585bc47b3b8305de762" FOREIGN KEY ("parceirosId") REFERENCES "parceiros"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "oportunidades_parceiros_parceiros" DROP CONSTRAINT "FK_b7913325585bc47b3b8305de762"`);
        await queryRunner.query(`ALTER TABLE "oportunidades_parceiros_parceiros" ADD CONSTRAINT "FK_b7913325585bc47b3b8305de762" FOREIGN KEY ("parceirosId") REFERENCES "parceiros"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
