import { Field, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class PaysEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: number;

  @Field()
  @Column()
  name?: string;

  @Field()
  @Column()
  code?: string;

  @Field()
  @Column()
  flag?: string;
}
