import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Country extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: "varchar" })
  name: string;

  @Field(() => String)
  @Column({ type: "varchar" })
  code: string;

  @Field(() => String)
  @Column({ type: "varchar" })
  flag: string;

  @Field(() => Date)
  @Column({ type: "timestamp" })
  createdAt: Date;

  @Field(() => Date)
  @Column({ type: "timestamp" })
  updatedAt: Date;
}