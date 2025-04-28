import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Length } from "class-validator";

@ObjectType()
@Entity("pays")
export class Pays extends BaseEntity {
  @Field(() => ID)
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
export class PaysInput {
  @Field()
  @Length(30)
  name: string;

  @Field()
  @Length(2)
  code: string;

  @Field()
  @Length(30)
  flag: string;
}
