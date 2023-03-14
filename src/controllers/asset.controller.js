//CRUD
//CRUD
const connectiondb = require('../config/db.config');
const conexion= require ('../config/db.config');
const AssetsModel= require('../models/asset.model');
// const HttpError = require('../utils/manejoError');//DOLO VER!!!


//obtener assets

const obtenerAssets= async (req,res)=>{
    const assets = await AssetsModel.findAllAssets();
    res.json({data: assets});
};

//CREATE
const createAsset = async (req, res) => {
// try {
  
  const values =  {...req.body};
  const result = await AssetsModel.createAsset(values)
  console.log(result)
  res.status(201).json({ data: result });

// } catch (error) {
  // const CustomError = new HttpError(
  //   "Fetching asset failed, please try again later.",
  //   500
  // );
  // res.json({ errorMessage: CustomError.message, CustomError });
}

// };


//DELETE!
const deleteAsset = async (req, res) => {
//extraigo el id del asset a borrar
const id_asset=req.params.id_asset;
const result = await AssetsModel.deleteAsset(id_asset)
res.status(200).json({ message: 'the asset was deleted succesfully!' });//DOLO REVISA EL ESTADO!!!
} 

//UPDATE
const updateAsset = async (req, res) => {
  //extraigo el id y body del asset a actualizar
  const values =  {...req.body};
      const id_asset=req.params.id_asset;
    //llamo a la funcion de mi model para hacer el update
  const result = await AssetsModel.updateAsset(id_asset, values)
  res.status(200).json({ message: 'the asset was updated succesfully!', result });//DOLO REVISA EL ESTADO!!!
  }
  //FIND BY ID
const findAssetById = async (req, res) => {
  //extraigo el id del asset a borrar
  const id_asset=req.params.id_asset;
  const asset = await AssetsModel.findById(id_asset)
  res.status(200).json({data: asset, message: `reading the asset with id: ${id_asset}` });
  } 
  
  //EXPORT

     module.exports={
    findAllAssets: obtenerAssets,
    createAsset:createAsset,
    deleteAsset: deleteAsset,
    updateAsset: updateAsset,
    findAssetById: findAssetById
}