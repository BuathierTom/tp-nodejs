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

async  function  find(collectionName, query, options = {}) {
	try {
		const  collection = getCollection(collectionName);
		const  result = await  collection.find(query, options);
		return result;

	} catch (e) {
		console.log(`Erreur lors de l'execution de la fonction findOne avec les parametres suivants: ${query}`);
		console.log(e);
		throw  e;
	}
}

async  function  insertOne(collectionName, query) {
	try {
		const  collection = getCollection(collectionName);
		const  result = await  collection.insertOne(query);
		return result;

	} catch (e) {
		console.log(`Erreur lors de l'execution de la fonction findOne avec les parametres suivants: ${query}`);
		console.log(e);
		throw  e;
	}
}

async  function  insertMany(collectionName, query, options = {}) {
	try {
		const  collection = getCollection(collectionName);
		const  result = await  collection.insertMany(query, options);
		return result;

	} catch (e) {
		console.log(`Erreur lors de l'execution de la fonction insertMany avec les parametres suivants: ${query}`);
		console.log(e);
		throw  e;
	}
}

async  function  updateOne(collectionName, filter, query, options = {}) {
	try {
		const  collection = getCollection(collectionName);
		const  result = await  collection.updateOne(filter, query, options);
		return result;

	} catch (e) {
		console.log(`Erreur lors de l'execution de la fonction updateOne avec les parametres suivants: ${query}`);
		console.log(e);
		throw  e;
	}
}

async  function  updateMany(collectionName, filter, query) {
	try {
		const  collection = getCollection(collectionName);
		const  result = await  collection.updateMany(filter, query);
		return result;

	} catch (e) {
		console.log(`Erreur lors de l'execution de la fonction updateOne avec les parametres suivants: ${query}`);
		console.log(e);
		throw  e;
	}
}

async  function  replace(collectionName, query, remplacement) {
	try {
		const  collection = getCollection(collectionName);
		const  result = await  collection.replaceOne(query, remplacement);
		return result;

	} catch (e) {
		console.log(`Erreur lors de l'execution de la fonction updateOne avec les parametres suivants: ${query}`);
		console.log(e);
		throw  e;
	}
}

async  function  deleteOne(collectionName, query) {
	try {
		const  collection = getCollection(collectionName);
		const  result = await  collection.deleteOne(query);
		return result;

	} catch (e) {
		console.log(`Erreur lors de l'execution de la fonction updateOne avec les parametres suivants: ${query}`);
		console.log(e);
		throw  e;
	}
}

async  function  deleteMany(collectionName, query) {
	try {
		const  collection = getCollection(collectionName);
		const  result = await  collection.deleteMany(query);
		return result;

	} catch (e) {
		console.log(`Erreur lors de l'execution de la fonction updateOne avec les parametres suivants: ${query}`);
		console.log(e);
		throw  e;
	}
}
module.exports = {
	findOne,
	find,
	insertOne,
	insertMany,
	updateOne,
	updateMany,
	replace,
	deleteOne,
	deleteMany
}