function productController() {
    return {
        detail(req, res) {
            res.render('product/productDetails')
        }
    }
}

module.exports = productController