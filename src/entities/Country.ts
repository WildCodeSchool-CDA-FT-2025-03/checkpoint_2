import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Length } from "class-validator";

@ObjectType()
@Entity()
export class Country extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @Length(2, 100)
  name: string;

  @Field()
  @Column({ length: 2 })
  @Length(2, 2)
  code: string;

  @Field()
  @Column()
  @Length(1, 2)
  flag: string;
}