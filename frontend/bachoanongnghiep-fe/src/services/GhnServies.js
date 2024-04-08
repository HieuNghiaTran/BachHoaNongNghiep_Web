import axios from "axios";

const CreateOrderShip =  () => {

        return axios.post(
            'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create',
            {
                "payment_type_id": 2,
                "note": "Tintest 123",
                "required_note": "KHONGCHOXEMHANG",
                "return_phone": "0332190158",
                "return_address": "39 NTT",
                "return_district_id": null,
                "return_ward_code": "",
                "client_order_code": "",
                "to_name": "TinTest124",
                "to_phone": "0987654321",
                "to_address": "72 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Vietnam",
                "to_ward_code": "20308",
                "to_district_id": 1444,
                "cod_amount": 200000,
                "content": "Theo New York Times",
                "weight": 200,
                "length": 1,
                "width": 19,
                "height": 10,
                "cod_failed_amount": 2000,
                "pick_station_id": 1444,
                "deliver_station_id": null,
                "insurance_value": 10000000,
                "service_id": 0,
                "service_type_id": 2,
                "coupon": null,
                "pick_shift": [2],
                "items": [
                    {
                        "name": "Áo Polo",
                        "code": "Polo123",
                        "quantity": 1,
                        "price": 200000,
                        "length": 12,
                        "width": 12,
                        "weight": 1200,
                        "height": 12,
                        "category": {
                            "level1": "Áo"
                        }
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'ShopId': '885',
                    'Token': '285518-c4bb-11ea-be3a-f636b1deefb9',
                }
            }
        );

   
};

export default CreateOrderShip;
