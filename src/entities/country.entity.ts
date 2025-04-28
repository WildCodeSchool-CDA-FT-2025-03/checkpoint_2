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
  name: string;
  
  @Field()
  @Column()
  code: string;

  @Field()
  @Column()
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