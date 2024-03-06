import { MdDelete } from "react-icons/md";
import Table from 'react-bootstrap/Table';
import { TfiWrite } from "react-icons/tfi";
import { useState } from "react";
import ModalEditProduct from "./ModalsEditProduct";
import ModalDelete from "./ModalsDelete";
const TableProduct = (props) => {
  const { product } = props
  const [temp,setTemp]=useState({})
  const [isShowModalEdit, setIsShowModalEdit] = useState(false)
  const [isShowModalDelete, setIsShowModalDelete] = useState(false)

  const CloseModal = () => {
    setIsShowModalEdit(false)
    setIsShowModalDelete(false)
  }

  return (<>



    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Mã sản phẩm</th>
          <th>Ảnh sản phẩm</th>
          <th>Tên sản phẩm</th>
          <th>Giá</th>
          <th>Số lượng còn lại</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {product && product.length > 0 && product.map((item, index) => (
          <tr key={index}>
            <td>{item.product_id}</td>
            <td>{<img src={item.images[0].url} className="" style={{ width: '6rem' }}></img>}</td>
            <td>{item.name_product}</td>
            <td style={{ color: "red", fontWeight: "bolder" }}>{item.price_product}đ</td>
            <td>{item.stock}</td>
            <td>
              <button type="button" class="btn btn-success mx-2" onClick={()=>{
                
                setTemp(item)
                setIsShowModalEdit(true)}}
              >
                <span className="mx-1"><TfiWrite /></span>


                Sửa</button>


              <button type="button" class="btn btn-danger"
              onClick={()=>{

                setTemp(item)
                setIsShowModalDelete(true)}}
              
              
              ><span><MdDelete /></span>Xoá</button></td>

          </tr>
        ))}
      </tbody>
    </Table>

  {temp&&   <ModalEditProduct
                isModalVisible={isShowModalEdit}
                handleCloseModal={CloseModal}
                product={temp}

            />}

      <ModalDelete
       isModalVisible={isShowModalDelete}
       handleCloseModal={CloseModal}
       product={temp}
      
      />
  </>)



}


export default TableProduct