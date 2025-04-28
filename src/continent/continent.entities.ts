import { Field, ObjectType, InputType } from 'type-graphql';
import { PrimaryGeneratedColumn, BaseEntity, Entity, Column, OneToMany } from 'typeorm';
import { Country } from '../country/country.entities';

@ObjectType()
@Entity('continent')
export class Continent extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Country])
  @OneToMany(() => Country, (country) => country.continent)
  countries: Country[];
}

@InputType()
export class ContinentInput {
  @Field()
  name: string;
}