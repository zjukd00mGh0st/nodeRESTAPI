import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1728811102315 implements MigrationInterface {
    name = 'Initial1728811102315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`reservas\` (\`id\` varchar(36) NOT NULL, \`nombre_usuario\` varchar(255) NOT NULL, \`cantidad_boletos\` int NOT NULL, \`fecha_reserva\` timestamp NOT NULL, \`fecha_creacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`eventoId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`eventos\` (\`id\` varchar(36) NOT NULL, \`nombre\` varchar(255) NOT NULL, \`fecha\` timestamp NOT NULL, \`ubicacion\` varchar(255) NOT NULL, \`fecha_creacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`reservas\` ADD CONSTRAINT \`FK_8246e1df4fd19ca60ee84f25f7e\` FOREIGN KEY (\`eventoId\`) REFERENCES \`eventos\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservas\` DROP FOREIGN KEY \`FK_8246e1df4fd19ca60ee84f25f7e\``);
        await queryRunner.query(`DROP TABLE \`eventos\``);
        await queryRunner.query(`DROP TABLE \`reservas\``);
    }

}
