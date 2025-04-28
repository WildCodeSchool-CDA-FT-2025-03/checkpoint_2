import { dataSource } from './client';
import { Continent } from '../entities/continent.entity';
import { Country } from '../entities/country.entity';
import "dotenv/config";

async function seed() {
  try {
    await dataSource.initialize();
    console.log('🔌 Connexion à la base de données établie');

    await Country.delete({});
    await Continent.delete({});
    console.log('🧹 Anciennes données supprimées');

    const europe = new Continent();
    europe.name = 'Europe';
    europe.code = 'EU';
    await europe.save();

    const asie = new Continent();
    asie.name = 'Asie';
    asie.code = 'AS';
    await asie.save();

    const afriqueNord = new Continent();
    afriqueNord.name = 'Afrique du Nord';
    afriqueNord.code = 'AF';
    await afriqueNord.save();

    const amerique = new Continent();
    amerique.name = 'Amérique';
    amerique.code = 'AM';
    await amerique.save();

    const oceanie = new Continent();
    oceanie.name = 'Océanie';
    oceanie.code = 'OC';
    await oceanie.save();

    const france = new Country();
    france.name = 'France';
    france.code = 'FR';
    france.flag = '🇫🇷';
    france.continent = europe;
    await france.save();

    const allemagne = new Country();
    allemagne.name = 'Allemagne';
    allemagne.code = 'DE';
    allemagne.flag = '🇩🇪';
    allemagne.continent = europe;
    await allemagne.save();

    const japon = new Country();
    japon.name = 'Japon';
    japon.code = 'JP';
    japon.flag = '🇯🇵';
    japon.continent = asie;
    await japon.save();

    const chine = new Country();
    chine.name = 'Chine';
    chine.code = 'CN';
    chine.flag = '🇨🇳';
    chine.continent = asie;
    await chine.save();

    const maroc = new Country();
    maroc.name = 'Maroc';
    maroc.code = 'MA';
    maroc.flag = '🇲🇦';
    maroc.continent = afriqueNord;
    await maroc.save();

    const etatUnis = new Country();
    etatUnis.name = 'États-Unis';
    etatUnis.code = 'US';
    etatUnis.flag = '🇺🇸';
    etatUnis.continent = amerique;
    await etatUnis.save();

    const australie = new Country();
    australie.name = 'Australie';
    australie.code = 'AU';
    australie.flag = '🇦🇺';
    australie.continent = oceanie;
    await australie.save();

    console.log('✅ Données de test ajoutées avec succès');
    
  } catch (error) {
    console.error('❌ Erreur lors du seed:', error);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('👋 Connexion à la base de données fermée');
    }
  }
}

seed();