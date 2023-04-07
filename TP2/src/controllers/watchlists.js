const { v4 : uuidv4 } = require ('uuid');

const { findOne, 
        find, 
        insertOne, 
        updateOne,  
        deleteOne, 
        } = require("../services/db/crud");

async function createWachtList(req, res, next){
  try {
    const pseudo = req.body.pseudo
    const nom_WL = req.body.nom_WL
    const id = uuidv4();  

    const verif_user = await findOne('Utilisateurs', {pseudo: pseudo})
    // On verifie qu'il y a bien l'utilisateur qui existe
    if (verif_user) {
      const verif_WL = await findOne('Watchlists', {id_user: verif_user.id, nom_WL: nom_WL})
      // On verifie qu'il n'y pas de nom
      if (verif_WL) {
        return res.send({Error: `Error, la wachtlist ${nom_WL} existe deja`});
      }
      const result = await insertOne('Watchlists', {
        id: id, 
        id_user: verif_user.id, 
        nom_WL: nom_WL,
        favoris: false,
        ListeFilms : []
        });
      console.log(`Création de la WachtList: ${nom_WL}`)
      return res.send(result)
    }
    return res.send({Error: `Error, l'utilisateur ${pseudo} n'existe pas`});
    
  } catch (e){
    console.log(e)
  }
}

async function insertWachtList(req, res, next){
  try {
    const pseudo = req.body.pseudo
    const nom_WL = req.body.nom_WL
    const titre = req.body.titre
    const statut = req.body.statut
    const note = req.body.note

    const listStatut = [ "A voir", "En cours", "Terminé", "Abandonné" ]


    const verif_user = await findOne('Utilisateurs', {pseudo: pseudo})
    // On verifie qu'il y a bien l'utilisateur qui existe
    if (verif_user) {
      // On verifie qu'il y a bien la wachtlist qui existe
      const verif_WL = await findOne('Watchlists', {id_user: verif_user.id, nom_WL: nom_WL})
      if (verif_WL) {
        const verif_Film = await findOne('Films', {Title: titre})
        // On verifie qu'il y a bien le film si il existe ou pas dans la table
        if (verif_Film){
          if (!listStatut.includes(statut)){
            return res.send({Error: `Error, Le statut n'est pas valide`});
          }
          // On verifie la note
          if (note === "N/A") {
            console.log("Note non donnée")
          } else if (parseInt(note) <= 20 && parsInt(note) >= 0) {
            console.log("Note valide")
          } else {
            return res.send({Error: `Error, La note doit etre entre 0 et 20`});
          }
          // On l'insere dans la table Watchlist
          const result = await updateOne('Watchlists', {id: verif_WL.id}, {$push: {ListeFilms:
              {
                id_film: verif_Film.id,
                statut: statut,
                note: note
              }
            }}
          );

          console.log(`Création de la WachtList: ${nom_WL}`)
          return res.send(result)
            
        }
        return res.send({Error: `Error, le film ${titre} n'existe pas dans la table Films`});
      }
      return res.send({Error: `Error, la wachtlist ${nom_WL} n'existe pas`});
    }
    return res.send({Error: `Error, l'utilisateur ${pseudo} n'existe pas`});
  } catch (e){
    console.log(e)
  }
}

async function deleteWatchList(req, res, next){
  try {
    const pseudo = req.body.pseudo
    const nom_WL = req.body.nom_WL

    const verif_user = await findOne('Utilisateurs', {pseudo: pseudo})
    // On verifie qu'il y a bien l'utilisateur qui existe
    if (verif_user) {
      // On verifie qu'il y a bien la wachtlist qui existe
      const verif_WL = await findOne('Watchlists', {id_user: verif_user.id, nom_WL: nom_WL})
      if (verif_WL) {
        const result = await deleteOne('Watchlists', { nom_WL: nom_WL });
        console.log("Le grand delete a bien eu lieu")
        return res.send(result)
      }
      return res.send({Error: `Error, la wachtlist ${nom_WL} n'existe pas`});
    }
    return res.send({Error: `Error, l'utilisateur ${pseudo} n'existe pas`});


  } catch (e){
    console.log(e)
  }
}

async function favorisWatchList(req, res, next){
  try {
    const pseudo = req.body.pseudo
    const nom_WL = req.body.nom_WL

    const verif_user = await findOne('Utilisateurs', {pseudo: pseudo})
    // On verifie qu'il y a bien l'utilisateur qui existe
    if (verif_user) {
      // On verifie qu'il y a bien la wachtlist qui existe
      const verif_WL = await findOne('Watchlists', {id_user: verif_user.id, nom_WL: nom_WL})
      if (verif_WL) {
        const result = await updateOne('Watchlists', {id: verif_WL.id}, {$set: {favoris: true}});
        console.log("La wachtlist est maintenant en favoris")
        return res.send(result)
      }
      return res.send({Error: `Error, la wachtlist ${nom_WL} n'existe pas`});
    }
    return res.send({Error: `Error, l'utilisateur ${pseudo} n'existe pas`});
  } catch (e){
    console.log(e)
  }

}

async function favorisList(req, res, next){
  try {
    const pseudo = req.body.pseudo

    const verif_user = await findOne('Utilisateurs', {pseudo: pseudo})
    // On verifie qu'il y a bien l'utilisateur qui existe
    if (verif_user) {
      const verif_WL = await find('Watchlists', {id_user: verif_user.id, favoris: true});
      const result = []
      await verif_WL.forEach((item)=>{
        result.push(item)
      });
      return res.send(result)
    }
    return res.send({Error: `Error, l'utilisateur ${pseudo} n'existe pas`});
  } catch (e){
    console.log(e)
  }
}

async function findFilmWL(req, res, next){
  try{
    const pseudo = req.body.pseudo
    const nom_WL = req.body.nom_WL

    const verif_user = await findOne('Utilisateurs', {pseudo: pseudo})
    // On verifie qu'il y a bien l'utilisateur qui existe
    if (verif_user) {
      // On verifie qu'il y a bien la wachtlist qui existe
      const verif_WL = await findOne('Watchlists', {id_user: verif_user.id, nom_WL: nom_WL})
      if (verif_WL) {
        return res.send(verif_WL.ListeFilms);
      }
      return res.send({Error: `Error, la wachtlist ${nom_WL} n'existe pas`});
    }
    return res.send({Error: `Error, l'utilisateur ${pseudo} n'existe pas`});

  }catch(e){
    console.log(e)
  }

}

async function noteWatchList(req, res, next){
  try {
    const pseudo = req.body.pseudo
    const nom_WL = req.body.nom_WL
    const description = req.body.description

    const verif_user = await findOne('Utilisateurs', {pseudo: pseudo})
    // On verifie qu'il y a bien l'utilisateur qui existe
    if (verif_user) {
      // On verifie qu'il y a bien la wachtlist qui existe
      const verif_WL = await findOne('Watchlists', {id_user: verif_user.id, nom_WL: nom_WL})
      if (verif_WL) {
        const result = await updateOne('Watchlists', {id: verif_WL.id}, {$set: {description: description}});
        console.log("La wachtlist a bien été noté")
        return res.send(result)
      }
      return res.send({Error: `Error, la wachtlist ${nom_WL} n'existe pas`});
    }
    return res.send({Error: `Error, l'utilisateur ${pseudo} n'existe pas`});
  } catch (e){
    console.log(e)
  }

}

async function updateItemWL(req, res, next){
  try {
    const pseudo = req.body.pseudo
    const nom_WL = req.body.nom_WL
    const titre = req.body.titre
    const statut = req.body.statut

    const listStatut = [ "A voir", "En cours", "Terminé", "Abandonné" ]


    const verif_user = await findOne('Utilisateurs', {pseudo: pseudo})
    // On verifie qu'il y a bien l'utilisateur qui existe
    if (verif_user) {
      // On verifie qu'il y a bien la wachtlist qui existe
      const verif_WL = await findOne('Watchlists', {id_user: verif_user.id, nom_WL: nom_WL})
      if (verif_WL) {
        const verif_Film = await findOne('Films', {Title: titre})
        // On verifie qu'il y a bien le film si il existe ou pas dans la table
        if (verif_Film){
          if (!listStatut.includes(statut)){
            return res.send({Error: `Error, Le statut n'est pas valide`});
          }
          const result = await updateOne('Watchlists', {id: verif_WL.id, "ListeFilms.id_film": verif_Film.id}, {$set: {"ListeFilms.$.statut": statut}});
          console.log("La note a bien été ajouté")
          return res.send(result)
        }
      }
      return res.send({Error: `Error, la wachtlist ${nom_WL} n'existe pas`});
    }
    return res.send({Error: `Error, l'utilisateur ${pseudo} n'existe pas`});
  } catch (e){
    console.log(e)
  }

}

async function deleteFilmWL(req, res, next){
  try {
    const pseudo = req.body.pseudo
    const nom_WL = req.body.nom_WL
    const titre = req.body.titre

    const verif_user = await findOne('Utilisateurs', {pseudo: pseudo})
    // On verifie qu'il y a bien l'utilisateur qui existe
    if (verif_user) {
      // On verifie qu'il y a bien la wachtlist qui existe
      const verif_WL = await findOne('Watchlists', {id_user: verif_user.id, nom_WL: nom_WL})
      if (verif_WL) {
        const verif_Film = await findOne('Films', {Title: titre})
        // On verifie qu'il y a bien le film si il existe ou pas dans la table
        if (verif_Film){
          const result = await updateOne('Watchlists', {id: verif_WL.id}, {$pull: {ListeFilms: {id_film: verif_Film.id}}});
          console.log("Le film a bien été supprimé")
          return res.send(result)
        }
      }
      return res.send({Error: `Error, la wachtlist ${nom_WL} n'existe pas`});
    }
    return res.send({Error: `Error, l'utilisateur ${pseudo} n'existe pas`});
  } catch (e){
    console.log(e)
  }

}

module.exports = {
    createWachtList,
    insertWachtList,
    deleteWatchList,
    favorisWatchList,
    favorisList,
    findFilmWL,
    noteWatchList,
    updateItemWL,
    deleteFilmWL
}