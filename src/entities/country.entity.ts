import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { IsString, Length, Matches } from "class-validator";

@ObjectType()
@Entity("country")
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  @Column("varchar", { length: 50 })
  @IsString({ message: "Le nom doit être une chaîne de caractères" })
  @Length(2, 50, { message: "Le nom doit contenir entre 2 et 50 caractères" })
  name!: string;

  @Field(() => String)
  @Column("varchar", { length: 2 })
  @IsString({ message: "Le code doit être une chaîne de caractères" })
  @Length(2, 2, { message: "Le code doit contenir exactement 2 caractères" })
  @Matches(/^[A-Z]{2}$/, {
    message: "Le code pays doit être en majuscules (ex: FR, BE, AN)",
  })
  code!: string;

  @Field(() => String)
  @Column("varchar", { length: 10 })
  @IsString({ message: "Le drapeau doit être une chaîne de caractères" })
  @Length(1, 10, {
    message: "Le drapeau doit contenir entre 1 et 10 caractères",
  })
  @Matches(/^[\u{1F1E6}-\u{1F1FF}]{2}$/u, {
    message: "Le drapeau doit être un emoji de pays valide (ex: 🇫🇷, 🇧🇪, 🇦🇩)",
  })
  flag!: string;
}
