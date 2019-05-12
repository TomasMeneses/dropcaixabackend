const multer = require('multer');
const path = require('path');
const crypto = require('crypto'); // Serve para gerar conjuntos de caracteres unicos

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp'),
    storage: multer.diskStorage({// Armazena os documentos upados no PC
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp'));
        },
        filename: (req, file, cb) =>{ // Callback basicamente avisa se deu certo ou nao
            crypto.randomBytes(16, (err, hash) =>{
                if(err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, file.key);
            }) 
        }
    })
};