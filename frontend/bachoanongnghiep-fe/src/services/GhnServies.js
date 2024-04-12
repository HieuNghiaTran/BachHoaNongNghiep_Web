import axios from "axios";

const CreateOrderShip =  (name,phone, address, cod, product) => {

        return axios.post(
            'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create',
            {
                
                
                    "payment_type_id": 2,
                    "note": "Tintest 123",
                    "required_note": "KHONGCHOXEMHANG",
                    "return_phone": "0332190158",
                    "return_address": "39 NTT",
                    "return_district_id": null,
                    "return_ward_code": "",
                    "client_order_code": "",
                    "from_name": "Cửa hàng BHNN",
                    "from_phone": "0987654321",
                    "from_address": "Quận Ninh Kiều - Can Tho",
                    "from_ward_name": "Phường Hung Loi",
                    "from_district_name": "Quận Ninh Kiều",
                    "from_province_name": "Cần Thơ",
                    "to_name": name,
                    "to_phone": phone,
                    "to_address": address,
                    "to_ward_name": "Phường 14",
                    "to_district_name": "Quận 10",
                    "to_province_name": "HCM",
                    "cod_amount": 200000,
                    "content": "Theo New York Times",
                    "weight": 200,
                    "length": 1,
                    "width": 19,
                    "height": 10,
                    "cod_failed_amount": 2000,                  
                    "pick_station_id": 1444,
                    "deliver_station_id": null,
                    "insurance_value": 23000,
                    "service_id": 0,
                    "service_type_id":2,
                    "coupon":null,
                    "pickup_time":1692840132,
                    "pick_shift":[2],
                    "items":product
                
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'ShopId': '4951815',
                    'Token': '787e0e23-e0e7-11ee-8529-6a2e06bbae55',
                }
            }
        );
        

   
};


const hanldeCreateShip=(data)=>{

return axios.post("http://localhost:8001/delivery",data)


}

export  {CreateOrderShip, hanldeCreateShip};
