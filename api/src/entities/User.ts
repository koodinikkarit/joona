import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from "typeorm";

@Entity({
	name: "users"
})
export class User {
	@PrimaryGeneratedColumn()
	@PrimaryColumn("int")
	id: number;
	@Column("varchar", {
		name: "username"
	})
	userName: string;
	@Column("varchar", {
		name: "password_hash"
	})
	passwordHash: string;
	@Column("tinyint", {
		name: "is_admin"
	})
	isAdmin: Boolean;
}
