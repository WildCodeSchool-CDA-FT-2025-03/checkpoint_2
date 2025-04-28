import { InputType, Field } from "type-graphql";
import { IsNotEmpty, Length } from "class-validator";

@InputType()
export class CountryInput {
  @Field()
  @IsNotEmpty({ message: "Le nom est obligatoire" })
  name: string;

  @Field()
  @IsNotEmpty({ message: "Le code est obligatoire" })
  @Length(2, 2, { message: "Le code doit faire exactement 2 caractères" })
  code: string;

  @Field()
  @IsNotEmpty({ message: "Le drapeau est obligatoire" })
  flag: string;
}
