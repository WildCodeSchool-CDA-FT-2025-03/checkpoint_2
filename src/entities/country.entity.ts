import { IsNotEmpty } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Country extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column()
  @IsNotEmpty()
  name?: string;

  @Field()
  @Column()
  @IsNotEmpty()
  code?: string;

  @Field()
  @Column()
  flag?: string;
}
