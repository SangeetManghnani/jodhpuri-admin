const productController = require('./controllers/ProductController');
const categoryController = require('./controllers/CategoryController');

module.exports = function(router) {
    router.route('/products')
        .post((req, res, next) => {
            productController.createProduct(req, res);
        })
        .get((req, res, next) => {
            productController.getAllProducts(req, res);
        })
        .all((req, res, next) => {
            return res.send('Allowed methods are: POST, GET');
        });

    router.route('/products/:productId')
        .put((req, res, next) => {
            productController.createProduct(req, res);
        })
        .get((req, res, next) => {
            productController.getAllProducts(req, res);
        })
        .delete((req, res, next) => {
            productController.deleteProductWithId(req.params.productId, res);
        })
        .all((req, res, next) => {
            return res.send('Allowed methods are: PUT, GET, DELETE');
        });

    router.route('/category')
        .post((req, res, next) => {
            categoryController.createCategory(req, res);
        })
        .get((req, res, next) => {
            categoryController.getAllCategories(req, res);
        })
        .all((req, res, next) => {
            return res.send('Allowed methods are: POST, GET');
        });
}