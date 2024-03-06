
import { Modal, Table } from "antd";

import { useEffect, useState } from "react";
import { getDetailOrder } from "../services/orderServies";


const ModalDetailOrder = (props) => {
    const { isModalVisible, handleCloseModal, id_order,ship } = props
    const [detailOrder, setDetailOrder] = useState([]);


    const fetchData = async (id) => {
        let res = await getDetailOrder(id);
        setDetailOrder(res.data[0].product);


    }


    useEffect(() => {
        if (isModalVisible) {

            fetchData(id_order);

        }
    }, [id_order])



    const dataSource = detailOrder && detailOrder.length > 0 && detailOrder.map((item, index) => ({
        key: index,
        name: item.name_product,
        price: item.price_product,
        quantity: item.count,
        total: item.price_product * item.count,
    }));

    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giá thành',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Số Lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Thành tiền',
            dataIndex: 'total',
            key: 'total',
        },
    ];


    return (
        <>


            <Modal
                title="Thông tin sản phẩm đơn hàng"
                visible={isModalVisible}
                onClose={handleCloseModal}
                onOk={handleCloseModal}
                onCancel={handleCloseModal}
                width={900}
            >
                <div>
                    <Table dataSource={dataSource} columns={columns} />


                    <div style={{ fontWeight: "bold" }} className="text-center">Phí giao hàng: <span style={{ color: "red", fontSize: "1.2rem" }} className="mx-2">{ship} đ</span>    </div>

                    <div style={{ fontWeight: "bold" }} className="text-center">Tổng cộng đơn hàng: <span style={{ color: "red", fontSize: "1.2rem" }} className="mx-2">{detailOrder.reduce((acc, item) => (acc + item.price_product * item.count), 0)+ship} đ</span>    </div>





                </div>

            </Modal>


        </>



    )



}

export default ModalDetailOrder