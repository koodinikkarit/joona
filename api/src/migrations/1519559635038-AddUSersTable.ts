import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUSersTable1519559635038 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<any> {
		queryRunner.query(`
		create table if not exists users (
			id int8	unsigned AUTO_INCREMENT PRIMARY KEY,
			username varchar(50) not null,
			password_hash varchar(255) not null,
			is_admin boolean not null
		)`);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {}
}
