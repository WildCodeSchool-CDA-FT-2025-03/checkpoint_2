import { Field, ObjectType } from 'type-graphql';
import { PrimaryGeneratedColumn, BaseEntity, Entity, Column } from 'typeorm';

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