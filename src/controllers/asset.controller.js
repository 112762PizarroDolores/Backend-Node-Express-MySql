//IMPORT DEPENDENCIAS & LIB

const connectiondb = require("../config/db.config");
const conexion = require("../config/db.config");
const AssetsModel = require("../models/asset.model");
const EmployeesModel = require("../models/employee.model");
const HttpError = require('../utils/manejoError');

//GET ALL ASETS con paginacioón

const getAllAssets = async (req, res, next) => {
  try{

    const {
      name,
      type,
      code,
      marca,
      description,
      purchase_date,
      id_employee,
      direction = "ASC",//Puedo desde la url, param din, cambiarlo a desc
      page = 1,
      limit,
    } = req.query;
  
    let where = "";
    let ordenar = "ORDER BY id_asset ";
    let limite = "";
  
    //3 FILTRADO
    if (name || type || code || marca || description || purchase_date || id_employee) {
       where = "WHERE 1";
  
      if (name) {
        where += ` AND name='${name}'`;
      }
      if (type) {
        where += ` AND type='${type}'`;
      }
      if (code) {
        where += ` AND code='${code}'`;
      }
      if (marca) {
        where += ` AND marca='${marca}'`;
      }
      if (description) {
        where += ` AND description='${description}'`;
      }
      if (purchase_date) {
        where += ` AND purchase_date='${purchase_date}'`;
      }
      if (id_employee) {
        where += ` AND id_employee=${id_employee}`;
      }
      
    }
    limite = `LIMIT 25`;
    //QUERY PARA EL GET CON TODOS LOS PARAMS PARA FILTRAR, ORDENAR Y PAGINAR
    const assets = await AssetsModel.getAllAssets(
      where,
      ordenar+direction,
      limite
    );
    res.json({ data: assets });
  }catch (err) {
    const error = new HttpError(
      'The operation "Get all assets" failed, please try again later.',
      500
    );
    return next(error);
  }

};


//CREATE ASSET
const createAsset = async (req, res, next) => {
  try{
    const id_employee= req.body.id_employee;
    if(id_employee)
    {  
      //1) compruebo si existe el id_employee pasado por el body en mi bd
      const employee=await EmployeesModel.getEmployeeById(id_employee)
    //si no existe no lo dejes continuar y devolveme un msj de error
      if(!employee) {
        return res.json({message:'the employee whose you want insert doesnt exists, please review.', code: 404});
      }
      
    }
    //extraigo cuerpo del asset
  const values = { ...req.body };
  const result = await AssetsModel.createAsset(values);
  console.log(result);
  res.status(201).json({ message: "The operation 'Create Asset' was successfully", data: result });
  }catch(err){
    const error = new HttpError(
      'The operation "Create asset" failed, please try again later.',
      500
    );
    return next(error);
  
    }
};


//DELETE ASSET
const deleteAsset = async (req, res, next) => {
  try{

   //extraigo el id del asset a ELIMINAR
   const id_asset= req.params.id_asset;
   //existe el asset pasado por la url?
   const asset=await AssetsModel.getAssetById(id_asset)
 //si no existe no lo dejes continuar y devolveme un msj
   if(!asset) {
     return res.json({message:'the asset whose you want to delete doesnt exists', code: 404});
   }

  const result = await AssetsModel.deleteAsset(id_asset);
  res.status(200).json({ message: "the asset was deleted succesfully!" }); 
  }
  catch(err){
    const error = new HttpError(
      'The operation "Delete asset" failed, please try again later.',
      500
    );
    return next(error);
  
    }
};


//UPDATE ASSET
const updateAsset = async (req, res, next) => {
  try{
    //extraigo el id del asset a actualizar
  const assetId= req.params.id_asset;
  //existe el asset pasado por la url en mi bd? ASSET=DATO EN BD/VIEJO
  const asset=await AssetsModel.getAssetById(assetId)
//si no existe no lo dejo continuar y devolveme un msj
  if(!asset) {
    return res.json({message:'the asset does not exists', code: 404});
  }
//EMPIEZA LO NUEVO PARA VER SI EXISTE EL ID_EMPLOYEE EN CASO DE QUE ESO QUIERAN EDITAR
//HACER IF QUE DIGA QUE SI EN EL BODY de la REQ LLEGA EM CAMPO ID_EMPLOYEE, ENTONCES : 
const id_employee= req.body.id_employee;
if(id_employee)
{  
  //1) compruebo si existe el id_employee pasado por el body en mi bd
  const employee=await EmployeesModel.getEmployeeById(id_employee)
//si no existe no lo dejes continuar y devolveme un msj de error
  if(!employee) {
    return res.json({message:'the employee whose you want insert doesnt exists, please review.', code: 404});
  }
  
}
//TERMINA LO NUEVO
   const values = { ...req.body };
  const result=await AssetsModel.updateAsset(asset,values);
  res.status(200).json({result, message:'the asset was updated succesfully!', result})
 
 //AGREGE LLAVE AHORA SI NO ANDA EL CODIGO QUITAR ESTO Y LO QUE ESTA ENTRE EMPIEZA Y TERMINA
}
 catch(err){
  const error = new HttpError(
    'The operation "Update asset" failed, please try again later.',
    500
  );
  return next(error);

  }
};


//GET ASSET BY ID
const getAssetById = async (req, res, next) => {
try{

   //extraigo el id del asset a traer
   const id_asset= req.params.id_asset;
   //existe el asset pasado por la url?
   const asset=await AssetsModel.getAssetById(id_asset)
 //si no existe no lo dejes continuar y devolveme un msj
   if(!asset) {
     return res.json({message:'the asset whose you want to get does not exists', code: 404});
   }
  res
    .status(200)
    .json({ data: asset, message: `reading the asset with id: ${id_asset}` });
}catch(err){
  const error = new HttpError(
    'The operation "Get assets by Id" failed, please try again later.',
    500
  );
  return next(error);

  }
};


//GET ASSETS BY EMPLOYEE ID
const getAssetsByEmployeeId = async (req, res, next) => {
try{  
  //extraigo el id del empleado cuyos assets asociados quiero traer
  const id_employee = req.params.id_employee;
  //existe el asset pasado por la url?
  const emp=await EmployeesModel.getEmployeeById(id_employee)
//si no existe no lo dejes continuar y devolveme un msj
  if(!emp) {
    return res.json({message:'The assets what you want get are associating an employee who does not exist. Review the id_employee', code: 404});//404
  }

  //extraigo el id del EMPLEDO pasado como param dinámico en ruta, cuyos assets asociados quiero ENCONTRAR

  let employeeWithAssets;
  employeeWithAssets = await AssetsModel.getAssetsByEmployeeId(id_employee);
 

  if(employeeWithAssets==0)
  {
    return res.json({ message: 'The employee have not any asset' }); 
  }
    res.status(200).json({ data: employeeWithAssets });
}
catch(err){
  const error = new HttpError(
    'The operation "Get assets by EmployeeId" failed, please try again later.',
    500
  );
  return next(error);

  }
};


//EXPORT
module.exports = {
  getAllAssets: getAllAssets,
  createAsset: createAsset,
  deleteAsset: deleteAsset,
  updateAsset: updateAsset,
  getAssetById: getAssetById,
  getAssetsByEmployeeId: getAssetsByEmployeeId,
};
