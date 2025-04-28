import { IsNotEmpty, Length } from "class-validator";
import { Field, ObjectType, ID, InputType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@ObjectType()
@Entity()
export class Country extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @IsNotEmpty({ message: "The name cannot be empty" })
  name: string;
  
  @Field()
  @Column()
  @IsNotEmpty({ message: "The code cannot be empty" })
  code: string;

  @Field()
  @Column()
  @IsNotEmpty({ message: "The flag cannot be empty" })
  flag: string;
}

@InputType()
export class CountryInput{
  @Field()
  name: string;

  @Field()
  code: string;

  @Field()
  flag: string;
}