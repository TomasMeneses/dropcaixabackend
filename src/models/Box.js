const mongoose = require("mongoose");

const Box = new mongoose.Schema({ //definindo o schema no mongodb
    title: {
        type: String,
        required: true,
    },
    files: [{ // Uma pasta(box) pode ter vários arquivos(File) 1-n
        type: mongoose.Schema.Types.ObjectId, ref: "File"        
    }
    ]
},{
    timestamps: true // Cria campos mostrando create and updated
    });

module.exports = mongoose.model('Box', Box);