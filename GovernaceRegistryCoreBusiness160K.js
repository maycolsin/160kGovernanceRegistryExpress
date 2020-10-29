
var request = require('request-promise');

var util = require('util');

const PUBLISHER_API_HOST_PORT = "https://34.71.254.216:8085";

const loginRest = PUBLISHER_API_HOST_PORT+'/publisher/apis/authenticate';

const createAssetRest = PUBLISHER_API_HOST_PORT+'/publisher/apis/assets';

const deleteAssetRest = PUBLISHER_API_HOST_PORT+'/publisher/apis/assets';

const searchAssetRest = PUBLISHER_API_HOST_PORT+'/publisher/apis/assets';

const updateAssetRest = PUBLISHER_API_HOST_PORT+'/publisher/apis/assets';

const getAssetAssociationsRest = PUBLISHER_API_HOST_PORT+'/resource/1.0.0/associations';

const createAssetAssociationsRest = PUBLISHER_API_HOST_PORT+'/resource/1.0.0/associations';

const promoteDemoteLifecycleAssetRest = PUBLISHER_API_HOST_PORT+'/publisher/apis/assets';/*/{id}/state*/

const logoutRest = PUBLISHER_API_HOST_PORT+'/publisher/apis/logout';




var commandActualizarEstadoCV = 'curl -k -X POST "https://34.71.254.216:8085/publisher/apis/assets/8a156168-5c38-44e8-8ef6-2c68c1d9bfaf/state?type=restservice" -F "nextState=Testing" -F "comment=ok" -v -b ';

const { Asset } = require('./asset.js');

const { AssetAsociation } = require('./asset.js');


var wso2grlogin = {
  
  login: function() {
    return request({
      "method":"POST",
      "uri": "" +loginRest,
      "json": true,
	  "strictSSL": false,
	  "form": {
        "username": "admin",
		"password": "admin"
	  }
    });
  }
}





const { AssetDetail } = require('./assetDetail.js');

class GovernaceRegistryCoreBusiness160K
{
	// pass the main http object while creating an object
	constructor(http) {
		this.http = http;
	}

	async createAsset(asset) {

		var loginResponse = {};

		var createAssetResponse= {};

		try{

			loginResponse = await wso2grlogin.login();
					
			console.log('loginResponse.data.sessionId: ',loginResponse.data.sessionId);
						
			var createAssetRestFinal = createAssetRest+ "?type=" + asset.assetType;
			
			var wso2grCreateAsset = {}
			
			if(	typeof asset.overview_context!=='undefined' && asset.overview_context!='' &&
				typeof asset.overview_version!=='undefined' && asset.overview_version!=''){
			
				wso2grCreateAsset = {
				  
				  createAsset: function() {
					return request({
					  "method":"POST",
					  "uri": "" +createAssetRestFinal,
					  "json": true,
					  "strictSSL": false,
					  "headers": {
							"Content-Type": "application/json",
							"Cookie":"JSESSIONID="+loginResponse.data.sessionId
					  },
					  "form": {
						"overview_name": ""+asset.overview_name,
						"overview_version": ""+asset.overview_version,
						"overview_context": ""+asset.overview_context
					  },
					});
				  }
				}
			
			}else{
				
				if(	typeof asset.overview_context!=='undefined' && asset.overview_context!=''){
					
					wso2grCreateAsset = {
					  
					  createAsset: function() {
						return request({
						  "method":"POST",
						  "uri": "" +createAssetRestFinal,
						  "json": true,
						  "strictSSL": false,
						  "headers": {
								"Content-Type": "application/json",
								"Cookie":"JSESSIONID="+loginResponse.data.sessionId
						  },
						  "form": {
							"overview_name": ""+asset.overview_name,
							"overview_context": ""+asset.overview_context
						  },
						});
					  }
					}
				
				}else{
					
					wso2grCreateAsset = {
					  
					  createAsset: function() {
						return request({
						  "method":"POST",
						  "uri": "" +createAssetRestFinal,
						  "json": true,
						  "strictSSL": false,
						  "headers": {
								"Content-Type": "application/json",
								"Cookie":"JSESSIONID="+loginResponse.data.sessionId
						  },
						  "form": {
							"overview_name": ""+asset.overview_name,
							"overview_version": ""+asset.overview_version
						  },
						});
					  }
					}
					
				}
			}
			
			
			
			
			createAssetResponse= await wso2grCreateAsset.createAsset();

			console.log('createAssetResponse: ',createAssetResponse);
				

		}catch(e){

		   //console.log("e.stack",e.stack);
		   console.log("e.message:",e.message);
			
		   var message = e.message;
			
		   var n = message.indexOf("-");

		   console.log("n:",n);

		   var code = message.substring(0,n-1);
		   console.log("code:",code);
		   
		   var jsonMessage = message.substring(n+2);
		   console.log("jsonMessage:",jsonMessage);
			
		   createAssetResponse = {
			   error: true,
			   codigo: ''+code,
			   mensaje: ''+jsonMessage
		   };
		
				
				
		} finally {

			try{
				if (loginResponse.data.sessionId!=''){
					
					var wso2grLogout = {
					  
					  logout: function() {
						return request({
						  "method":"POST",
						  "uri": "" +logoutRest,
						  "json": true,
						  "strictSSL": false,
						  "headers": {
								"Cookie":"JSESSIONID="+loginResponse.data.sessionId
						  }
						});
					  }
					}
							
					var logoutResponse= await wso2grLogout.logout();
					
					console.log('logoutResponse: ',logoutResponse);

				}
			
			}catch(ex){
				
				console.log("ex.stack:",ex.stack);
				
			}
		}
		
		return createAssetResponse;


	}
	
	async deleteAsset(asset) {

		var loginResponse = {};

		var searchAssetResponse = {};

		var deleteAssetResponse= {};

		try{

			loginResponse = await wso2grlogin.login();
					
			console.log('loginResponse.data.sessionId: ',loginResponse.data.sessionId);
						
			var filtro = '"overview_name":"'+asset.overview_name+'"';
			
			if( typeof asset.overview_version!=='undefined' &&  asset.overview_version!=''){
				filtro = filtro + ',"overview_version":"'+asset.overview_version+'"';
			}
			
			if( typeof asset.overview_context!=='undefined' && asset.overview_context!=''){
				filtro = filtro + ',"overview_context":"'+asset.overview_context+'"';
			}			
			
			console.log('filtro: ',filtro);			
			
			var searchAssetRestFinal = searchAssetRest+"?type="+ asset.assetType+'&q='+filtro;
			
			console.log('searchAssetRestFinal: ',searchAssetRestFinal);
						
			var wso2grSearchAsset = {
			  
			  searchAsset: function() {
				return request({
				  "method":"GET",
				  "uri": "" +searchAssetRestFinal,
				  "json": true,
				  "strictSSL": false,
				  "headers": {
						"Content-Type": "application/json",
						"Cookie":"JSESSIONID="+loginResponse.data.sessionId
				  }
				});
			  }
			}	

			searchAssetResponse= await wso2grSearchAsset.searchAsset();
			
			console.log('searchAssetResponse: ',searchAssetResponse);
			
			if( searchAssetResponse.count != 1){
				
				if(searchAssetResponse.count > 1){

				    var respuesta = {
					   error: true,
					   codigo: 602,
					   mensaje: 'La busqueda de asset obtuvo mas de un resultado. Afine mejor su busqueda.'
				    };

					return respuesta
				
				}else{
					
				    var respuesta = {
					   error: true,
					   codigo: 601,
					   mensaje: 'La busqueda de asset no obtuvo ningun resultado. Valide si el asset existe.'
				    };

					return respuesta
					
				}
			}
			
			
			
			
			var idAsset =searchAssetResponse.list[0].id;
			
			console.log('idAsset: ',idAsset);
						
			var deleteAssetRestFinal = deleteAssetRest+'/'+idAsset+"?type=" + asset.assetType;
			
			console.log('deleteAssetRestFinal: ',deleteAssetRestFinal);
			
			var wso2grDeleteAsset = {
			  
			  deleteAsset: function() {
				return request({
				  "method":"DELETE",
				  "uri": "" +deleteAssetRestFinal,
				  "json": true,
				  "strictSSL": false,
				  "headers": {
						"Content-Type": "application/json",
						"Cookie":"JSESSIONID="+loginResponse.data.sessionId
				  }
				});
			  }
			}		
			
			deleteAssetResponse= await wso2grDeleteAsset.deleteAsset();

			console.log('deleteAssetResponse: ',deleteAssetResponse);
				

		}catch(e){

		   //console.log("e.stack",e.stack);
		   console.log("e.message:",e.message);
			
		   var message = e.message;
			
		   var n = message.indexOf("-");

		   console.log("n:",n);

		   var code = message.substring(0,n-1);
		   console.log("code:",code);
		   
		   var jsonMessage = message.substring(n+2);
		   console.log("jsonMessage:",jsonMessage);
			
		   deleteAssetResponse = {
			   error: true,
			   codigo: ''+code,
			   mensaje: ''+jsonMessage
		   };
		
				
				
		} finally {

			try{
				if (loginResponse.data.sessionId!=''){
					
					var wso2grLogout = {
					  
					  logout: function() {
						return request({
						  "method":"POST",
						  "uri": "" +logoutRest,
						  "json": true,
						  "strictSSL": false,
						  "headers": {
								"Cookie":"JSESSIONID="+loginResponse.data.sessionId
						  }
						});
					  }
					}
							
					var logoutResponse= await wso2grLogout.logout();
					
					console.log('logoutResponse: ',logoutResponse);

				}
			
			}catch(ex){
				
				console.log("ex.stack:",ex.stack);
				
			}
		}
		
		return deleteAssetResponse;


	}
	
	async updateAsset(asset) {

		var loginResponse = {};

		var searchAssetResponse = {};

		var updateAssetResponse= {};

		try{

			loginResponse = await wso2grlogin.login();
					
			console.log('loginResponse.data.sessionId: ',loginResponse.data.sessionId);
						
			var filtro = '"overview_name":"'+asset.overview_name+'"';
			
			if( typeof asset.overview_version!=='undefined' &&  asset.overview_version!=''){
				filtro = filtro + ',"overview_version":"'+asset.overview_version+'"';
			}
			
			if( typeof asset.overview_context!=='undefined' && asset.overview_context!=''){
				filtro = filtro + ',"overview_context":"'+asset.overview_context+'"';
			}			
			
			console.log('filtro: ',filtro);			
			
			var searchAssetRestFinal = searchAssetRest+"?type="+ asset.assetType+'&q='+filtro;
			
			console.log('searchAssetRestFinal: ',searchAssetRestFinal);
						
			var wso2grSearchAsset = {
			  
			  searchAsset: function() {
				return request({
				  "method":"GET",
				  "uri": "" +searchAssetRestFinal,
				  "json": true,
				  "strictSSL": false,
				  "headers": {
						"Content-Type": "application/json",
						"Cookie":"JSESSIONID="+loginResponse.data.sessionId
				  }
				});
			  }
			}	

			searchAssetResponse= await wso2grSearchAsset.searchAsset();
			
			console.log('searchAssetResponse: ',searchAssetResponse);
			
			if( searchAssetResponse.count != 1){
				
				if(searchAssetResponse.count > 1){

				    var respuesta = {
					   error: true,
					   codigo: 602,
					   mensaje: 'La busqueda de asset obtuvo mas de un resultado. Afine mejor su busqueda.'
				    };

					return respuesta
				
				}else{
					
				    var respuesta = {
					   error: true,
					   codigo: 601,
					   mensaje: 'La busqueda de asset no obtuvo ningun resultado. Valide si el asset existe.'
				    };

					return respuesta
					
				}
			}
			
			
			
			
			var idAsset =searchAssetResponse.list[0].id;
			
			console.log('idAsset: ',idAsset);
						
			var updateAssetRestFinal = updateAssetRest+'/'+idAsset+"?type=" + asset.assetType;
			
			console.log('updateAssetRestFinal: ',updateAssetRestFinal);
			
			var wso2grUpdateAsset = {};
			
			console.log('asset.overview_newname: ',asset.overview_newname);
			console.log('asset.overview_newcontext: ',asset.overview_newcontext);
			
			if(	typeof asset.overview_newcontext!=='undefined' && asset.overview_newcontext!=''){
			
				wso2grUpdateAsset = {

					  updateAsset: function() {
						return request({
						  "method":"POST",
						  "uri": "" +updateAssetRestFinal,
						  "json": true,
						  "strictSSL": false,
						  "headers": {
								"Content-Type": "application/json",
								"Cookie":"JSESSIONID="+loginResponse.data.sessionId
						  },
						  "form": {
							"overview_name":""+asset.overview_newname,
							"overview_context": ""+asset.overview_newcontext
						  }
						});
					  }

				}	

			}else{
				

				wso2grUpdateAsset = {

					  updateAsset: function() {
						return request({
						  "method":"POST",
						  "uri": "" +updateAssetRestFinal,
						  "json": true,
						  "strictSSL": false,
						  "headers": {
								"Content-Type": "application/json",
								"Cookie":"JSESSIONID="+loginResponse.data.sessionId
						  },
						  "form": {
							"overview_name":""+asset.overview_newname
						  }
						});
					  }

				}

				
			}
				
			
			updateAssetResponse= await wso2grUpdateAsset.updateAsset();

			console.log('updateAssetResponse: ',updateAssetResponse);
				

		}catch(e){

		   //console.log("e.stack",e.stack);
		   console.log("e.message:",e.message);
			
		   var message = e.message;
			
		   var n = message.indexOf("-");

		   console.log("n:",n);

		   var code = message.substring(0,n-1);
		   console.log("code:",code);
		   
		   var jsonMessage = message.substring(n+2);
		   console.log("jsonMessage:",jsonMessage);
			
		   updateAssetResponse = {
			   error: true,
			   codigo: ''+code,
			   mensaje: ''+jsonMessage
		   };
		
				
				
		} finally {

			try{
				if (loginResponse.data.sessionId!=''){
					
					var wso2grLogout = {
					  
					  logout: function() {
						return request({
						  "method":"POST",
						  "uri": "" +logoutRest,
						  "json": true,
						  "strictSSL": false,
						  "headers": {
								"Cookie":"JSESSIONID="+loginResponse.data.sessionId
						  }
						});
					  }
					}
							
					var logoutResponse= await wso2grLogout.logout();
					
					console.log('logoutResponse: ',logoutResponse);

				}
			
			}catch(ex){
				
				console.log("ex.stack:",ex.stack);
				
			}
		}
		
		return updateAssetResponse;


	}
	
	async searchAsset(asset) {

		var loginResponse = {};

		var searchAssetResponse = {};

		try{

			loginResponse = await wso2grlogin.login();
					
			console.log('loginResponse.data.sessionId: ',loginResponse.data.sessionId);
						
			var filtro = '';
			
			var count = 0;
			
			if(typeof asset.overview_name!=='undefined' && asset.overview_name!=''){
				
				if(count>0)
					filtro = filtro + ',"overview_name":"'+asset.overview_name+'"';
				else
					filtro = filtro + '"overview_name":"'+asset.overview_name+'"';
				
				count++;
				
			}			
			
			if(typeof asset.overview_version!=='undefined' && asset.overview_version!=''){

				if(count>0)
					filtro = filtro + ',"overview_version":"'+asset.overview_version+'"';
				else
					filtro = filtro + '"overview_version":"'+asset.overview_version+'"';
				
				count++;
				
			}
			
			if(typeof asset.overview_context!=='undefined' && asset.overview_context!=''){
				
				if(count>0)
					filtro = filtro + ',"overview_context":"'+asset.overview_context+'"';
				else
					filtro = filtro + '"overview_context":"'+asset.overview_context+'"';
				
				count++;
				
			}			
			
			console.log('filtro: ',filtro);			
			
			var searchAssetRestFinal = searchAssetRest+"?type="+ asset.assetType+'&q='+filtro;
			
			console.log('searchAssetRestFinal: ',searchAssetRestFinal);
						
			var wso2grSearchAsset = {
			  
			  searchAsset: function() {
				return request({
				  "method":"GET",
				  "uri": "" +searchAssetRestFinal,
				  "json": true,
				  "strictSSL": false,
				  "headers": {
						"Content-Type": "application/json",
						"Cookie":"JSESSIONID="+loginResponse.data.sessionId
				  }
				});
			  }
			}	

			searchAssetResponse= await wso2grSearchAsset.searchAsset();
			
			console.log('searchAssetResponse: ',searchAssetResponse);

		}catch(e){

		   //console.log("e.stack",e.stack);
		   console.log("e.message:",e.message);
			
		   var message = e.message;
			
		   var n = message.indexOf("-");

		   console.log("n:",n);

		   var code = message.substring(0,n-1);
		   console.log("code:",code);
		   
		   var jsonMessage = message.substring(n+2);
		   console.log("jsonMessage:",jsonMessage);
			
		   searchAssetResponse = {
			   error: true,
			   codigo: ''+code,
			   mensaje: ''+jsonMessage
		   };
		
				
				
		} finally {

			try{
				if (loginResponse.data.sessionId!=''){
					
					var wso2grLogout = {
					  
					  logout: function() {
						return request({
						  "method":"POST",
						  "uri": "" +logoutRest,
						  "json": true,
						  "strictSSL": false,
						  "headers": {
								"Cookie":"JSESSIONID="+loginResponse.data.sessionId
						  }
						});
					  }
					}
							
					var logoutResponse= await wso2grLogout.logout();
					
					console.log('logoutResponse: ',logoutResponse);

				}
			
			}catch(ex){
				
				console.log("ex.stack:",ex.stack);
				
			}
		}
		
		return searchAssetResponse;


	}
	
	async getAssetAssociations(asset) {

		var loginResponse = {};
		
		var searchAssetResponse = {};

		var assetAssociationsResponse = {};

		try{

			loginResponse = await wso2grlogin.login();
					
			console.log('loginResponse.data.sessionId: ',loginResponse.data.sessionId);
						
			var filtro = '';
			
			var count = 0;
			
			if(typeof asset.overview_name!=='undefined' && asset.overview_name!=''){
				
				if(count>0)
					filtro = filtro + ',"overview_name":"'+asset.overview_name+'"';
				else
					filtro = filtro + '"overview_name":"'+asset.overview_name+'"';
				
				count++;
				
			}			
			
			if(typeof asset.overview_version!=='undefined' && asset.overview_version!=''){

				if(count>0)
					filtro = filtro + ',"overview_version":"'+asset.overview_version+'"';
				else
					filtro = filtro + '"overview_version":"'+asset.overview_version+'"';
				
				count++;
				
			}
			
			if(typeof asset.overview_context!=='undefined' && asset.overview_context!=''){
				
				if(count>0)
					filtro = filtro + ',"overview_context":"'+asset.overview_context+'"';
				else
					filtro = filtro + '"overview_context":"'+asset.overview_context+'"';
				
				count++;
				
			}			
			
			console.log('filtro: ',filtro);			
			
			var searchAssetRestFinal = searchAssetRest+"?type="+ asset.assetType+'&q='+filtro;
			
			console.log('searchAssetRestFinal: ',searchAssetRestFinal);
						
			var wso2grSearchAsset = {
			  
			  searchAsset: function() {
				return request({
				  "method":"GET",
				  "uri": "" +searchAssetRestFinal,
				  "json": true,
				  "strictSSL": false,
				  "headers": {
						"Content-Type": "application/json",
						"Cookie":"JSESSIONID="+loginResponse.data.sessionId
				  }
				});
			  }
			}

			searchAssetResponse= await wso2grSearchAsset.searchAsset();
			
			console.log('searchAssetResponse: ',searchAssetResponse);
			
			if( searchAssetResponse.count != 1){
				
				if(searchAssetResponse.count > 1){

				    var respuesta = {
					   error: true,
					   codigo: 602,
					   mensaje: 'La busqueda de asset obtuvo mas de un resultado. Afine mejor su busqueda.'
				    };

					return respuesta
				
				}else{
					
				    var respuesta = {
					   error: true,
					   codigo: 601,
					   mensaje: 'La busqueda de asset no obtuvo ningun resultado. Valide si el asset existe.'
				    };

					return respuesta
					
				}
			}

			var pathAsset =searchAssetResponse.list[0].path;
			
			console.log('pathAsset: ',pathAsset);
						
			var getAssetAssociationsRestFinal = getAssetAssociationsRest+'?path=' + pathAsset;
			
			console.log('getAssetAssociationsRestFinal: ',getAssetAssociationsRestFinal);

			var wso2grGetAssetAssociations = {
			  
			  getAssetAssociations: function() {
				return request({
				  "method":"GET",
				  "uri": "" +getAssetAssociationsRestFinal,
				  "json": true,
				  "strictSSL": false,
				  "headers": {
						"Content-Type": "application/json",
						"Authorization": "Basic YWRtaW46YWRtaW4="
				  }
				});
			  }
			}

			assetAssociationsResponse= await wso2grGetAssetAssociations.getAssetAssociations();
			
			console.log('assetAssociationsResponse: ',assetAssociationsResponse);

		}catch(e){

		   //console.log("e.stack",e.stack);
		   console.log("e.message:",e.message);
			
		   var message = e.message;
			
		   var n = message.indexOf("-");

		   console.log("n:",n);

		   var code = message.substring(0,n-1);
		   console.log("code:",code);
		   
		   var jsonMessage = message.substring(n+2);
		   console.log("jsonMessage:",jsonMessage);
			
		   assetAssociationsResponse = {
			   error: true,
			   codigo: ''+code,
			   mensaje: ''+jsonMessage
		   };
		
				
				
		} finally {

			try{
				if (loginResponse.data.sessionId!=''){
					
					var wso2grLogout = {
					  
					  logout: function() {
						return request({
						  "method":"POST",
						  "uri": "" +logoutRest,
						  "json": true,
						  "strictSSL": false,
						  "headers": {
								"Cookie":"JSESSIONID="+loginResponse.data.sessionId
						  }
						});
					  }
					}
							
					var logoutResponse= await wso2grLogout.logout();
					
					console.log('logoutResponse: ',logoutResponse);

				}
			
			}catch(ex){
				
				console.log("ex.stack:",ex.stack);
				
			}
		}
		
		return assetAssociationsResponse;

	}

	async createAssetAssociations(listaAssetAsociation) {

		var loginResponse = {};

		var searchAssetResponse = {};
		
		var searchAssetTargetResponse = {};

		var createAssetAssociationsResponse= {};
		
		var listaCreateAssetAssociationsResponse= {};

		try{

			loginResponse = await wso2grlogin.login();
					
			console.log('loginResponse.data.sessionId: ',loginResponse.data.sessionId);

			var assetAsociation={};
			var asset={};
			var targetAsset={};
			var wso2grSearchAsset ={};
			var wso2grCreateAssetAssociations = {};
			var wso2grCreateTargetAssetAssociations = {};
			
			var searchAssetRestFinal = '';
			var filtro = '';
			var createAssetAssociationsRestFinal='';
			
			var i=0;
			
			var encontroAsociacionAsset = false;
			var encontroAsociacionAssetTarget = false;
			
			var numeroAsociacionesRealizadas = 0;
			
			for(i = 0; i < listaAssetAsociation.length; i++){

				assetAsociation = listaAssetAsociation[i];
				
				asset = assetAsociation.asset;
				
				console.log('asset: ',asset);
				
				targetAsset = assetAsociation.assetTarget;
				
				console.log('targetAsset: ',targetAsset);
				
				searchAssetRestFinal = '';
						
				//buscamos el asset a asociar...
				console.log('buscamos el asset...');
						
				var filtro = '"overview_name":"'+asset.overview_name+'"';
				
				if(typeof asset.overview_version!='undefined' && asset.overview_version!=''){
					filtro = filtro + ',"overview_version":"'+asset.overview_version+'"';
				}
				
				if(typeof asset.overview_context!='undefined' && asset.overview_context!=''){
					filtro = filtro + ',"overview_context":"'+asset.overview_context+'"';
				}
				
				console.log('filtro: ',filtro);			
				
				searchAssetRestFinal = searchAssetRest+"?type="+ asset.assetType+'&q='+filtro;
				
				console.log('searchAssetRestFinal: ',searchAssetRestFinal);
							
				wso2grSearchAsset = {
				  
				  searchAsset: function() {
					return request({
					  "method":"GET",
					  "uri": "" +searchAssetRestFinal,
					  "json": true,
					  "strictSSL": false,
					  "headers": {
							"Content-Type": "application/json",
							"Cookie":"JSESSIONID="+loginResponse.data.sessionId
					  }
					});
				  }
				};

				searchAssetResponse= await wso2grSearchAsset.searchAsset();
				
				console.log('searchAssetResponse: ',searchAssetResponse);
				
				if( searchAssetResponse.count != 1){
					
					if(searchAssetResponse.count > 1){

						var respuesta = {
						   error: true,
						   codigo: 602,
						   mensaje: 'La busqueda de asset obtuvo mas de un resultado. Afine mejor su busqueda.'
						};

						return respuesta
					
					}else{
						
						var respuesta = {
						   error: true,
						   codigo: 601,
						   mensaje: 'La busqueda de asset no obtuvo ningun resultado. Valide si el asset existe.'
						};

						return respuesta
						
					}
				};
				
				
				
				var pathAsset =searchAssetResponse.list[0].path;
				
				console.log('pathAsset: ',pathAsset);
							
				var getAssetAssociationsRestFinal = getAssetAssociationsRest+'?path=' + pathAsset;
				
				console.log('buscamos el targetAsset...');
				//buscamos el targetAsset
				
				console.log('getAssetAssociationsRestFinal: ',getAssetAssociationsRestFinal);
				
				var filtro = '"overview_name":"'+targetAsset.overview_name+'"';
				
				if(typeof targetAsset.overview_version!='undefined' && targetAsset.overview_version!=''){
					filtro = filtro + ',"overview_version":"'+targetAsset.overview_version+'"';
				}
				
				if(typeof targetAsset.overview_context!='undefined' && targetAsset.overview_context!=''){
					filtro = filtro + ',"overview_context":"'+targetAsset.overview_context+'"';
				}
				
				console.log('filtroTarget: ',filtro);			
				
				searchAssetRestFinal = searchAssetRest+"?type="+ targetAsset.assetType+'&q='+filtro;
				
				console.log('searchTargetAssetRestFinal: ',searchAssetRestFinal);
							
				wso2grSearchAsset = {
				  
				  searchAsset: function() {
					return request({
					  "method":"GET",
					  "uri": "" +searchAssetRestFinal,
					  "json": true,
					  "strictSSL": false,
					  "headers": {
							"Content-Type": "application/json",
							"Cookie":"JSESSIONID="+loginResponse.data.sessionId
					  }
					});
				  }
				};

				searchAssetResponse= await wso2grSearchAsset.searchAsset();
				
				console.log('searchAssetResponse: ',searchAssetResponse);
				
				if( searchAssetResponse.count != 1){
					
					if(searchAssetResponse.count > 1){

						var respuesta = {
						   error: true,
						   codigo: 602,
						   mensaje: 'La busqueda de target asset obtuvo mas de un resultado. Afine mejor su busqueda.'
						};

						return respuesta;
					
					}else{
						
						var respuesta = {
						   error: true,
						   codigo: 601,
						   mensaje: 'La busqueda de target asset no obtuvo ningun resultado. Valide si el asset existe.'
						};

						return respuesta;
						
					}
				};			
				
				var pathTargetAsset =searchAssetResponse.list[0].path;
				
				console.log('pathTargetAsset: ',pathTargetAsset);
				
				
				
				//Consultamos las asociaciones del asset
				encontroAsociacionAsset = false;
				encontroAsociacionAssetTarget = false;
							
				var getAssetAssociationsRestFinal = getAssetAssociationsRest+'?path=' + pathAsset;
				
				console.log('getAssetAssociationsRestFinal: ',getAssetAssociationsRestFinal);

				var wso2grGetAssetAssociations = {
				  
				  getAssetAssociations: function() {
					return request({
					  "method":"GET",
					  "uri": "" +getAssetAssociationsRestFinal,
					  "json": true,
					  "strictSSL": false,
					  "headers": {
							"Content-Type": "application/json",
							"Authorization": "Basic YWRtaW46YWRtaW4="
					  }
					});
				  }
				}

				var assetAssociationsResponse= await wso2grGetAssetAssociations.getAssetAssociations();
				
				console.log('assetAssociationsResponse: ',assetAssociationsResponse);

				var targetAssetAsociationType = this.getTargetAssetAsociationType(assetAsociation.type);

				console.log('targetAssetAsociationType: ',targetAssetAsociationType);
				
				if(assetAssociationsResponse.length>0){
					//vaidamos asociaciones
					var i = 0;
					for( i=0;i<assetAssociationsResponse.length;i++){						
						
						//console.log('assetAssociationsResponse[i].source: ',assetAssociationsResponse[i].source);
						//console.log('assetAssociationsResponse[i].target: ',assetAssociationsResponse[i].target);
						//console.log('assetAssociationsResponse[i].type: ',assetAssociationsResponse[i].type);
						
						//console.log('pathAsset: ',pathAsset);
						//console.log('pathTargetAsset: ',pathTargetAsset);
						//console.log('assetAsociation.type: ',assetAsociation.type);						
						
						if(assetAssociationsResponse[i].source == pathAsset &
							assetAssociationsResponse[i].target == pathTargetAsset &
							assetAssociationsResponse[i].type == assetAsociation.type){
							
							encontroAsociacionAsset = true;
						}
						
						//console.log('pathTargetAsset: ',pathTargetAsset);
						//console.log('pathAsset: ',pathAsset);
						//console.log('targetAssetAsociationType: ',targetAssetAsociationType);								
						
						if(assetAssociationsResponse[i].source == pathTargetAsset & 
							assetAssociationsResponse[i].target == pathAsset & 
							assetAssociationsResponse[i].type == targetAssetAsociationType){
							
							encontroAsociacionAssetTarget = true;
						}
						
						if(encontroAsociacionAsset & encontroAsociacionAssetTarget) break;
						
					}
					
					
				}
				
				
				
				//////////////////////////////////////////////////////////////////////////////
				
				if(!encontroAsociacionAsset){
				
					numeroAsociacionesRealizadas = numeroAsociacionesRealizadas+1;
				
					createAssetAssociationsRestFinal = createAssetAssociationsRest+"?path=" + pathAsset;
				
					console.log('createAssetAssociationsRestFinal: ',createAssetAssociationsRestFinal);
					
					wso2grCreateAssetAssociations = {

						  createAssetAssociations: function() {
							return request({
							  "method":"POST",
							  "uri": "" +createAssetAssociationsRestFinal,
							  "json": true,
							  "strictSSL": false,
							  "headers": {
									"Content-Type": "application/json",
									"Authorization": "Basic YWRtaW46YWRtaW4="
							  },
							  "body": [{
										  "type": ""+assetAsociation.type,
										  "target": ""+pathTargetAsset
									   }]
							});
						  }

					}	
					
					createAssetAssociationsResponse= await wso2grCreateAssetAssociations.createAssetAssociations();

					console.log('createAssetAssociationsResponse: ',createAssetAssociationsResponse);

				}
				
				if(!encontroAsociacionAssetTarget){

					numeroAsociacionesRealizadas = numeroAsociacionesRealizadas+1;

					createAssetAssociationsRestFinal = createAssetAssociationsRest+"?path=" + pathTargetAsset;
					
					console.log('createAssetAssociationsRestFinal: ',createAssetAssociationsRestFinal);

					wso2grCreateTargetAssetAssociations = {

						  createAssetAssociations: function() {
							return request({
							  "method":"POST",
							  "uri": "" +createAssetAssociationsRestFinal,
							  "json": true,
							  "strictSSL": false,
							  "headers": {
									"Content-Type": "application/json",
									"Authorization": "Basic YWRtaW46YWRtaW4="
							  },
							  "body": [{
										  "type": ""+targetAssetAsociationType,
										  "target": ""+pathAsset
									   }]
							});
						  }

					}
					
					
					
					createAssetAssociationsResponse= await wso2grCreateTargetAssetAssociations.createAssetAssociations();

					console.log('createTargetAssetAssociationsResponse: ',createAssetAssociationsResponse);
				
				}
				

				if(numeroAsociacionesRealizadas>0){
					
					var respuesta = {
					   error: false,
					   codigo: 0,
					   mensaje: 'Se realizaron '+numeroAsociacionesRealizadas+' asociaciones con exito'
					   
					};

				}else{
					
					var respuesta = {
					   error: false,
					   codigo: 0,
					   mensaje: 'No se realizo ninguna asociacion debido a que ya existian'
					   
					};
					
				}

				return respuesta;

			}	

		}catch(e){

		   //console.log("e.stack",e.stack);
		   console.log("e.message:",e.message);
			
		   var message = e.message;
			
		   var n = message.indexOf("-");

		   console.log("n:",n);

		   var code = message.substring(0,n-1);
		   console.log("code:",code);
		   
		   var jsonMessage = message.substring(n+2);
		   console.log("jsonMessage:",jsonMessage);
			
		   createAssetAssociationsResponse = {
			   error: true,
			   codigo: ''+code,
			   mensaje: ''+jsonMessage
		   };
		
				
				
		} finally {

			try{
				if (loginResponse.data.sessionId!=''){
					
					var wso2grLogout = {
					  
					  logout: function() {
						return request({
						  "method":"POST",
						  "uri": "" +logoutRest,
						  "json": true,
						  "strictSSL": false,
						  "headers": {
								"Cookie":"JSESSIONID="+loginResponse.data.sessionId
						  }
						});
					  }
					}
							
					var logoutResponse= await wso2grLogout.logout();
					
					console.log('logoutResponse: ',logoutResponse);

				}
			
			}catch(ex){
				
				console.log("ex.stack:",ex.stack);
				
			}
		}
		
		return createAssetAssociationsResponse;


	}
	
	async promoteDemoteLifecycleAsset(asset, nextState, comment) {

		var loginResponse = {};

		var searchAssetResponse = {};

		var promoteDemoteLifecycleAssetResponse= {};

		try{

			loginResponse = await wso2grlogin.login();
					
			console.log('loginResponse.data.sessionId: ',loginResponse.data.sessionId);
						
			var filtro = '"overview_name":"'+asset.overview_name+'"';
			
			if(	typeof asset.overview_version!=='undefined' && asset.overview_version!=''){
				filtro = filtro + ',"overview_version":"'+asset.overview_version+'"';
			}
			
			if(	typeof asset.overview_context!=='undefined' && asset.overview_context!=''){
				filtro = filtro + ',"overview_context":"'+asset.overview_context+'"';
			}			
			
			console.log('filtro: ',filtro);			
			
			var searchAssetRestFinal = searchAssetRest+"?type="+ asset.assetType+'&q='+filtro;
			
			console.log('searchAssetRestFinal: ',searchAssetRestFinal);
						
			var wso2grSearchAsset = {
			  
			  searchAsset: function() {
				return request({
				  "method":"GET",
				  "uri": "" +searchAssetRestFinal,
				  "json": true,
				  "strictSSL": false,
				  "headers": {
						"Content-Type": "application/json",
						"Cookie":"JSESSIONID="+loginResponse.data.sessionId
				  }
				});
			  }
			}	

			searchAssetResponse= await wso2grSearchAsset.searchAsset();
			
			console.log('searchAssetResponse: ',searchAssetResponse);
			
			if( searchAssetResponse.count != 1){
				
				if(searchAssetResponse.count > 1){

				    var respuesta = {
					   error: true,
					   codigo: 602,
					   mensaje: 'La busqueda de asset obtuvo mas de un resultado. Afine mejor su busqueda.'
				    };

					return respuesta
				
				}else{
					
				    var respuesta = {
					   error: true,
					   codigo: 601,
					   mensaje: 'La busqueda de asset no obtuvo ningun resultado. Valide si el asset existe.'
				    };

					return respuesta
					
				}
			}
			
			
			
			
			var idAsset =searchAssetResponse.list[0].id;
			
			console.log('idAsset: ',idAsset);
			
			var promoteDemoteLifecycleAssetRestFinal = promoteDemoteLifecycleAssetRest+'/'+idAsset+"/state?type=" + asset.assetType;
			
			console.log('promoteDemoteLifecycleAssetRestFinal: ',promoteDemoteLifecycleAssetRestFinal);
			
			var wso2grPromoteDemoteLifecycleAsset = {};
			
			console.log('asset.overview_newname: ',asset.overview_newname);
			console.log('asset.overview_newcontext: ',asset.overview_newcontext);
			
			wso2grPromoteDemoteLifecycleAsset = {

				  promoteDemoteLifecycleAsset: function() {
					return request({
					  "method":"POST",
					  "uri": "" +promoteDemoteLifecycleAssetRestFinal,
					  "json": true,
					  "strictSSL": false,
					  "headers": {
							"Content-Type": "application/json",
							"Cookie":"JSESSIONID="+loginResponse.data.sessionId
					  },
					  "form": {
						"nextState":""+nextState,
						"comment": ""+comment
					  }
					});
				  }

			}	

				
			
			promoteDemoteLifecycleAssetResponse= await wso2grPromoteDemoteLifecycleAsset.promoteDemoteLifecycleAsset();

			console.log('promoteDemoteLifecycleAssetResponse: ',promoteDemoteLifecycleAssetResponse);
				

		}catch(e){

		   //console.log("e.stack",e.stack);
		   console.log("e.message:",e.message);
			
		   var message = e.message;
			
		   var n = message.indexOf("-");

		   console.log("n:",n);

		   var code = message.substring(0,n-1);
		   console.log("code:",code);
		   
		   var jsonMessage = message.substring(n+2);
		   console.log("jsonMessage:",jsonMessage);
			
		   promoteDemoteLifecycleAssetResponse = {
			   error: true,
			   codigo: ''+code,
			   mensaje: ''+jsonMessage
		   };
		
				
				
		} finally {

			try{
				if (loginResponse.data.sessionId!=''){
					
					var wso2grLogout = {
					  
					  logout: function() {
						return request({
						  "method":"POST",
						  "uri": "" +logoutRest,
						  "json": true,
						  "strictSSL": false,
						  "headers": {
								"Cookie":"JSESSIONID="+loginResponse.data.sessionId
						  }
						});
					  }
					}
							
					var logoutResponse= await wso2grLogout.logout();
					
					console.log('logoutResponse: ',logoutResponse);

				}
			
			}catch(ex){
				
				console.log("ex.stack:",ex.stack);
				
			}
		}
		
		return promoteDemoteLifecycleAssetResponse;


	}
	
	getTargetAssetAsociationType(type){
		
		var targetAssetAsociationType = '';
		
		switch(type) {
		  case 'depends':
			targetAssetAsociationType = 'usedBy';
			break;
		  case 'usedBy':
			targetAssetAsociationType = 'depends';
			break;
		  case 'owns':
			targetAssetAsociationType = 'ownedBy';
			break;
		  case 'ownedBy':
			targetAssetAsociationType = 'owns';
			break;
		  case 'security':
			targetAssetAsociationType = 'secures';
			break;
		  case 'secures':
			targetAssetAsociationType = 'security';
			break;
		  default:
			targetAssetAsociationType = 'undefined';
		}
		
		return targetAssetAsociationType;
	}
	
}

module.exports = {
  GovernaceRegistryCoreBusiness160K: GovernaceRegistryCoreBusiness160K
}