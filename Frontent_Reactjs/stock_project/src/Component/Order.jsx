import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { PostOrder, GetOrder, DeleteOrderData } from '../Redux/Action/OrderAction';
import { GetStockData } from '../Redux/Action/StockAction';
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from './Loader';

export default function Order() {

    const dispatch = useDispatch();
    const [orderdata, setorderdata] = useState({
        customer_name: "",
        order_qty: "",
        stockId: ""
    });
    function ChangeFormValue(e) {
        setorderdata({ ...orderdata, [e.target.name]: e.target.value });
    };
    const state = useSelector((state) => state?.orderData);
    const [formErrors, setFormErrors] = useState({});
    const [closeModel, setCloseModel] = useState("");

    const stockstate = useSelector((state) => state?.stockData?.stockData);

    useEffect(() => {
        dispatch(GetOrder())
    }, []);

    function SubmitorderForm() {

        const errors = validate(orderdata);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            dispatch(PostOrder(orderdata))
                .then(() => {
                    setorderdata({
                        customer_name: "",
                        order_qty: "",
                        stockId: ""
                    });
                    toast("Order Added Success!");
                    setCloseModel("modal");
                });
        }


    };


    function ClearForm() {
        setorderdata({
            customer_name: "",
            order_qty: "",
            stockId: ""
        });
    }

    function handleButtonClick(orderId) {
        dispatch(DeleteOrderData(orderId))
            .then(() => {
                toast("Order Deleted Success!");

            });
    }

    const validate = (values, e) => {
        const errors = {};
        const nameRegex = /^[A-Za-z][A-Za-z0-9_]{2,12}/;
        const numberRegex = /^[0-9]{1,6}$/;


        if (!values.customer_name) {
            errors.customer_name = " customer_name is required!";
        } else if (!nameRegex.test(values.customer_name)) {
            errors.customer_name = " This is not a valid customer name format!";
        }

        if (!values.order_qty) {
            errors.order_qty = " order_qty is required!";
        } else if (!numberRegex.test(values.order_qty)) {
            errors.order_qty = " This is not a valid order qty format!";
        }

        if (!values.stockId) {
            errors.stockId = " stock Name is required!";
        }



        return errors;
    };

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
                color: 'light grey'
            },
        },
    };

    const column = [
        {
            name: "customer_name",
            selector: row => row.customer_name,
            sortable: true
        },
        {
            name: "stock_name",
            selector: row => row.stock?.stock_name,
            sortable: true
        },
        {
            name: "order_qty",
            selector: row => row.order_qty,
            sortable: true
        },
        {
            name: "Action",
            cell: (row) => (
                <>
                    <span onClick={() => handleButtonClick(row.id)} className='btn btn-primary'>Delete</span>{'     '}
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,

        }
    ]


    return (
        <>
            <div className="d-grid gap-2 p-4 col-6 mx-auto">
                <button type="button" className="btn btn-info " data-bs-toggle="modal"
                    data-bs-target="#orderModal">
                    <label htmlFor="">Add Order</label>
                </button>
            </div>


            {state?.loading ? (
                <Loader></Loader>
            ) : (

                <div className='stockdataTable'>
                    <DataTable
                        columns={column}
                        data={state?.orderData?.data}
                        pagination
                        customStyles={customStyles}
                    >
                    </DataTable>
                </div>
            )}



            <div className="modal fade bg-secondary " id="orderModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" >
                    <div className="modal-content" >
                        <div className="modal-header">
                            <h5 className="modal-title">Add Order Details</h5>
                            <button type="button" className="btn-close" onClick={ClearForm} data-bs-dismiss="modal" aria-label="Close"></button>
                            <ToastContainer />
                        </div>
                        <form className="row g-2 p-2" id="partform">
                            <div className="mb-3">
                                <label className="form-label fontcolor"> <b>customer Name</b> </label>
                                <input type="text" className="form-control" name="customer_name" id="title"
                                    placeholder="customer_name" value={orderdata.customer_name} onChange={ChangeFormValue} />
                                <p>{formErrors.customer_name}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label fontcolor"> <b>order Qty</b> </label>
                                <input type="number" className="form-control" id="description" name="order_qty" value={orderdata.order_qty} onChange={ChangeFormValue}
                                    placeholder=" order_qty "  ></input>
                                <p>{formErrors.order_qty}</p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label fontcolor"> <b>Stock</b> </label>
                                <select className="form-select" aria-label="Default select example" name='stockId' onChange={ChangeFormValue}>
                                    <option  >Select the  Stock</option>

                                    {stockstate?.map((data, index) => (
                                        <option key={index} value={data.id} >{data.stock_name}</option>
                                    ))}



                                </select>
                                <p>{formErrors.stockId}</p>
                            </div>
                        </form>

                        <div className="modal-footer justify-content-start">
                            <button type="button" className="btn btn-primary" id="savepost" onClick={SubmitorderForm}
                                data-bs-dismiss={closeModel} >Save</button>
                            <button type="button" className="btn btn-light" onClick={ClearForm} data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
