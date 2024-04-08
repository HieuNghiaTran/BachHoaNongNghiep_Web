import Header from "../components/layout/header";
import History from "../components/layout/history";
import MetaData from "../services/setHead";
import { Select } from 'antd';
import GoogleMapReact from 'google-map-react';
import { FaLocationDot } from "react-icons/fa6";
import './ccs/storeLocation.scss'
import Footer from "../components/layout/footer";
import { useState } from "react";
import Chat from "../components/layout/chat";
import AppChat from "../components/layout/appchat";
const Location = () => {
    const [map, setMap] = useState(null);

    const handleMapLoad = (map) => {
        setMap(map);
    };


    const defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    const AnyReactComponent = ({ text }) => <div>{text}</div>;



    return (
        <>
            <MetaData title={"Hệ thống cửa hàng"}></MetaData>
            <Header />
            <div><History data={"Trang chủ / "} last_item={`Hệ thông cửa hàng`}/></div>


            <div className="text-center h2 p-2">DANH SÁCH CỬA HÀNG</div>
            <div className="col-11 m-auto">
                <div className="row">
                    <div className="left col-md-3 p-4">
                        <div className="h3">Tìm cửa hàng</div>
                        <div className="">
                            <label className="mb-2">Chọn tỉnh thành</label>
                            <Select
                                className=""
                                showSearch
                                style={{


                                    width: "90%",
                                }}
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={[
                                    {
                                        value: '1',
                                        label: 'Not Identified',
                                    },
                                    {
                                        value: '2',
                                        label: 'Closed',
                                    },
                                    {
                                        value: '3',
                                        label: 'Communicated',
                                    },
                                    {
                                        value: '4',
                                        label: 'Identified',
                                    },
                                    {
                                        value: '5',
                                        label: 'Resolved',
                                    },
                                    {
                                        value: '6',
                                        label: 'Cancelled',
                                    },
                                ]}
                            />

                            <label className="mb-2 mt-2">Chọn cửa hàng</label>
                            <Select
                                className=""
                                showSearch
                                style={{
                                    width: "90%",
                                }}
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={[
                                    {
                                        value: '1',
                                        label: 'Not Identified',
                                    },
                                    {
                                        value: '2',
                                        label: 'Closed',
                                    },
                                    {
                                        value: '3',
                                        label: 'Communicated',
                                    },
                                    {
                                        value: '4',
                                        label: 'Identified',
                                    },
                                    {
                                        value: '5',
                                        label: 'Resolved',
                                    },
                                    {
                                        value: '6',
                                        label: 'Cancelled',
                                    },
                                ]}
                            />


                            <div className="mt-4 h4"><span className="mx-2"><FaLocationDot /></span>Thông tin cửa hàng</div>

                            <div>
                                <ul style={{ listStyle: "none" }}>
                                    <li>Số điện thoại: 0559809019</li>
                                    <li className="mb-2">Email: h.nghia11@gmail.com</li>
                                    <li className="mb-2">Địa chỉ: Thị trấn An Châu_Châu Thành_An Giang</li>
                                    <li>Giờ mở cửa: T2 – CN. 06:00 – 17:30</li>


                                </ul>



                            </div>
                            <div></div>


                        </div>





                    </div>
                    <div className="right col-md-9">
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyD1234567890-abcdefghijklmnopqrstuvwxyz" }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
            </GoogleMapReact>
          </div>



                </div>
            </div>


            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1234567890-abcdefghijklmnopqrstuvwxyz&libraries=places"></script>
            <Footer />
            <AppChat/>
        </>


    );



}

export default Location