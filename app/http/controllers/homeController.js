const Menu = require('../../models/menu')

function homeController() {
    return {
        async index(req, res){
            const pizzas = await Menu.find() // get all the 
            return res.render('home', {pizzas : pizzas}) // 1st is key and 2nd is  received from database
        }
    }
}

module.exports = homeController