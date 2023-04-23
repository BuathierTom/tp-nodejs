# TP_NODES de TOM BUATHIER 

## TP2

### Fonctionnalité de ma WatchList : 

#### - Obligatoire :

- [x] Créer un utilisateur
- [x] Ajouter un item au registre
- [x] Créer une watchlist pour un utilisateur
- [x] Ajouter un item dans une watchlist
- [x] Modifier le statut d'un item dans une watchlist
- [ ] Afficher les items du registre (avec possibilité de filtrer)
- [x] Récupérer la liste des utilisateurs
- [x] Récupérer la liste des watchlists d'un utilisateur
- [x] Récupérer le contenu d'une watchlist

#### - Falcultatif :

- [x] Supprimer un item d'une watchlist
- [ ] Modifier les informations personnelles d'un utilisateur
- [x] Supprimer une watchlist
- [x] Ajouter une watchlist en favori
- [x] Récupérer la liste des watchlists misent en favori
- [ ] Partager sa watchlist avec un autre utilisateur
- [x] Donner la possibilité d'écrire une note personnelle sur une watchlist.
- [ ] Mettre en place une page permettant de tester les routes de notre api*

# 

## TP4

### Mise en place des commandes pour le bot discord :

#### Routes Films :

- [x] Route /addFilm : **/add_film**
- [x] Route /findFilms : **/find_films**

#### Routes Users

- [x] Route /userList : **/userlist**
- [x] Route /createUser : **/create_user**
- [x] Route /findWL : **/find_watchlist_user**

#### Routes WatchLists :

- [x] Route /createWL : **/create_wl**
- [x] Route /addFilmWL : **/addfilm_wl**
- [x] Route /deleteWL : **/delete_wl**
- [x] Route /favorisWL : **/favoris_wl**
- [x] Route /favList : **/favoris_list_wl**
- [x] Route /findFilmWL : **/find_film_wl**
- [x] Route /noteWL : **/note_wl**
- [x] Route /updateItemWL : **/update_item_wl**
- [ ] Route /deleteFilmWL : **/**
 
 
#

### Conception d'entités

#### Utilisateur :

* ID 
* Pseudo 
* Age

#### Wachtlist :

* ID
* ID utilisateur 
* Nom de la WatchList
* Listes de films
    * ID Film 
    * Statut
* Note de l'utilisateur

#### Films :

* ID
* Titre
* Date
* Genre
* Durée
* Réalisateur
* Acteurs
* Langage
* Description
* Type (Film ou Serie)


