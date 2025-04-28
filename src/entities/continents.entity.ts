import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PaysEntity } from "./pays.entity";

@ObjectType()
@Entity()
export class ContinentEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @OneToMany(() => PaysEntity, (pays) => pays.continent_entity)
  pays_entity: PaysEntity;
}
