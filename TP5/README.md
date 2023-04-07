# TP n°5: Gestion des logs d'une application

Ce TP est un peu particulier. En effet, il ne contient aucun exercice en soit. Voyez comme une ouverture sur le sujet. De plus, si cela peut vous motiver, appliquer les pratiques décrites dans ce document sera apprécié et pris en compte lors de la notation de votre projet.

## 1. Concept et intérêt

Les logs sont une partie très importante dans la construction d'une application. En effet, ils sont essentiels pour faciliter le processus de débogage et peuvent également permettre de mettre en place un système de monitoring.

Gérer système de logs peut être long et fastidieux.  Cependant, de la même façon que pour les tests unitaires, un code de qualité repose également sur des logs efficaces.

Dans un premier temps, voyons donc pourquoi les logs sont important en prenant un exemple concret.

Prenons une situation à laquelle vous serez forcément confronté un jour dans votre future vie de développeur:

Votre client vous contacte en annonçant qu'une fonctionnalité de votre application ne fonctionne plus. Il vous demande de régler le problème au plus vite car c'est une fonctionnalité importante et cela risque d'impacter l’expérience utilisateur.

Vous essayez de reproduire le problème mais la fonctionnalité semble marcher parfaitement quand vous testez votre application sur l'environnement de développement.

Vous devez donc consulter les logs de l'environnement de production pour comprendre ce qu'il s'est passé.

Deux cas de figures sont alors possibles:

- Première possibilité, votre système de log n'est pas très performant, vous devez donc résoudre le problème avec les informations suivantes:  

![image](https://user-images.githubusercontent.com/49685536/230194415-52caa5b3-62bb-427f-a9b6-039d057e7ef4.png)  

Ceci est évidemment un exemple factice, mais imaginez devoir déboguer une application en vous basant uniquement sur ce genre de logs avec des fichiers atteignant facilement plusieurs dizaines de milliers de lignes.

- Deuxième possibilité, votre système de log est efficace et respecte les bonnes pratiques:  
![image](https://user-images.githubusercontent.com/49685536/230194531-e5b74ff9-9612-43e9-ba2c-f980e65bd21c.png)

Cet exemple est un peu caricatural mais j'espère que vous comprenez maintenant pourquoi il est important de bien soigner ses logs.


## Quelques bonnes pratiques

### Utilisation d'outils dédiés

La premières chose à faire lorsque l'on veut améliorer la qualité de ses logs est d'utiliser un librairie dédiée. En effet, l'utilisation de la fonction `console.log` peut s’avérer utile dans un premier temps mais l'on atteint vite ses limites.  

En NodeJs, il existe une multitude de package dédiés aux logs, parmis les plus connus on retrouve [Winston](https://www.npmjs.com/package/winston), [Morgan](https://github.com/expressjs/morgan) ou encore [Pino](https://github.com/pinojs/pino). Chaque package possède ses qualités et ses défauts.


### Quand générer des logs ?

Les logs sont le journal de bord de votre application. Quand vous mettez en place votre système, il faut se demander quelles sont les informations pertinentes. Il ne faut pas être trop avare en informations mais il faut également éviter d'afficher des informations inutiles qui viendraient parasiter nos précieux logs.

 Voici quelques exemples de situation où il est intéressant de générer des logs:
 - Lors d'une erreur (prévue ou non)
 - Appel à une api
 - Actions en base de données
 - Étapes clés d'un parcours client
 - ...

Il existe autant de situations différentes que d'applications, c'est à vous de faire le tri dans ce que vous voulez logger.

### Les informations à ne pas inclure dans les logs

Certaines informations ne doivent pas apparaître dans les logs:
- Mots de passes (évident mais bon à rappeler)
- Informations personnelles (Pour respecter le RGPD, il faut proscrire les nom, prénom, information bancaires, mails, etc...)
- Informations donnant des indices sur la stack technique du projet (nom d'une librairie, version, nom d'un outil, etc..En plus d'être inutile, dans le cas ou un petit malin arriverait à mettre la main sur les logs, cela pourrait causer des problèmes de sécurité)

### Gestion des erreurs

Un bon système de log repose aussi sur un bon système de gestion d'erreurs. Malheureusement, nous n'aurons pas le temps de nous pencher sur ce sujet dans ce cours. Je vous invite cependant à vous renseigner sur le sujet si cela vous intéresse. Je vous conseille cet article qui évoque une approche intéressante: https://sematext.com/blog/node-js-error-handling/

### Format des logs

Le format de vos logs est important. En effet, il est beaucoup plus facile de s'y retrouver en appliquant un format uniforme sur toute votre applications.
Partons d'un log extrémement basique et ajoutons des informations au fur et à mesure:  

`Récupération de la liste des films de l'utilisateur 123123`


**Timestamp**

Dans un premier temps, il est **fortement** recommandé d'ajouter un timestamp dans chacun de vos logs. En plus de vous aider à vous repérer, cela est aussi utile pour filtrer les fichiers de logs qui peuvent être très volumineux.

`[2023-04-05T19:44:03.012Z]: Récupération de la liste des films de l'utilisateur 123123`

**Niveaux de granularité**

Tous les logs n'ont pas le même niveau d'importance. C'est pour cela qu'il est coutume d'associer un niveau de granularité (aussi appelé sévérité) à chacun de vos logs. Le nombre et les noms des niveaux de logs peuvent varier en fonction des projets mais voici les niveaux les plus communs (par ordre croissant d'importance):
- Debug: Informations permettant de vous aider lors du développement ou du débogage (ex: "Entrée dans la fonction toto")
- Info: Evénements courants, ce genre de log est généralement purement informatif et permet d'aider lors d'analyses (ex: "Récupération de la liste des commandes pour l'utilisateur toto").
- Warning: Erreur ne causant pas de dysfonctionnement majeur de l'application (ex: "Erreur lors de l’authentification, le paramètre toto est manquant")
- Error: Erreur ayant un impact sur une ou plusieurs fonctionnalités de l'application  (ex: "Erreur lors de l'appel au service toto").

Procéder de la sorte permet de hiérarchiser les informations. De plus, vous pouvez facilement configurer votre librairie de logging pour ne générer des logs qu'à partir d'un certain niveau de sévérité. Cela peut être obligatoire dans certains cas (il faut aussi prendre en compte qu'en fonction de l'environnement, le stockage des logs peut coûter très cher).

`[2023-04-05T19:44:03.012Z] [INFO] : Récupération de la liste des films de l'utilisateur 123123`

**Source**  

Il peut être interessant d'ajouter la source (ex: le service/la classe/la fonction/etc...) afin de comprendre rapidement quelle partie de l'application est à l'origine du message.

`[2023-04-05T19:44:03.012Z] [INFO] [filmApi] : Récupération de la liste des films de l'utilisateur 123123`

**CorrelationId**

Dans le cas d'application utilisées par de nombreux utilisateurs, il peut être intéressant d'ajouter un correlation id à vos logs. L'idée est d'assigner un id à chaque parcours utilisateur. Cela permet de se retrouver beaucoup plus facielement quand on souhaite voir le parcours d'un client de bout en bout. 

`[2023-04-05T19:44:03.012Z] [239030928737209] [INFO] [filmApi] : Récupération de la liste des films de l'utilisateur 123123`  
`[2023-04-05T19:44:03.312Z] [239030928737209] [INFO] [userApi] : Ajout du film 23344 à la liste 8493983 de l'utilisateur 123123`

A noter que si votre API est consommée par d'autres applications, vous pouvez ajouter un prefix dans les paramètres de vos routes pour que les applications consommatrices soient encore plus répérables. Admettons que l'application imdb appelle votre API en passant "imdb-film" comme prefix, on obtiendra:

`[2023-04-05T19:44:03.012Z] [imdb-film_239030928737209] [INFO] [filmApi] : Récupération de la liste des films de l'utilisateur 123123`  
`[2023-04-05T19:44:03.312Z] [imdb-film_239030928737209] [INFO] [userApi] : Ajout du film 23344 à la liste 8493983 de l'utilisateur 123123`

**Logs "structurés"**

Les "logs structurés" correspondent à des logs générés au format JSON. Cela à l'avantage d'assurer un format universel à vos logs. De plus, cela permet également de grandement faciliter le filtre ainsi que l'utilisation de vos logs par des outils de monitoring comme datadog (cela peut avoir son importance !).


```json
{
 "timestamp": "2023-04-05T19:44:03.312Z",
 "correlationId": "imdb-film_239030928737209",
 "level": "INFO",
 "source": "filmApi",
 "message": "Récupération de la liste des films de l'utilisateur 123123",
 "error": false
}
```

### Exemple avec Winston

Voici un exemple de genération de logs avec Winston:

```js
const winston = require("winston");
const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.prettyPrint()
    ),
    transports: [
        new winston.transports.File({ filename: "combined.log" }),
    ],
});
logger.log({
    level: "info",
    message: "Récupération  de la liste des films de l'utilisateur 123123",
    source: "filmApi"    
});
```

On crée dans un premier temps un logger avant winston.createLogger. C'est un exemple très basique mais je vous invite à consulter la documentation si vous voulez en savoir plus sur ce qu'il est possible de faire.  

Une fois notre logger créé, il suffit d'utiliser la fonction logger.log en passant en paramètre les informations souhaitées et le tour est joué !  
Si vous voulez l'utiliser dans un autre fichier, il suffit de l'exporter et de l'importer à l'endroit désiré.

Petit bonus, nos logs sont stokés dynamiquement dans le fichier "combined.log".

Output (fichier combined.log):    
```
{
  level: 'info',
  message: "Récupération  de la liste des films de l'utilisateur 123123",
  source: 'filmApi',
  timestamp: '2023-04-05T21:54:05.264Z'
}
```