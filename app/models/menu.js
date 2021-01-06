const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating Schema
const menuSchema = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true}, // We never keep raw img or raw data in database but we keep the img/data in storage and give its path or url 
    price: {type: Number, required: true},
    size: {type: String, required: true}
}) 

// Creating model after schema
const Menu = mongoose.model('Menu', menuSchema)

module.exports = Menu