const Box = require('../models/Box');

class BoxController{
    async store(req, res){// Permite que o usuário crie novas pastas dentro da aplicação
        const box = await Box.create({title: req.body.title}) //async await

        return res.json(box);
    }

async show(req, res){
        const box = await Box.findById(req.params.id).populate({
            path: 'files',
            options: {sort: {createdAt: -1}}
        });

        return res.json(box);
    }
}

module.exports = new BoxController(); //new para devolver a instancia de uma classe e poder acessar os metodos

// Caso new n seja usado, vou exportar a própria classe e não sua instancia.