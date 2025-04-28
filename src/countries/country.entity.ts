import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import "reflect-metadata";
import { Field, InputType, ObjectType } from "type-graphql";
import { IsString, Length } from "class-validator";
import { Continent } from "../continents/continents.entity";

@ObjectType()
@Entity()
export class Country extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  code: string;

  @Field()
  @Column()
  flag: string;

  @ManyToOne(() => Continent, (continent) => continent.country, {
    cascade: true,
  })
  continent: Continent;
}

@InputType()
export class CountryInput {
  @Field()
  @IsString()
  @Length(10)
  name: string;

  @Field()
  @IsString()
  code: string;

  @Field()
  @IsString()
  flag: string;

  @Field()
  @IsString()
  continent: string;
}
