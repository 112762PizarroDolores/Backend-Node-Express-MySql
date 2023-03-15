//IMPORT DEPENDENCIAS & LIB

const connectiondb = require("../config/db.config");
const conexion = require("../config/db.config");
const AssetsModel = require("../models/asset.model");
const EmployeesModel = require("../models/employee.model");

//GET ALL ASETS con paginacioón

const getAllAssets = async (req, res) => {
  const page = req.query.page || 1; // página actual
  const limit = 3; // límite de elementos por página
  const offset = (page - 1) * limit; // offset para la consulta
  const assets = await AssetsModel.getAllAssets(limit, offset);
  res.json({ data: assets });
};

//CREATE ASSET
const createAsset = async (req, res) => {
  //extraigo cuerpo del asset
  const values = { ...req.body };
  const result = await AssetsModel.createAsset(values);
  console.log(result);
  res.status(201).json({ data: result });
};

//DELETE ASSET
const deleteAsset = async (req, res) => {
  //extraigo el id del asset a borrar
  const id_asset = req.params.id_asset;
  const result = await AssetsModel.deleteAsset(id_asset);
  res.status(200).json({ message: "the asset was deleted succesfully!" }); //DOLO REVISA EL ESTADO!!!
};

//UPDATE ASSET
const updateAsset = async (req, res) => {
  //extraigo el id y body del asset a actualizar
  const values = { ...req.body };
  const id_asset = req.params.id_asset;
  //llamo a la funcion de mi model para hacer el update
  const result = await AssetsModel.updateAsset(id_asset, values);
  res
    .status(200)
    .json({ message: "the asset was updated succesfully!", result }); //DOLO REVISA EL ESTADO!!!
};

//GET ASSET BY ID
const getAssetById = async (req, res) => {
  //extraigo el id del asset a encontrar
  const id_asset = req.params.id_asset;
  const asset = await AssetsModel.getAssetById(id_asset);
  res
    .status(200)
    .json({ data: asset, message: `reading the asset with id: ${id_asset}` });
};

//GET ASSETS BY EMPLOYEE ID
const getAssetsByEmployeeId = async (req, res) => {
  //extraigo el id del EMPLEDO pasado como param dinámico en ruta, cuyos assets asociados quiero ENCONTRAR
  const id_employee = req.params.id_employee;
  let employeeWithAssets;
  employeeWithAssets = await AssetsModel.getAssetsByEmployeeId(id_employee);
  res.json({ data: employeeWithAssets });
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
