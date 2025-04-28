import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Country } from "./Country";  
import { ObjectType, Field } from "type-graphql";
import { BaseEntity } from "typeorm";  // Ajout de BaseEntity

@ObjectType()  // Expose cette entité à GraphQL
@Entity()
export class Continent extends BaseEntity {  
  @PrimaryGeneratedColumn()
  @Field()  
  id: number;

  @Column()
  @Field()  
  code: string;

  @Column()
  @Field()  
  name: string;

  @OneToMany(() => Country, (country) => country.continent)  // Relation avec les pays
  @Field(() => [Country])  // Expose la liste des pays associés à ce continent dans GraphQL
  countries: Country[];
}