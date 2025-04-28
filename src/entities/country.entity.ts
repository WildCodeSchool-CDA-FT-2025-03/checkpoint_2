import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Length, IsNotEmpty, Matches } from "class-validator";

@ObjectType()
@Entity()
export class Country extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: "varchar" })
  @IsNotEmpty({ message: "Le nom ne peut pas être vide" })
  @Length(2, 100, { message: "Le nom doit contenir entre 2 et 100 caractères" })
  name: string;

  @Field(() => String)
  @Column({ type: "varchar" })
  @IsNotEmpty({ message: "Le code ne peut pas être vide" })
  @Length(2, 3, { message: "Le code doit contenir 2 ou 3 caractères" })
  @Matches(/^[A-Z]{2,3}$/, { message: "Le code doit être composé de 2 ou 3 lettres majuscules" })
  code: string;

  @Field(() => String)
  @Column({ type: "varchar" })
  @IsNotEmpty({ message: "Le drapeau ne peut pas être vide" })
  flag: string;

  @Field(() => Date)
  @Column({ type: "timestamp" })
  createdAt: Date;

  @Field(() => Date)
  @Column({ type: "timestamp" })
  updatedAt: Date;
}