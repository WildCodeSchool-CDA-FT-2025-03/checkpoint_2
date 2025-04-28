import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Length } from "class-validator";
import { Continent } from "./Continent";

@ObjectType()
@Entity()
export class Country extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @Length(2, 100)
  name: string;

  @Field()
  @Column({ length: 2 })
  @Length(2, 2)
  code: string;

  @Field()
  @Column()
  @Length(1, 2)
  flag: string;

  @ManyToOne(() => Continent, (continent) => continent.countries)
  @JoinColumn({ name: "continentId" }) // La colonne qui lie les pays au continent
  @Field(() => Continent) // Exposer le continent associé dans GraphQL
  continent: Continent;
}