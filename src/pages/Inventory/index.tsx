import React, { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getInventory,
} from "../../redux/reducers/CommonSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { toast } from "react-toastify";
import DynamicTable from "../../components/DynamicTable";
import { Column } from "react-table";



const Inventory: React.FC = () => {
  const data = useSelector((state: RootState) => state.common.inventory);
  const count = useSelector((state: RootState) => state.common.inventoryCount);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const columns: Column<any>[] = React.useMemo(
    () => [
      {
        Header: "Material",
        accessor: (row)=> row.material?.name,
      },
      {
        Header: "Qty",
        accessor: "qty",
      },
    ],
    []
  );

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (row: any) => {
    navigate("/editInventory", { state: row });
  };

 

  useEffect(() => {
    getData();
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (data.length > 0) {
      let page = Math.ceil(count / pageSize);
      setTotalPages(page);
    }
  }, [data, pageSize]);

  const getData = () => {
    let query = `page=${currentPage}&limit=${pageSize}`
    dispatch(getInventory(query))
      .unwrap()
      .then((response: any) => {
        console.log("API response:", response);
        if (response?.status === 200 || response?.status === 201) {
          // toast.success(response?.message);
        } else {
          toast.error(response?.message);
        }
      })
      .catch((err: any) => {
        console.error("API call error:", err);
      });
  };

  return (
    <>
      <div className="dashboard-main-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
          <h6 className="fw-semibold mb-0">Inventory</h6>
          <ul className="d-flex align-items-center gap-2">
            <li className="fw-medium">
              {" "}
              <Link to="/addInventory" className="btn btn-primary">
                {" "}
                Add Inventory
              </Link>{" "}
            </li>
          </ul>
        </div>

        <div className="card basic-data-table">
          <div className="card-header">
            <h5 className="card-title mb-0">Inventory informations</h5>
          </div>
          <div className="card-body">
            <DynamicTable
              columns={columns}
              data={data}
              onEdit={handleEdit}
              editOption ={true}
              deleteOption ={false}
            />
            <br></br>
            <div className="pagination">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => handlePagination(page)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inventory;
