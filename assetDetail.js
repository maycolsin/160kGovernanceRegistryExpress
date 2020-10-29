
class AssetDetail {
   
   constructor(assetType, overview_name, overview_version, overview_context) {
	   
		this.assetType = assetType;
		this.overview_name = overview_name;
		this.overview_version = overview_version;
		this.overview_context = overview_context;


   }   

 
}

module.exports = {
  AssetDetail: AssetDetail
}
