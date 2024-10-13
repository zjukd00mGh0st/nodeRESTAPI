import { MigrationInterface, QueryRunner } from "typeorm";

export class Second1728840404407 implements MigrationInterface {
    name = 'Second1728840404407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservas\` DROP COLUMN \`fecha_creacion\``);
        await queryRunner.query(`ALTER TABLE \`reservas\` DROP COLUMN \`fecha_reserva\``);
        await queryRunner.query(`ALTER TABLE \`reservas\` ADD \`fecha_reserva\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservas\` DROP COLUMN \`fecha_reserva\``);
        await queryRunner.query(`ALTER TABLE \`reservas\` ADD \`fecha_reserva\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reservas\` ADD \`fecha_creacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
