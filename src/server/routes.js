const productController = require('./controllers/ProductController');
const categoryController = require('./controllers/CategoryController');

module.exports = function(router) {
    router.route('api/v1/products')
        .post((req, res, next) => {
            productController.createProduct(req, res);
        })
        .get((req, res, next) => {
            productController.getAllProducts(req, res);
        })
        .all((req, res, next) => {
            return res.send('Allowed methods are: POST, GET');
        });

    router.route('api/v1/products/:productId')
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

    router.route('api/v1/category')
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