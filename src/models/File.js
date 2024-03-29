const mongoose = require("mongoose");

const File = new mongoose.Schema({ //definindo o schema no mongodb
    title: {
        type: String,
        required: true,
    },
    path:{ // Nome do arquivo físico armazenado na aplicação
        type: String,
        required:true
    },
},{
    timestamps: true, // Cria campos mostrando create and updated
    toObject: {virtuals: true},
    toJSON: {virtuals: true},
    });

File.virtual('url').get(function(){
    const url = process.env.URL || 'http://localhost:3333'
    return `${url}/files/${encodeURIComponent(this.path)}`;
})

module.exports = mongoose.model('File', File);