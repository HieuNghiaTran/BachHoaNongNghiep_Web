
import { Modal } from "antd";
import { Editor } from "draft-js";
import { useEffect, useState } from "react";
import getAllCategory from "../services/categoryServices";
import getAllColecion from "../services/collectionsServices";
import { addNewProduct, deleteProduct } from "../services/productSevices";
import { toast } from "react-toastify";
import { deleteOrder } from "../services/orderServies";

const ModalDelete = (props) => {
    const { isModalVisible, handleCloseModal, product, order } = props
    
    const handleSubmit = async () => {
        if(product){
            let res =await deleteProduct(product._id)
            handleCloseModal()
            toast.success("Delete Success")



        }else{
            let res =await deleteOrder(order);
            console.log(res)
            handleCloseModal()
            toast.success("Delete Success")
            window.location.reload()

        }
    }


    return (
        <>


            <Modal
                title=""
                visible={isModalVisible}
                onClose={handleCloseModal}
                onOk={handleSubmit}
                onCancel={handleCloseModal}

            >
                <div>
                    <p style={{fontWeight:"bold"}}>Bạn có chắc chắn muốn xoá không hả ?</p>

                </div>
            </Modal>


        </>



    )



}

export default ModalDelete