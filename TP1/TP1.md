# TP n°1: Découverte de Node et création d'une API REST basique avec express.js

Dans ce TP, vous allez apprendre à:

 - Initialiser un projet Node.js
 - Installer et utiliser des packages npm
 - Mettre en place une API REST basique avec express.js


## 1 Initialisation du projet

### 1.1 Installation des outils nécessaires

Nous utiliserons différents outils lors des différents TP. Voici la liste des outils à installer:

-   [NodeJs](https://nodejs.org/en/) en version LTS (18.13.0)
-   git
-   [Insomnia](https://insomnia.rest/download)
-   [Visual studio code](https://code.visualstudio.com/)

### 1.2 Installation du projet

Vous utiliserez git pour les différents travaux pratiques de ce cours. 

#### Mise en place du dépôt distant

Créez ou connectez vous à un compte github.  
Créez un nouveau repository sur github.  
Clonez ce repository dans le répertoire de votre choix.  
Ajoutez ensuite l'utilisateur NxiMidway en tant que collaborateur sur ce nouveau repository.  
Votre dépôt git est prêt.  

Des questions vous seront posées au fil du TP, veuillez répondre à ces questions dans un fichier "reponses.txt" que vous placerez à la racine de votre projet.

Je vous conseille **fortement** de pousser régulièrement vos modifications.

#### Lancer son projet

Dans VS code, ouvrez un nouveau terminal.
Vérifiez que vous êtes bien en Node 18 en tapant la commande `node -v`.
Vérifiez également que vous possédez bien npm en tapant `npm -v`.

Pour créer un nouveau projet Node, il suffit de taper la commande `npm init`.
Répondez aux questions différentes questions posées par le prompt.  

Question °1)  
 A quoi sert le fichier "package.json" créé par la commande npm init?

#### Création de votre premier programme Node.js

Node js permet l’exécution de code javascript en dehors d'un navigateur. 
Créez un fichier "helloWorld.js" dans un nouveau répertoire "tp1".  
Ecrivez dans ce fichier un programme javascript qui affiche "Hello World" dans la console.  
Pour exécuter ce programme, il suffit d'ouvrir un terminal dans le répertoire tp1 et de taper la commande `node ./helloWorld.js`


## 2 Mise en place d'une api avec Express.js

Express est un framework Node.js très populaire qui permet la création de serveurs. Nous utiliserons dans le cadre de ce TP pour la création d'une API REST.

### 2.1 Installation d'Express

Grâce à npm, installer et désinstaller des packages est extrêmement simple. Pour cela, il suffit de taper la commande :

`npm install <nom_du_package>`  

Dans notre cas, on a donc:

`npm install express`

Question n°2)   
A quoi sert le fichier "package-lock.json" généré suite à l’installation d'un package npm ?

Question n°3)  
Il est également possible d'installer un package de la façon suivante: `npm install express --save-dev`.   

Quelle est la différence entre cette commande et celle vue précédemment ?   
Est ce qu'installer express de cette façon est une bonne idée ?

### 2.2 Votre première route avec Express.js

Copiez le code suivant dans un fichier app.js:

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

Ouvrez votre navigateur et tapez l'url suivante:  
`localhost:3000`  

Félicitations, vous venez de créer votre première route !

### 2.3 Découverte des fonctionnalités d'Express.js

Express permet de gérer beaucoup de situations différentes. Voyons un peu ce qu'il est possible de faire.

#### Objets app.get et res

Dans votre fichier app.js, effectuez les modifications suivantes:  

1. Créez une route GET  `/welcome` qui affiche le message "Bienvenue sur le TP 1 du cours d'architecture logicielle".  

2. Créez  une route GET `/secret` qui retourne un code HTTP 401 avec le message "Vous ne possédez pas les droits pour accéder à ma page secrète"

3. Créez une route GET `/error` qui retourne une code HTTP 500 avec un json contenant une propriété message

4. Créez une route GET `/img` qui permet de télécharger l'image de votre choix.

5. Créez une route GET `/redirectMe` qui redirige l'utilisateur vers le site de l'IUT.

#### L'objet req

6. Créez une route GET  `/users/:name` qui affiche le message "Bienvenue sur la page de" suivi de la valeur du paramètre "name".

7. Créez une route GET `/somme` qui prend deux query params 'a' et 'b'  et qui affiche le résultat de la somme entre a et b.  
Exemple: `/somme?a=1&b=4  ` donnera 5

### Objets app.use et next

8. A l'aide de app.use, faites en sorte que chaque route appelée soient affichées avec l'heure de l'appel.   
Exemple, un utilisateur appelle la route `/` puis la route `/welcome`.
Output de la console:
```
[2023-01-24T21:12:02.122Z]: /
[2023-01-24T21:30:02.122Z]: /welcome
```

9. A l'aide de app.use, faites en sorte que tous les appels vers une route non supportée par notre API reçoivent un code HTTP 404 avec les message "Cette page n'existe pas!".  

10. A l'aide de app.use, et de app.get, créez une route GET `/metrics` qui retourne un JSON avec les informations suivantes:  
- "status": "healthy"
- "requestsCount": objet contenant le nombre de requêtes total effectué sur chaque route (Ex: {"/":1, "/img":10, etc...})
- "uptime": Nombre de secondes écoulées depuis le démarrage de l'api*

**indice: se renseigner sur l'objet "process" de Node.Js*
