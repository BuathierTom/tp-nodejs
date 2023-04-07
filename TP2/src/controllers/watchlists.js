const { v4 : uuidv4 } = require ('uuid');

const { findOne, 
        find, 
        insertOne, 
        updateOne,  
        deleteOne, 
        } = require("../services/db/crud");

const { addLog } = require("../services/logs/logs");

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
        addLog("error", `Error, la wachtlist ${nom_WL} existe deja`, "users.js")
        return res.send({Error: `Error, la wachtlist ${nom_WL} existe deja`});
      }
      const result = await insertOne('Watchlists', {
        id: id, 
        id_user: verif_user.id, 
        nom_WL: nom_WL,
        favoris: false,
        ListeFilms : []
        });
      addLog("info", `La wachtlist ${nom_WL} a bien été créé`, "users.js")
      return res.send(result)
    }
    addLog("error", `Error, l'utilisateur ${pseudo} n'existe pas`, "users.js")
    return res.send({Error: `Error, l'utilisateur ${pseudo} n'existe pas`});
    
  } catch (e){
    addLog("error", e, "users.js")
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
            addLog("error", `Error, Le statut n'est pas valide`, "users.js")
            return res.send({Error: `Error, Le statut n'est pas valide`});
          }
          // On verifie la note
          if (note === "N/A") {
            addLog("info", `Le film ${titre} a bien été ajouté à la wachtlist ${nom_WL}`, "users.js")
          } else if (parseInt(note) <= 20 && parsInt(note) >= 0) {
            addLog("info", `Le film ${titre} a bien été ajouté à la wachtlist ${nom_WL}`, "users.js")
          } else {
            addLog("error", `Error, La note doit etre entre 0 et 20`, "users.js")
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
          addLog("info", `Le film ${titre} a bien été ajouté à la wachtlist ${nom_WL}`, "users.js")
          return res.send(result)
            
        }
        addLog("error", `Error, le film ${titre} n'existe pas dans la table Films`, "users.js")
        return res.send({Error: `Error, le film ${titre} n'existe pas dans la table Films`});
      }
      addLog("error", `Error, la wachtlist ${nom_WL} n'existe pas`, "users.js")
      return res.send({Error: `Error, la wachtlist ${nom_WL} n'existe pas`});
    }
    addLog("error", `Error, l'utilisateur ${pseudo} n'existe pas`, "users.js")
    return res.send({Error: `Error, l'utilisateur ${pseudo} n'existe pas`});
  } catch (e){
    addLog("error", e, "users.js")
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
        addLog("info", `La wachtlist ${nom_WL} a bien été supprimé`, "users.js")
        return res.send(result)
      }
      addLog("error", `Error, la wachtlist ${nom_WL} n'existe pas`, "users.js")
      return res.send({Error: `Error, la wachtlist ${nom_WL} n'existe pas`});
    }
    addLog("error", `Error, l'utilisateur ${pseudo} n'existe pas`, "users.js")
    return res.send({Error: `Error, l'utilisateur ${pseudo} n'existe pas`});

  } catch (e){
    addLog("error", e, "users.js")
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
        addLog("info", `La wachtlist ${nom_WL} a bien été mise en favoris`, "users.js")
        return res.send(result)
      }
      addLog("error", `Error, la wachtlist ${nom_WL} n'existe pas`, "users.js")
      return res.send({Error: `Error, la wachtlist ${nom_WL} n'existe pas`});
    }
    addLog("error", `Error, l'utilisateur ${pseudo} n'existe pas`, "users.js")
    return res.send({Error: `Error, l'utilisateur ${pseudo} n'existe pas`});
  } catch (e){
    addLog("error", e, "users.js")
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
      addLog("info", `La liste des wachtlist favoris de ${pseudo} a bien été récupéré`, "users.js")
      return res.send(result)
    }
    addLog("error", `Error, l'utilisateur ${pseudo} n'existe pas`, "users.js")
    return res.send({Error: `Error, l'utilisateur ${pseudo} n'existe pas`});
  } catch (e){
    addLog("error", e, "users.js")
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
        addLog("info", `La wachtlist ${nom_WL} de ${pseudo} a bien été récupéré`, "users.js")
        return res.send(verif_WL.ListeFilms);
      }
      addLog("error", `Error, la wachtlist ${nom_WL} n'existe pas`, "users.js")
      return res.send({Error: `Error, la wachtlist ${nom_WL} n'existe pas`});
    }
    addLog("error", `Error, l'utilisateur ${pseudo} n'existe pas`, "users.js")
    return res.send({Error: `Error, l'utilisateur ${pseudo} n'existe pas`});

  }catch(e){
    addLog("error", e, "users.js")
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
        addLog("info", `La description de la wachtlist ${nom_WL} a bien été modifié`, "users.js")
        return res.send(result)
      }
      addLog("error", `Error, la wachtlist ${nom_WL} n'existe pas`, "users.js")
      return res.send({Error: `Error, la wachtlist ${nom_WL} n'existe pas`});
    }
    addLog("error", `Error, l'utilisateur ${pseudo} n'existe pas`, "users.js")
    return res.send({Error: `Error, l'utilisateur ${pseudo} n'existe pas`});
  } catch (e){
    addLog("error", e, "users.js")
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
            addLog("error", `Error, Le statut n'est pas valide`, "users.js")
            return res.send({Error: `Error, Le statut n'est pas valide`});
          }
          const result = await updateOne('Watchlists', {id: verif_WL.id, "ListeFilms.id_film": verif_Film.id}, {$set: {"ListeFilms.$.statut": statut}});
          addLog("info", `Le statut du film ${titre} de la wachtlist ${nom_WL} a bien été modifié`, "users.js")
          return res.send(result)
        }
      }
      addLog("error", `Error, la wachtlist ${nom_WL} n'existe pas`, "users.js")
      return res.send({Error: `Error, la wachtlist ${nom_WL} n'existe pas`});
    }
    addLog("error", `Error, l'utilisateur ${pseudo} n'existe pas`, "users.js")
    return res.send({Error: `Error, l'utilisateur ${pseudo} n'existe pas`});
  } catch (e){
    addLog("error", e, "users.js")
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
          addLog("info", `Le film ${titre} de la wachtlist ${nom_WL} a bien été supprimé`, "users.js")
          return res.send(result)
        }
      }
      addLog("error", `Error, la wachtlist ${nom_WL} n'existe pas`, "users.js")
      return res.send({Error: `Error, la wachtlist ${nom_WL} n'existe pas`});
    }
    addLog("error", `Error, l'utilisateur ${pseudo} n'existe pas`, "users.js")
    return res.send({Error: `Error, l'utilisateur ${pseudo} n'existe pas`});
  } catch (e){
    addLog("error", e, "users.js")
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