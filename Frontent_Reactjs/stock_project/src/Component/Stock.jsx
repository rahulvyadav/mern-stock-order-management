import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PostStockData,
  GetStockData,
  DeleteStockData,
} from "../Redux/Action/StockAction";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from './Loader';

export default function Stock() {
  const dispatch = useDispatch();
  const [stockdata, setstockdata] = useState({
    stock_name: "",
    stock_qty: "",
  });
  const [closeModel, setCloseModel] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const state = useSelector((state) => state?.stockData);

  function ChangeFormValue(e) {
    setstockdata({ ...stockdata, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    dispatch(GetStockData());

  }, []);

  function SubmitstockForm() {
    const errors = validate(stockdata);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const found = state?.stockData.find((obj) => {
        return obj.stock_name === stockdata.stock_name;
      });

      if (!found) {
        dispatch(PostStockData(stockdata))
          .then(() => {
            setstockdata({
              stock_name: "",
              stock_qty: "",
            });
            toast("Stock Added Success!");
            setCloseModel("modal");
          });
      } else {
        toast(" Warning !");
        alert(" Same Stock Found");
      }
    }
  };


  function ClearForm() {
    setstockdata({
      stock_name: "",
      stock_qty: "",
    });
  }



  const validate = (values, e) => {
    const errors = {};
    const nameRegex = /^[A-Za-z][A-Za-z0-9_]{2,12}/;
    const numberRegex = /^[0-9]{1,6}$/;

    if (!values.stock_name) {
      errors.stock_name = " stock_name is required!";
    } else if (!nameRegex.test(values.stock_name)) {
      errors.stock_name = " This is not a valid stock_name format!";
    }

    if (!values.stock_qty) {
      errors.stock_qty = " stock_qty is required!";
    } else if (!numberRegex.test(values.stock_qty)) {
      errors.stock_qty = " This is not a valid stock_qty format!";
    }
    return errors;
  };

  function handleButtonClick(data) {
    if (data.order.length === 0) {
      dispatch(DeleteStockData(data.id)).then(() => {
        toast("Stock Deleted Success!");
      });
    } else {
      toast(" Warning !");
      alert(" As This Stock has Order, It Can't be Deleted");
    }
  }

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
      name: "stock_name",
      selector: (row) => row.stock_name,
      sortable: true,
    },
    {
      name: "stock_qty",
      cell: (row) => {
        if (row.order.length === 0) {
          return row.stock_qty;
        } else {
          return row.stock_qty - row.order[0]?.order_qty;
        }
      },
      sortable: true,
    },
    {
      name: "order_qty",
      cell: (row) => {
        if (row.order.length === 0) {
          return 0;
        } else {
          return row.order[0]?.order_qty;
        }
      },
    },

    {
      name: "Action",
      cell: (row) => (
        <>
          <span
            onClick={() => handleButtonClick(row)}
            className="btn btn-primary"
          >
            Delete
          </span>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <>
      <div className="d-grid gap-2 p-4 col-6 mx-auto">
        <button
          type="button"
          className="btn btn-warning "
          data-bs-toggle="modal"
          data-bs-target="#stockModal"
        >
          <label htmlFor="">Add Stock</label>
        </button>
        <ToastContainer />
      </div>

      {state?.loading ? (
        <Loader></Loader>
      ) : (

        <div className="stockdataTable">
          <DataTable columns={column} data={state?.stockData} pagination customStyles={customStyles}></DataTable>
        </div>
      )};



      <div
        className="modal fade bg-secondary "
        id="stockModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Stock Details</h5>
              <button
                type="button"
                className="btn-close"
                onClick={ClearForm}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <form className="row g-2 p-2" id="partform">
              <div className="mb-3">
                <label className="form-label fontcolor">
                  {" "}
                  <b>Stock Name</b>{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="stock_name"
                  id="title"
                  placeholder="stock_name"
                  value={stockdata.stock_name}
                  onChange={ChangeFormValue}
                />
                <p>{formErrors.stock_name}</p>
              </div>

              <div className="mb-3">
                <label className="form-label fontcolor">
                  {" "}
                  <b>Stock Quantity</b>{" "}
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="description"
                  name="stock_qty"
                  value={stockdata.stock_qty}
                  onChange={ChangeFormValue}
                  placeholder=" stock_qty "
                ></input>
                <p>{formErrors.stock_qty}</p>
              </div>
            </form>

            <div className="modal-footer justify-content-start">
              <button
                type="button"
                className="btn btn-primary"
                id="savepost"
                onClick={SubmitstockForm}
                data-bs-dismiss={closeModel}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-light"
                onClick={ClearForm}
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


