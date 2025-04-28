import { Field, ObjectType, InputType } from 'type-graphql';
import { PrimaryGeneratedColumn, BaseEntity, Entity, Column } from 'typeorm';
import { MinLength, MaxLength, Length, Matches } from 'class-validator';

@ObjectType()
@Entity('country')
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column()
  @MinLength(5)
  @MaxLength(100)
  name: string;

  @Field()
  @Column()
  @Matches(/^[A-Z]{2}$/)
  code: string;

  @Field()
  @Column()
  @Length(2, 100)
  flag: string;
}

@InputType()
export class CountryInput {
  @Field()
  name: string;

  @Field()
  code: string;

  @Field()
  flag: string;
}