import { IsNotEmpty } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
