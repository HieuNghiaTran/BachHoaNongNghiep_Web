
import { Modal } from "antd";
import { Editor } from "draft-js";
import { useEffect, useState } from "react";
import { getAllCategory } from "../services/categoryServices";
import getAllColecion from "../services/collectionsServices";
import { addNewProduct, updateProduct } from "../services/productSevices";
import { toast } from "react-toastify";

const ModalEditProduct = (props) => {
    const { isModalVisible, handleCloseModal, product } = props
    const [listcatogary, setListCategory] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])
    const [describe, setDescirbe] = useState()
    const [id_product, setIdProduct] = useState();
    const [name, setName] = useState()
    const [stock, setStock] = useState()
    const [price, setPrice] = useState()
    const [date, setDate] = useState();
    const [selected1, setSelected1] = useState()
    const [selected2, setSelected2] = useState()
    const [img, setImg] = useState([])
    const [listColection, setListColection] = useState([])


    const fetchData = async () => {
        let temp = await getAllCategory();
        setListCategory(temp.data);
    }


    useEffect(() => {
        fetchData()
    }, [])



    useEffect(() => {
        if (isModalVisible) {
            console.log(product.date)
            setName(product.name_product)
            setDescirbe(product.describe)
            setPrice(product.price_product)
            setIdProduct(product.product_id)
            setDate(product.date)
            setStock(product.stock)
            setSelected1(product.id_category)
            setSelected2(product.id_collection)
            setImagesPreview(product.images)



        }
    }, [product]);


    const handleSubmit = async () => {
        let data = new FormData()
        data = {
            id_category: selected1,
            id_collection: selected2,
            product_id: id_product,
            name_product: name,
            price_product: price,
            images: img,
            stock: stock,
            date: date,
            describe: describe
        }
        let res = await updateProduct(product._id, data);
        handleCloseModal()
        toast.success("Edit Product Success")
    }
    const handleDeleteImg = (index) => {
        const newImagesPreview = imagesPreview.filter((item, idx) => idx !== index);
        const newImagesPreview2 = img.filter((item, idx) => idx !== index);
        setImagesPreview(newImagesPreview);
        setImg(newImagesPreview2)

    };


    const handleImageChange = (e) => {
        const files = Array.from(e.target.files)

       
        setImg([])

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    //setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImg(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })


    };
    return (
        <>


            <Modal
                title=""
                visible={isModalVisible}
                onClose={() => {
                    handleCloseModal()
                }}
                onOk={handleSubmit}
                onCancel={() => {
                    handleCloseModal()

                }}

            >
                <div>


                    <div>


                        <div className="product-manager" id="product-manager">
                            <div className="notification offset-9">
                                <div className="notification-content" id="notifi">
                                    <p id="notifi-content"></p>
                                </div>
                            </div>
                            <div className="text-center mt-2 mb-3">
                                <h4 style={{ fontWeight: "bold" }}>Thông tin sản phẩm</h4>
                            </div>


                            <div className="action mb-4">
                                <div className="frms container" id="form-id">
                                    <div className="form-row">
                                        <div className="form-group col-md-12 mb-2">
                                            <label for="code">Mã Sản Phẩm: </label>
                                            <input type="text" className="form-control" id="code" placeholder="Code"

                                                value={id_product}
                                                onChange={(e) => { setIdProduct(e.target.value) }}


                                            />
                                        </div>
                                        <div className="form-group col-md-12 mb-2">
                                            <label for="category">Danh Mục: </label>
                                            <select className="form-control" id="category"

                                                value={selected1}
                                                onChange={async (e) => {
                                                    setSelected1(e.target.value)
                                                    let temp = await getAllColecion(selected1)
                                                    temp.data.length > 0 ? setListColection(temp.data) : setListCategory("")


                                                }}

                                            >
                                                <option defaultValue>Select a category</option>
                                                {listcatogary.map((item, index) => (
                                                    <option key={index} value={item._id}>{item.category}</option>
                                                ))}
                                            </select>
                                        </div>





                                        <div className="form-group col-md-12 mb-2">
                                            <label htmlFor="category">Loại: </label>
                                            <select className="form-control" id="category"

                                                value={selected2}
                                                onChange={(e) => { setSelected2(e.target.value) }}

                                            >
                                                <option defaultValue>Select a type</option>
                                                {listColection.map((item, index) => (
                                                    <option key={index} value={item._id}>{item.colection}</option>
                                                ))}
                                            </select>
                                        </div>


                                        <div className="form-group col-md-12 mb-2">
                                            <label for="name">Tên Sản Phẩm: </label>
                                            <input type="text" className="form-control" id="name" placeholder="Name"
                                                defaultValue={product.name_product}
                                                value={name}
                                                onChange={(e) => { setName(e.target.value) }} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12 mb-2">
                                            <label for="price">Giá Tiền: </label>
                                            <input type="text" className="form-control" id="price" placeholder="Price"
                                                defaultValue={product.price_product}
                                                value={price}
                                                onChange={(e) => { setPrice(e.target.value) }}

                                            />
                                        </div>
                                        <div className="form-group col-md-12 mb-2">
                                            <label for="amount">Số Lượng: </label>
                                            <input type="number" className="form-control" id="amount" placeholder="Amount"
                                                defaultValue={product.stock}
                                                value={stock}
                                                onChange={(e) => { setStock(e.target.value) }}

                                            />
                                        </div>
                                        <div className="form-group col-md-12 mb-2">
                                            <label for="entry">Nhập Kho: </label>
                                            <input type="date" className="form-control" id="entry" placeholder="Entry"

                                                value={date}
                                                onChange={(e) => { setDate(e.target.value) }}
                                            />
                                        </div>




                                    </div>
                                    <div className="form-group col-md-12 mb-2">
                                        <label for="entry">Mô Tả: </label>

                                        <textarea
                                            type="text" className="form-control w-100" id="price" placeholder="Describe"
                                            defaultValue={product.describe}
                                            value={describe}
                                            onChange={(e) => { setDescirbe(e.target.value) }}></textarea>
                                    </div>
                                    <div className="form-group col-md-6 mb-2">
                                        <label for="image">Thêm Ảnh Sản Phẩm: </label>
                                        <input type="file" className="form-control-file btn-outline-info" id="image"
                                            onChange={handleImageChange}
                                            multiple
                                        />


                                    <div className="col-md-12">
                                    {imagesPreview && imagesPreview.map((img, index) => (

<>
    <div className="image-container mt-2">
        <img
            src={img.url}
            key={index}
            alt="Images Preview"
            className="mt-3 mr-2 mx-2 position-relative "
            width="55"
            height="53"
        />

        <button onClick={() => handleDeleteImg(index)} className="close-button">
            &times;
        </button>
    </div >

</>


))}
<span>
{img && img.map((img, index) => (

    <>
        <div className="image-container mt-2">
            <img
                src={img}
                key={index}
                alt="Images Preview"
                className="mt-3 mr-2 mx-2 position-relative "
                width="55"
                height="53"
            />

            <button onClick={() => handleDeleteImg(index)} className="close-button">
                &times;
            </button>
        </div >

    </>


))}
</span>
                                    </div>









                                    </div>

                                </div>
                            </div>

                        </div>


                    </div>




                </div>
            </Modal >


        </>



    )



}

export default ModalEditProduct