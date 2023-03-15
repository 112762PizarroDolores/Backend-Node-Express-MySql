//  Assets ROUTES
const assetRouter = require('express').Router();
const {validateCreateAsset,validateUpdateAsset, validateIdAsset}=require("../middlewares/validatorAssets")
const {getAllAssets, getAssetById, createAsset, deleteAsset, updateAsset, getAssetsByEmployeeId} = require ('../controllers/asset.controller');

assetRouter.get("/", getAllAssets)
assetRouter.post('/create', validateCreateAsset, createAsset)//CREATE SOBRE LA BARRA /SIN TEXTO--> VER MEJORES PRACTICAS-...PARA PENSAR.
assetRouter.delete('/:id_asset', validateIdAsset, deleteAsset)
assetRouter.put('/:id_asset', validateIdAsset, validateUpdateAsset, updateAsset)
assetRouter.get('/:id_asset', validateIdAsset, getAssetById)
assetRouter.get('/employee/:id_employee', validateIdAsset, getAssetsByEmployeeId);

 module.exports = assetRouter;