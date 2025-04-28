import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import "reflect-metadata";
import { Field, ObjectType } from "type-graphql";
import { Country } from "../countries/country.entity";

@ObjectType()
@Entity()
export class Continent extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Country])
  @OneToMany(() => Country, (country) => country.continent)
  country: Country[];
}
