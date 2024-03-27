const express = require('express');
const {userController, AdminUserController} = require('../controllers/userController');
const productController = require('../controllers/productsController');
const cartController = require('../controllers/cardController');
const CategoryController = require('../controllers/categoryController');
const ColectionController = require('../controllers/colectionController');
const OrderController = require('../controllers/orderController');
const Detail_order = require('../controllers/detail_orderController');
const PaymentCotroller = require('../controllers/paymentController');
const PermissionController = require('../controllers/permissionController');
const router= express.Router();



router.post("/user", userController.addUser);
router.get("/user", userController.getAllUser);
router.get("/user/detail/login", userController.getDetailUser);
router.get("/user/detail", userController.getAUser);




router.post("/admin/user",AdminUserController.create);
router.get("/admin/login",AdminUserController.login);



router.get("/product", productController.getAllProducts);
router.get("/pageginateProductCategory", productController.PageginateProductWithCategory);
router.get("/product/getwithpage", productController.PageginateProduct);
router.get("/product/:id", productController.detailProduct);
router.post("/product", productController.newProductAdmin);
router.get("/product/search/:value", productController.getProductWithSearch);
router.get("/products/:id_category", productController.getWithCategory);
router.delete("/product/:id", productController.deleteProduct);
router.put("/product/:id", productController.updateProduct);
router.put("/products/review", productController.createProductReview);
router.get("/productsHodeal", productController.getProductHotDeal)


router.post("/cart", cartController.addCart);
router.get("/cart", cartController.getAllCart);

router.get("/category", CategoryController.getAllCategory);
router.get("/category/:id",CategoryController.getNameCategory)
router.post("/category", CategoryController.addCategory);


router.get("/collection/:id_category", ColectionController.getAllColecion);
router.post("/collection", ColectionController.addCollection);


router.post("/order",OrderController.submitOrder)
router.get("/myorder",OrderController.getOrderCustormer)
router.get("/order",OrderController.getAllOrder)
router.get("/orderwithphone",OrderController.getOrderWithPhoneNumber)
router.delete("/order/:id", OrderController.delete_Order)

router.get("/order_detail/:id",Detail_order.detail)
router.get("/All_order_detail",Detail_order.getAlldetail)
router.post("/order_detail",Detail_order.post_detail_order)




router.post("/permission",PermissionController.create)
router.get("/permission",PermissionController.getAll)



router.post('/create_payment_url', PaymentCotroller.createPaymentUrl)
router.get('/payment/get_result', PaymentCotroller.vnpayReturn)


module.exports = router