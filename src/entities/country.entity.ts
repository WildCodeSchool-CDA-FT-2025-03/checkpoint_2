import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { IsString, Length } from "class-validator";

@ObjectType()
@Entity("country")
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  @Column("varchar", { length: 50 })
  @IsString()
  @Length(2, 50)
  name!: string;

  @Field(() => String)
  @Column("varchar", { length: 2 })
  @IsString()
  @Length(2, 2)
  code!: string;

  @Field(() => String)
  @Column("varchar", { length: 10 })
  @IsString()
  @Length(1, 10)
  flag!: string;
}
