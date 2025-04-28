import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";
import { Field, InputType, ObjectType } from "type-graphql";
import { IsPhoneNumber, IsString, Length } from "class-validator";

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
}
