import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Country } from "../entities/Country"; 
import { validateOrReject } from "class-validator";  

@Resolver()
export class CountryResolver {

  // Mutation pour créer un pays
  @Mutation(() => Boolean)
  async createCountry(
    @Arg("name") name: string,
    @Arg("code") code: string,
    @Arg("flag") flag: string
  ): Promise<boolean> {
    try {
      // Création de l'objet Country avec les données
      const country = new Country();
      country.name = name;
      country.code = code;
      country.flag = flag;

      // Validation des données avant sauvegarde
      await validateOrReject(country).catch(errors => {
        throw new Error(`Validation failed! ${errors}`);
      });

      // Sauvegarde du pays dans la base de données
      await country.save();

      return true;  // Retourner true si la création a réussi
    } catch (error) {
      console.error("Erreur lors de la création du pays:", error);
      throw new Error("Erreur lors de la création du pays.");
    }
  }

  // Query pour obtenir tous les pays
  @Query(() => [Country])
  async getAllCountries(): Promise<Country[]> {
    try {
      // Récupérer tous les pays depuis la base de données
      const countries = await Country.find();
      return countries;
    } catch (error) {
      console.error("Erreur lors de la récupération des pays:", error);
      throw new Error("Erreur lors de la récupération des pays.");
    }
  }

  // Query pour obtenir un pays par son code
  @Query(() => Country, { nullable: true })
  async getCountryByCode(@Arg("code") code: string): Promise<Country | null> {
    try {
      // Rechercher un pays par son code
      const country = await Country.findOneBy({ code });
      return country;
    } catch (error) {
      console.error("Erreur lors de la récupération du pays par code:", error);
      throw new Error("Erreur lors de la récupération du pays par code.");
    }
  }
}