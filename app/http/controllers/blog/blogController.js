function blogController() {
    return {
        index(req, res) {
            res.render('blog/cakeblog')
        }
    }
}

module.exports = blogController