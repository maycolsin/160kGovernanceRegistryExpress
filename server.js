const express = require('express')
var http = require('http')
var request = require('request-promise');
const bodyParser = require('body-parser');

const path = require('path')
const PORT = process.env.PORT || 8090

//var request = require('request');

const { GovernaceRegistryCoreBusiness160K } = require('./GovernaceRegistryCoreBusiness160K.js');
const { Asset } = require('./asset.js');
const { AssetAsociation } = require('./asset.js');

var app = express()
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, 'public')))  
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/createAsset', async (request, reply) => {

    try {
		
		console.log("request.body.assetType:",request.body.assetType);
		console.log("request.body.overview_name:",request.body.overview_name);
		console.log("request.body.overview_version:",request.body.overview_version);
		console.log("request.body.overview_context:",request.body.overview_context);
		
		
		if(!request.body.assetType || !request.body.overview_name || !request.body.overview_version || !request.body.overview_context) {

		   var respuesta = {
			   error: true,
			   codigo: 503,
			   mensaje: 'se deben enviar todos los campos obligatorios: assetType, overview_name, overview_version, overview_context'
		   };

		   //return respuesta;
		   reply.status(200).send(respuesta);
		   
		}

		var governaceRegistryCoreBusiness160K = new GovernaceRegistryCoreBusiness160K();

		var asset = new Asset(request.body.assetType,request.body.overview_name,request.body.overview_version,request.body.overview_context);


	   var respuesta = {
		   error: true,
		   codigo: 503,
		   mensaje: 'se deben enviar todos los campos obligatorios'
	   };

		await governaceRegistryCoreBusiness160K.createAsset(asset).then((value)=> respuesta = value );
		
		//return respuesta;
		reply.status(200).send(respuesta);

	  
    } catch (err) {
		console.error(err);

		   var respuesta = {
			   error: true,
			   codigo: 502,
			   mensaje: 'Error al crear Asset'
		   };

		//return respuesta;
		reply.status(200).send(respuesta);

    }

  })
  
  .delete('/deleteAsset', async (request, reply) => {

    try {
		
		console.log("request.body.assetType:",request.body.assetType);
		console.log("request.body.overview_name:",request.body.overview_name);
		console.log("request.body.overview_version:",request.body.overview_version);
		console.log("request.body.overview_context:",request.body.overview_context);
		
		
		if(!request.body.assetType || !request.body.overview_name) {

		   var respuesta = {
			   error: true,
			   codigo: 503,
			   mensaje: 'se deben enviar todos los campos obligatorios: assetType y overview_name'
		   };

		   //return respuesta;
		   reply.status(200).send(respuesta);
		   
		}

		var governaceRegistryCoreBusiness160K = new GovernaceRegistryCoreBusiness160K();

		var asset = new Asset(request.body.assetType,request.body.overview_name,request.body.overview_version,request.body.overview_context);


	   var respuesta = {
		   error: true,
		   codigo: 503,
		   mensaje: 'se deben enviar todos los campos obligatorios'
	   };

		await governaceRegistryCoreBusiness160K.deleteAsset(asset).then((value)=> respuesta = value );
		
		//return respuesta;
		reply.status(200).send(respuesta);

	  
    } catch (err) {
		console.error(err);

		   var respuesta = {
			   error: true,
			   codigo: 502,
			   mensaje: 'Error al crear Asset'
		   };

		//return respuesta;
		reply.status(200).send(respuesta);

    }

  })
  
  .put('/updateAsset', async (request, reply) => {

    try {
		
		console.log("request.body.assetType:",request.body.assetType);
		console.log("request.body.overview_name:",request.body.overview_name);
		console.log("request.body.overview_version:",request.body.overview_version);
		console.log("request.body.overview_context:",request.body.overview_context);
		console.log("request.body.overview_newname:",request.body.overview_newname);
		//console.log("request.body.overview_newversion:",request.body.overview_newversion);
		console.log("request.body.overview_newcontext:",request.body.overview_newcontext);		
		
		if(!request.body.assetType || !request.body.overview_name || !request.body.overview_newname) {

		   var respuesta = {
			   error: true,
			   codigo: 503,
			   mensaje: 'se deben enviar todos los campos obligatorios: assetType, overview_name y overview_newname'
		   };

		   //return respuesta;
		   reply.status(200).send(respuesta);
		   
		}

		var governaceRegistryCoreBusiness160K = new GovernaceRegistryCoreBusiness160K();

		var asset = new Asset(request.body.assetType,request.body.overview_name,request.body.overview_version,request.body.overview_context,request.body.overview_newname,request.body.overview_newcontext);


	   var respuesta = {
		   error: true,
		   codigo: 503,
		   mensaje: 'se deben enviar todos los campos obligatorios'
	   };

		await governaceRegistryCoreBusiness160K.updateAsset(asset).then((value)=> respuesta = value );
		
		//return respuesta;
		reply.status(200).send(respuesta);

	  
    } catch (err) {
		console.error(err);

		   var respuesta = {
			   error: true,
			   codigo: 502,
			   mensaje: 'Error al crear Asset'
		   };

		//return respuesta;
		reply.status(200).send(respuesta);

    }

  })
  
  .get('/searchAsset', async (request, reply) => {

    try {
		
		
		console.log('request.query', request.query);   // undefined
		console.log('request.params', request.params); // undefined		
		
		console.log("request.query.assetType:",request.query.assetType);
		console.log("request.query.overview_name:",request.query.overview_name);
		console.log("request.query.overview_version:",request.query.overview_version);
		console.log("request.query.overview_context:",request.query.overview_context);
		
		
		if(!request.query.assetType) {

		   var respuesta = {
			   error: true,
			   codigo: 503,
			   mensaje: 'se deben enviar todos los campos obligatorios: assetType'
		   };

		   //return respuesta;
		   reply.status(200).send(respuesta);
		   
		}

		var governaceRegistryCoreBusiness160K = new GovernaceRegistryCoreBusiness160K();

		var asset = new Asset(request.query.assetType,request.query.overview_name,request.query.overview_version,request.query.overview_context);


	   var respuesta = {
		   error: true,
		   codigo: 503,
		   mensaje: 'se deben enviar todos los campos obligatorios'
	   };

		await governaceRegistryCoreBusiness160K.searchAsset(asset).then((value)=> respuesta = value );
		
		//return respuesta;
		reply.status(200).send(respuesta);

	  
    } catch (err) {
		console.error(err);

		   var respuesta = {
			   error: true,
			   codigo: 502,
			   mensaje: 'Error al consultar Assets'
		   };

		//return respuesta;
		reply.status(200).send(respuesta);

    }

  })
  
  .get('/getAssetAssociations', async (request, reply) => {

    try {
		
		
		console.log('request.query', request.query);   // undefined
		console.log('request.params', request.params); // undefined		
		
		console.log("request.query.assetType:",request.query.assetType);
		console.log("request.query.overview_name:",request.query.overview_name);
		console.log("request.query.overview_version:",request.query.overview_version);
		console.log("request.query.overview_context:",request.query.overview_context);
		
		
		if(!request.query.assetType) {

		   var respuesta = {
			   error: true,
			   codigo: 503,
			   mensaje: 'se deben enviar todos los campos obligatorios: assetType y overview_name'
		   };

		   //return respuesta;
		   reply.status(200).send(respuesta);
		   
		}

		var governaceRegistryCoreBusiness160K = new GovernaceRegistryCoreBusiness160K();

		var asset = new Asset(request.query.assetType,request.query.overview_name,request.query.overview_version,request.query.overview_context);


	   var respuesta = {
		   error: true,
		   codigo: 503,
		   mensaje: 'se deben enviar todos los campos obligatorios'
	   };

		await governaceRegistryCoreBusiness160K.getAssetAssociations(asset).then((value)=> respuesta = value );
		
		//return respuesta;
		reply.status(200).send(respuesta);

	  
    } catch (err) {
		console.error(err);

		   var respuesta = {
			   error: true,
			   codigo: 502,
			   mensaje: 'Error al consultar asociaciones de un asset'
		   };

		//return respuesta;
		reply.status(200).send(respuesta);

    }

  })
  
  .post('/createAssetAssociations', async (request, reply) => {

	console.log("Iniciando createAssetAssociations...");

    try {	
	
		var respuesta = {
		   error: true,
		   codigo: 503,
		   mensaje: 'se deben enviar todos los campos obligatorios'
		};
		
		var asset = {};
		var assetTarget = {};
		var assetAsociation = {};
		var i = 0;
		var listaAssetAsociation = [];
		
		for( i=0;i<request.body.length;i++){	 		
		

			if(!request.body[i].assetType || !request.body[i].overview_name || !request.body[i].type || !request.body[i].targetAssetType || !request.body[i].targetAssetName ) {

			   var respuesta = {
				   error: true,
				   codigo: 503,
				   mensaje: 'se deben enviar todos los campos obligatorios: assetType, overview_name, type, targetAssetType, targetAssetName'
			   };

			   //return respuesta;
			   reply.status(200).send(respuesta);
			   
			}

			asset = new Asset(request.body[i].assetType,
								request.body[i].overview_name,
								request.body[i].overview_version,
								request.body[i].overview_context);
								
			assetTarget = new Asset(request.body[i].targetAssetType,
								request.body[i].targetAssetName,
								request.body[i].targetAssetVersion,
								request.body[i].targetAssetContext);

			assetAsociation = new AssetAsociation(asset,request.body[i].type,assetTarget);		

			listaAssetAsociation[i]=assetAsociation;
		   
		}  

		var governaceRegistryCoreBusiness160K = new GovernaceRegistryCoreBusiness160K();

		await governaceRegistryCoreBusiness160K.createAssetAssociations(listaAssetAsociation).then((value)=> respuesta = value );
		
		//return respuesta;
		reply.status(200).send(respuesta);

	  
    } catch (err) {
		console.error(err);

		   var respuesta = {
			   error: true,
			   codigo: 502,
			   mensaje: 'Error al crear Asset'
		   };

		//return respuesta;
		reply.status(200).send(respuesta);

    }

  })

  .post('/promoteDemoteLifecycleAsset', async (request, reply) => {

	console.log("Iniciando promoteDemoteLifecycleAsset...");

    try {	
	
		var respuesta = {
		   error: true,
		   codigo: 503,
		   mensaje: 'se deben enviar todos los campos obligatorios'
		};
		
		var asset = {};

		var i = 0;


		
		console.log("request.body.assetType:",request.body.assetType);
		console.log("request.body.overview_name:",request.body.overview_name);
		console.log("request.body.overview_version:",request.body.overview_version);
		console.log("request.body.overview_context:",request.body.overview_context);
		console.log("request.body.nextState:",request.body.nextState);
		console.log("request.body.comment:",request.body.comment);
		
		if(!request.body.assetType || !request.body.overview_name || !request.body.nextState) {

		   var respuesta = {
			   error: true,
			   codigo: 503,
			   mensaje: 'se deben enviar todos los campos obligatorios: assetType, overview_name y nextState'
		   };

		   //return respuesta;
		   reply.status(200).send(respuesta);
		   
		}

		asset = new Asset(request.body.assetType,
							request.body.overview_name,
							request.body.overview_version,
							request.body.overview_context);	


		var governaceRegistryCoreBusiness160K = new GovernaceRegistryCoreBusiness160K();

		await governaceRegistryCoreBusiness160K.promoteDemoteLifecycleAsset(asset,request.body.nextState,request.body.comment).then((value)=> respuesta = value );
		
		//return respuesta;
		reply.status(200).send(respuesta);

	  
    } catch (err) {
		console.error(err);

		   var respuesta = {
			   error: true,
			   codigo: 502,
			   mensaje: 'Error al crear Asset'
		   };

		//return respuesta;
		reply.status(200).send(respuesta);

    }

  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
  

