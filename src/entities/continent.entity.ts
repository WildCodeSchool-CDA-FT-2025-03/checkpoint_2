import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { IsString, Length, Matches } from "class-validator";

import { Country } from "./country.entity";

@ObjectType()
@Entity("continent")
export class Continent extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field(() => String)
  @Column("varchar", { length: 50 })
  @IsString({ message: "Le nom doit être une chaîne de caractères" })
  @Length(2, 50, { message: "Le nom doit contenir entre 2 et 50 caractères" })
  name: string;

  @Field(() => String)
  @Column("varchar", { length: 2 })
  @IsString({ message: "Le code doit être une chaîne de caractères" })
  @Length(2, 2, { message: "Le code doit contenir exactement 2 caractères" })
  @Matches(/^[A-Z]{2}$/, {
    message: "Le code continent doit être en majuscules (ex: EU, AF, AS)",
  })
  code: string;

  @OneToMany(() => Country, (country) => country.continent, { cascade: true })
  @Field(() => [Country])
  countries: Country[];
}
