//  Assets
const assetRouter = require('express').Router();
const {findAllAssets, findAssetById, createAsset, deleteAsset, updateAsset} = require ('../controllers/asset.controller');
assetRouter.get("/", findAllAssets)
assetRouter.post('/create', createAsset)//CREATE SOBRE LA BARRA /SIN TEXTO--> VER MEJORES PRACTICAS-...PARA PENSAR.
assetRouter.delete('/:id_asset', deleteAsset)
assetRouter.put('/:id_asset', updateAsset)

assetRouter.get('/:id_asset', findAssetById)
 module.exports = assetRouter;