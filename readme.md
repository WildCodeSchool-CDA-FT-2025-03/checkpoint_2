### Checkpoint n°2 CDA JS - Backend

Le but de ce checkpoint est de vérifier tes connaissances en développement backend uniquement en se basant sur Apollo, GraphQL, TypeORM et SQlite.

:warning: :warning: :warning:

```
Aucun développement front end ne sera intégré, pas de seed de données
Merci de lire les consignes jusqu'au bout avant de commencer
```

- Commence par créer une nouvelle branche :nom_prenom et la pousser sur github pour valider les droits sur le repo.\
  :interrobang: En cas de problème, contacte ton formateur

## STEP 01 : configuration d'environnement de travail

- A/ Crée un nouveau projet NodeJS Typescript et configure ton tsconfig.json
- B/ Prépare ton environnement de code. N'oublie pas de mettre en place un `.gitignore` pour les `node_modules` et le `.env`

Voici les packages dont tu auras besoin :

"dependencies": {\
 "@apollo/server":\
 "reflect-metadata":\
 "sqlite3":\
 "ts-node-dev":\
 "type-graphql":\
 "typeorm":\
 "dotenv":\
 "class-validator":\
}

"devDependencies": {\
 "@types/node":\
},

- C/ Crée le fichier `index.ts`, point d'entrée sur ton serveur et ajoute un script dans ton `package.json` pour le lancer `npm run dev`.
- D/ Crée un ficher `.env` et `.env-sample`

## STEP 02 : Mise en place des composants d'accès à la données

- A/ Mise en place d'une entités TypeORM pour la table pays (id, name, code, flag)
- B/ Mise en place de la connexion à Sqlite (utilise les variables d'env)
- C/ Mise en place du serveur avec l'initialisation / synchro de la DB vierge. La data sera ajoutée par la mutation.
- D/ Mise en place d'un resolver et ajout du schéma sur le serveur

- E/ Crée une mutation qui prend en paramètres :
  un code (FR, BE, AN, ...),
  un nom (France, Belgique, Andorre, ...),
  un emoji (🇫🇷, 🇧🇪, 🇦🇩, ...),
  et qui enregistre cette entrée en BDD.
  Attention, l'ensemble des champs doit être validé par `class-Validator`

- F/ Crée ensuite 2 queries :
  Une qui renvoie la liste de tous les pays (avec pour attributs, pour chaque pays, le code, le nom, l'emoji) (F)\
  Une autre qui prend en paramètre le code du pays et qui renvoie le pays en question (Fbis)

  :tada: :tada: :tada:
  Félicitation, c'est la fin...
  Si tu es encore motivé, voici quelques bonus pour pousser les compétences un peu plus loin

## Step 03: Bonus 1

- Ajoute un code continent dans une nouvelle entité et synchronise celui ci à la mutation d'ajout de pays
- Ajoute une query qui permet de récupérer tous les pays d'un continent (continent.resolvers.ts)

:warning: :warning: :warning: Attention

## Step 04: Bonus 2

-Modifie ton code pour passer en environnement Docker

- B/ Mets en place un DOCKERFILE dans ton backend(serveur)
- C/ Mets en place un Docker Compose avec Postgres, Adminer et ton API
  - Options de volumes
  - Options de Port
  - Options de variables d'environnement

```
Pense à commiter ton travail à chaque petite étape avec un message claire et explicite  et une reprise de la numéroation des US
ex : "S1-USd@ Mise en place des variables d'environnement"
```
