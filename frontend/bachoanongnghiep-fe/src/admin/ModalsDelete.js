
import { Modal } from "antd";
import { Editor } from "draft-js";
import { useEffect, useState } from "react";
import getAllCategory from "../services/categoryServices";
import getAllColecion from "../services/collectionsServices";
import { addNewProduct, deleteProduct } from "../services/productSevices";
import { toast } from "react-toastify";

const ModalDelete = (props) => {
    const { isModalVisible, handleCloseModal, product } = props
    
    const handleSubmit = async () => {
        let res =await deleteProduct(product._id)
        console.log(res)
        handleCloseModal()
        toast.success("Delete Success")
    }

    useEffect(()=>{



    },[product])


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