
class Asset {
   
   constructor(assetType, overview_name, overview_version, overview_context, overview_newname, overview_newcontext) {
	   
		this.assetType = assetType;
		this.overview_name = overview_name;
		this.overview_version = overview_version;
		this.overview_context = overview_context;
		this.overview_newname = overview_newname;
		this.overview_newcontext = overview_newcontext;

   }  
   
}

class AssetAsociation {
   
   constructor(asset, type, assetTarget) {
	   
		this.asset = asset;
		this.type = type;
		this.assetTarget = assetTarget;

   }  
   
}

module.exports = {
  Asset: Asset,
  AssetAsociation: AssetAsociation
}
