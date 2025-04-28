import { Field, ObjectType, InputType } from 'type-graphql';
import { PrimaryGeneratedColumn, BaseEntity, Entity, Column, In } from 'typeorm';

@ObjectType()
@Entity('country')
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
  flag: boolean;
}

@InputType()
export class CountryInput {
  @Field()
  name: string;

  @Field()
  code: string;

  @Field()
  flag: boolean;
}