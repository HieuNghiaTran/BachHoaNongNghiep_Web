import MetaData from "../../services/setHead"
import Sidebar from "../sidebar"
import { Link } from "react-router-dom";

import { toast } from 'react-toastify';
import { Button, Checkbox, Form, Input, Table } from 'antd';
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableOrders from "../tableOrder";

const OrderManager = () => {

    return(<>
    <MetaData title={"Quản lý đơn hàng"}></MetaData>




    <div className="grid-bg ba-grid anim">
                <div className="inner">
                    <div className="row">
                        <div className="col-12 col-md-3">
                            <Sidebar />
                        </div>
                        <div className=" col-12 col-md-9">
                            <div className="mb-4">
                                <h1 className="text-center ">Quản lý đơn hàng</h1>
                               
                            </div>
                            <>                              

                                <div className="row pr-4">
                             <TableOrders/>
                                </div>
                            </>
                            <div className='row'>
                                <div className='col-md-6'>
                                    {/* Content for the left half */}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pageginate'>
                
            </div>






    </>)

}


export default OrderManager