import { Field } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PaysEntity } from "./pays.entity";

@Entity()
export class ContinentEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @OneToMany(() => PaysEntity, (pays) => pays.continent)
  pays: PaysEntity;
}
