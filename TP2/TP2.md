
# TP n°2: Persister les données de son API

Dans ce TP, vous allez apprendre à:

-   Persister les données de votre API grâce à une base de données MongoDB
-   Structurer votre projet en utilisant l'objet router d'express
-   Utiliser une source de données externe

Le but de ce TP sera de mettre en place une API permettant de gérer des watchlists.

## 1 Initialisation du projet

Créez un répertoire "tp2" dans le dépôt git créé lors du TP1.

### Structure du projet

Pour ce TP, nous utiliserons la structure suivante:

![image](https://user-images.githubusercontent.com/49685536/214699414-0959c19b-6149-4245-a675-7341f8cee9ff.png)

L'ensemble de notre code sera dans un répertoire **src/** (cela permet de séparer le code des fichiers de configurations que l'on place généralement à la racine d'un projet). 

Le fichier **app.js** nous permettra de lancer notre API.

Le dossier **routes/** contiendra les différentes routes de notre api. Une bonne pratique est de faire une route par type d'entité. Par exemple, les actions liés aux utilisateurs commenceront tous par `/users`.  
On trouve dans ce répertoire le fichier **index.js** qui va relier nos différentes routes et gérer tout ce qu'il se passe au niveau de la racine de notre api.

Le dossier **repositories/** contiendra l'ensemble des appels à des ressources externes (APIs, services ou encore bases de données).

Le dossier **controllers/** contiendra nos middlewares qu'on regroupera par type d'entité.

Enfin, le dossier **services** contiendra toutes les fonctions utilitaires ou avec de la logique avancée qui ne sont pas propres à un type entité en particulier. On peut aussi y mettre les fonctions qui manipulent plusieurs types entités en même temps.

### Faciliter le lancement des APIs

Ajoutez les scripts suivants ans votre package.json, :  
`"tp1": "node ./tp1/app.js"`  
`"tp2": "node ./tp2/src/app.js"`

Vous pouvez maintenant lancer vos tp en tapant la commande  `npm run tpx`  avec x le numéro de tp souhaité

### Installation de mongodb

Téléchargez et installez  [mongodb community edition](https://www.mongodb.com/docs/manual/administration/install-community/).

Lors de l’installation, je vous conseille de cocher l'option  **Install MongoD as a Service**. Cela permet de lancer un server mongo lors du démarrage de votre pc, vous pouvez choisir de ne pas cocher cette option mais il faudra lancer votre serveur mongo à la main.

Sélectionnez également l'option permettant d'installer mongodb compass, nous en aurons besoin.

Une fois l'installation terminée, ouvrez mongo compass.
Si vous avez installé mongo as a service, vous pouvez simplement cliquer sur le bouton "Connect" et compass se connectera directement à votre serveur mongo local (l'url par défaut de mongo est `mongodb://localhost:27017`).  

Créez une nouvelle base de données `watchlist` via compass.

## 2 Mise en place de la connexion avec mongo

Comme pour le tp1, créez votre fichier app.js:

```javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

Pour connectez votre API à votre mongdb, copiez le code ci dessous dans un fichier "connection.js" en respectant cette arborescence:

![image](https://user-images.githubusercontent.com/49685536/214701050-e55a1222-0f00-4a67-847d-2b7fa9e37fe0.png)


```javascript
const { MongoClient } = require('mongodb');
const conf = require("../../../conf.json")
// Connection URI
const url = conf.tp2.databaseUrl;
const dbName = conf.tp2.databaseName;

// Create a new MongoClient
const client = new MongoClient(uri);

async function connectTodB() {
    try {
        console.log('Trying to access the db...');
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();

        // Establish and verify connection
        await client.db('admin').command({ ping: 1 });
        console.log('Connected successfully to server');
    } catch (e) {
        // Ensures that the client will close when you finish/error
        console.log(JSON.stringify(err));
        await client.close();
        throw e;
    }
}

function getCollection(collectionName) {
    return client.db(dbName).collection(collectionName);
}

module.exports = {
    connectTodB,
    getCollection,
};
```


Créez un fichier conf.json dans le répertoire tp2 et complétez le afin de faire fonctionner la connexion au serveur mongo.

Question n°4) Quel est l'intérêt de passer par un fichier conf.json ?

Lancez votre API, si le message 'Connected successfully to server' apparaît dans la console, vous êtes bien connecté à votre base mongodb.

## 3 Mise en place des opération CRUD

Les opérations CRUD (Create Read Update Delete) sont essentielles à la gestion de votre base de données.  

Créez un fichier crud.js dans le répertoire `db` et ajoutez le code ci dessous:  

```javascript
const { getCollection } = require('./connection');

async  function  findOne(collectionName, query, options = {}) {
	try {
		const  collection = getCollection(collectionName);
		const  result = await  collection.findOne(query, options);
		return  result;
	} catch (e) {
		console.log(`Erreur lors de l execution de la fonction findOne avec les parametres suivants: ${query}`);
		console.log(e);
		throw  e;
	}
}
```

Question n°5) A quoi sert la fonction findOne ?

En s'inspirant de la fonction findOne, compléter le fichier crud.js en implémentant les fonctions suivantes*:
 
 - find
 - insertOne
 - insertMany
 - updateOne
 - updateMany
 - replace
 - deleteOne
 - deleteMany

**N'hésitez pas à consulter la [documentation de mongodb](https://www.mongodb.com/docs/drivers/node/current/usage-examples/) pour vous aider !*


## 4 Gestion de watchlist

Notre API permettra de gérer des watchlists pour différents utilisateurs.   

Une watchlist est constituée de différents films et épisodes de séries qu'on appelera "item".   Un item peut avoir 4 état différents quand il est dans une watchlist: "A voir", "En cours", "Terminé" et "Abandonné".  

Avant de pouvoir être ajouté à une watchlist, l'utilisateur devra ajouter l'item souhaité à un registre commun à tous les utilisateurs. Une fois l'item ajouté au registre, il sera disponible pour tous les autres utilisateurs et pourra être ajouté dans n'importe quelle watchlist.

Nous utiliserons [cette api](https://www.omdbapi.com/) pour rechercher des items et remplir le registre.


Voici les différentes fonctionnalités demandées pour notre API:
 - Créer un utilisateur
 - Modifier les informations personnelles d'un utilisateur
 - Ajouter un item au registre (attention aux doublons !)
 - Créer une watchlist pour un utilisateur
 - Ajouter un item dans une watchlist
 - Modifier le statut d'un item dans une watchlist 
 - Supprimer un item d'une watchlist
 - Supprimer une watchlist
 - Lister les items du registre 
 - Donner la possibilité de filtrer les éléments du registre en fonction de l'année, de la langue et du score imdbRating
 - Récupérer la liste des utilisateurs
 - Récupérer la liste des watchlists d'un utilisateur
 - Récupérer le contenu d'une watchlist
 - Partager sa watchlist avec un autre utilisateur
 - Donner la possibilité d'écrire une note personnelle sur une watchlist ou un item.

Les fonctionnalités ne sont pas très détaillées, si vous avez des questions, je jouerai le rôle du client.

Identifiez les différentes entités à gérer et proposez un modèle de données pour chaque entité.

Une fois votre conception validée, créez les collections mongodb associées à vos entités dans la base de données "watchlist" via compass.

### Appel à l'API omdbapi

Omdbapi est une api qui permet de récupérer des informations sur des films ou des séries.
Afin de pouvoir utiliser cette api, il vous faudra une apiKey.  
Pour cela, il suffit de faire une demande via le site de l'API.  
Il est important de noter que cette apiKey vous permet d'effectuer **1 000 appels par jour**.  
C'est suffisant pour l'usage de ce tp, cependant je vous conseille d'éviter de faire des appels dans des boucles. et de faire attention à vos appels d'une manière générale.

Nous allons avoir besoin de faire des appels HTTP depuis notre propre API.  
Node possède nativement un module `http` qui permet de faire ce genre d'appel.  
Cependant, je vous conseille d'utiliser le package [axios](https://www.npmjs.com/package/axios) qui est plus pratique.  

*Pour suivre la structure du projet, le code relatif aux appels omdbapi devra être dans le répertoire `repositories`*


### Bonus

Si vous avez terminé le TP en avance, vous pouvez implémenter vos prores fonctionnalités.
Sinon, voici quelques pistes à explorer:
- Mettre en place un système de log avec [morgan](https://www.npmjs.com/package/morgan)
- Mettre en place des tests unitaires avec [jest](https://jestjs.io/fr/)
- Sécuriser vos routes avec [express-validator](https://express-validator.github.io/docs)

Je suis également ouvert aux suggestions si un sujet vous intéresse en particulier !

### Ressources

Voici une liste de ressources utiles pour le développement de votre API:
- [W3 school](https://www.w3schools.com/nodejs/default.asp), site contenant des ressources utiles pour apprendre Node.
- [Lodash](https://lodash.com/), librairie qui contient de nombreuses fonctions utilitaires.
- [Documentation du driver node mongodb](https://www.mongodb.com/docs/drivers/node/current/)
- [Documentation d'express](https://expressjs.com/fr/)
- stack overflow en cas de soucis (car un bon développeur est un développeur qui sait comment trouver le bon topic stack overflow)



