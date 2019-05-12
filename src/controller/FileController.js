const Box = require('../models/Box');
const File = require('../models/File');


class FileController{
    async store(req, res){// Permite que o usuário crie novas pastas dentro da aplicação
        // Criando um arquivo

        const box = await Box.findById(req.params.id);

        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key,
        });

        box.files.push(file); // box pode ser tratado como array
        
        await box.save();
        
        req.io.sockets.in(box._id).emit('file', file);

        return res.json(file);
    }
}

module.exports = new FileController(); //new para devolver a instancia de uma classe e poder acessar os metodos

// Caso new n seja usado, vou exportar a própria classe e não sua instancia.