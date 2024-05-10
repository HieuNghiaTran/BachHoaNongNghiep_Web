export const ROUTER = {
    USER: {
        Home: "/trang-chu",
        My_Order:"/my-order",
        Product: "/product/:id",
        Cart: "/cart",
        Result: "/search/:value",
        ProductWithCatory: "/collections/:category_id",
        SubmitOrder: "/checkouts/:id",
        Location: "/page/location",
        SuccessOrder:"/order/success",
        FailOrder:"/order/fail"

    },

    ADMIN: {
        Home: "/admin/dashboard",
        Product_Manager: "/admin/products",
        Order_Manager: "/admin/orders",
        Login:"/admin/login",
        Chat:"/admin/chat"


    }

}