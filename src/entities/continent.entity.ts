import { IsNotEmpty } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "./country.entity";

@ObjectType()
@Entity()
export class Continent extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @IsNotEmpty()
  continent_name: string;

  @Field()
  @Column()
  @IsNotEmpty()
  continent_code: string;

  @OneToMany(() => Country, (country) => country.continent)
  countries: Country[];
}

@InputType()
export class ContinentInput {
  @Field()
  @IsNotEmpty()
  continent_name: string;

  @Field()
  @IsNotEmpty()
  continent_code: string;
}
