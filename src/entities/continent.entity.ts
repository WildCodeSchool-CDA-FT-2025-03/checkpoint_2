import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Length, IsNotEmpty } from "class-validator";
import { Country } from "./country.entity";

@ObjectType()
@Entity()
export class Continent extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: "varchar", unique: true })
  @IsNotEmpty({ message: "Le nom ne peut pas être vide" })
  @Length(2, 100, { message: "Le nom doit contenir entre 2 et 100 caractères" })
  name: string;

  @Field(() => String)
  @Column({ type: "varchar", unique: true })
  @IsNotEmpty({ message: "Le code ne peut pas être vide" })
  @Length(2, 3, { message: "Le code doit contenir 2 ou 3 caractères" })
  code: string;

  @Field(() => [Country])
  @OneToMany(() => Country, country => country.continent)
  countries: Country[];

  @Field(() => Date)
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Field(() => Date)
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
