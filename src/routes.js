const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const BoxController = require('./controller/BoxController');
const FileController = require('./controller/FileController');

routes.post("/boxes", BoxController.store);
routes.get("/boxes/:id", BoxController.show);
routes.post(
    "/boxes/:id/files",
    multer(multerConfig).single('file'),
    FileController.store
); //dentro de .single() passar o nome do arquivo que o frontend vai enviar

module.exports = routes; // Exporta uma informação do arquivo.