import { Modal } from "antd";
import { useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import Form from 'react-bootstrap/Form';
import { updateStatusOrder } from "../services/orderServies";


const ModalUpdateStatusOrder = (props) => {
    const { isModalVisible, handleCloseModal, id, status } = props
    const [isShowEdit, setIsShowEdit] = useState(false)
    const [value, setValue] = useState()


    const handleSubmit = async () => {

        let data = {
            id: id,
            status: value
        }

        let res = await updateStatusOrder(data)
        console.log(res.data)
        alert("Thành Công")
        handleCloseModal()

    }



    return (

        <>
            < Modal
                title=""
                visible={isModalVisible}
                onClose={handleCloseModal}
                onOk={handleSubmit}
                onCancel={handleCloseModal}

            >
                <div className="text-center  mt-2 mb-3" >
                    <h4 className="fw-bold">Cập nhật trạng thái đơn hàng</h4>
                </div>
                <div className="fw-bold">Mã đơn hàng: <span className="m-2">{id}</span></div>
                <div className="fw-bold mt-3">Trạng thái: <span className="m-2">

                    {status === "Đã đặt hàng" && (<><span className="" style={{ color: "red" }}>Đã đặt hàng</span></>)}
                    {status === "Đang vận chuyển" && (<><span style={{ color: "yellow" }}>Đang vận chuyển</span></>)}
                    {status === "Đã giao hàng" && (<><span style={{ color: "green" }}>Đã giao hàng</span></>)}




                </span>
                    <BiSolidEditAlt className="mx-1" style={{ fontSize: "1.3rem" }} onClick={() => { setIsShowEdit(!isShowEdit) }} />



                </div>
                {isShowEdit && (
                    <div className="mt-2">
                        <Form.Select aria-label="Default select example" value={value} onChange={(e) => { setValue(e.target.value) }} >
                            <option value="Đã đặt hàng">Đã đặt hàng</option>
                            <option value="Đang giao hàng">Đang giao hàng</option>
                            <option value="Đã giao hàng">Đã giao hàng</option>
                        </Form.Select>

                    </div>



                )}





            </Modal >



        </>


    )

}

export default ModalUpdateStatusOrder