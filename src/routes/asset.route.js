//  Assets ROUTES
const assetRouter = require('express').Router();
const {getAllAssets, getAssetById, createAsset, deleteAsset, updateAsset, getAssetsByEmployeeId} = require ('../controllers/asset.controller');
assetRouter.get("/", getAllAssets)
assetRouter.post('/create', createAsset)//CREATE SOBRE LA BARRA /SIN TEXTO--> VER MEJORES PRACTICAS-...PARA PENSAR.
assetRouter.delete('/:id_asset', deleteAsset)
assetRouter.put('/:id_asset', updateAsset)
assetRouter.get('/:id_asset', getAssetById)
assetRouter.get('/employee/:id_employee', getAssetsByEmployeeId);

 module.exports = assetRouter;