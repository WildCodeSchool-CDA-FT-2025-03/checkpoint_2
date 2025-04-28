import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity("country")
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
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
