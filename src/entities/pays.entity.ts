import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class PaysEntity extends BaseEntity {
  constructor() {
    super();
    this.id = 0;
    this.name = "";
    this.code = "";
    this.flag = "";
  }

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  flag: string;
}
