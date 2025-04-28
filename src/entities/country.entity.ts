import { IsNotEmpty } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Continent } from "./continent.entity";

@ObjectType()
@Entity()
export class Country extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @IsNotEmpty()
  name: string;

  @Field()
  @Column()
  @IsNotEmpty()
  code: string;

  @Field()
  @Column()
  @IsNotEmpty()
  flag: string;

  @ManyToOne(() => Continent, (continent) => continent.countries)
  continent: Continent;
}

@InputType()
export class CountryInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  code: string;

  @Field()
  @IsNotEmpty()
  flag: string;
}
