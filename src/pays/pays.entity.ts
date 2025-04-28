import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

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
