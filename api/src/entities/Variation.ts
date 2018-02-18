import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({
	name: "variations"
})
export class Variation {
	@PrimaryGeneratedColumn()
	@PrimaryColumn("int")
	id: number;
}
