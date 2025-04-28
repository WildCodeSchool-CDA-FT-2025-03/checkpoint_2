import { IsNotEmpty, Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@ObjectType()
@Entity()
export class PaysEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Field()
  @Column()
  name: string;

  @Length(2, 2)
  @Field()
  @Column({ unique: true })
  code: string;

  @Field()
  @Column()
  flag: string;
}
