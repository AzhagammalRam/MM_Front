import React, { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDispatch,
} from "../../redux/reducers/materialSlice";

import { AppDispatch, RootState } from "../../redux/store";
import { toast } from "react-toastify";
import PageLoader from "../../components/PageLoader";
import DynamicTable from "../../components/DynamicTable";
import { Column } from "react-table";
import ModalComponent from "../../components/ModalComponent";



const JobProduction: React.FC = () => {
  const data = useSelector((state: RootState) => state.clientMaterial.dispatch);
  const count = useSelector((state: RootState) => state.clientMaterial.dispatchCount);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [deletedData, setDeletedData] = useState<any>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  

  const columns: Column<any>[] = React.useMemo(
    () => [
      {
        Header: "Customer Name",
        accessor: (row) => row.materialInwardDetails.materialInward.client.clientName || "N/A",
      },
      {
        Header: "Dc Number",
        accessor: (row) => row.materialInwardDetails.materialInward.dcNumber || "N/A",
      },
      {
        Header: "Quantity",
        accessor: "receivedQty",
      },
      {
        Header: "Received Date",
        accessor: (row) => {
          const receivedDate = new Date(row.materialInwardDetails.receivedDate);
          return isNaN(receivedDate.getTime()) ? "N/A" : receivedDate.toISOString().slice(0, 10);
        },
      },
      {
        Header: "Estimated Dispatch Date",
        accessor: (row) => {
          const estimatedDispatchDate = new Date(row.materialInwardDetails.estimatedDispatchDate);
          return isNaN(estimatedDispatchDate.getTime()) ? "N/A" : estimatedDispatchDate.toISOString().slice(0, 10);
        },
      },
    ],
    []
  );
  

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (row: any) => {
    navigate("/dispatch", { state: {jobData:row} });
  };

 

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveChanges = () => {
    setModalOpen(false);
    let data: any = {
      materialInwardId: deletedData?.id,
    };
   
  };

  useEffect(() => {
    getDispatchData();
  }, [currentPage, pageSize]);


  useEffect(() => {
    if (data.length > 0) {
      let page = Math.ceil(count / pageSize);
      setTotalPages(page);
    }
  }, [data, pageSize]);

  const getDispatchData = () => {
    let query = `page=${currentPage}&limit=${pageSize}`
    dispatch(getDispatch(query))
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
          <h6 className="fw-semibold mb-0">Dispatch</h6>
        </div>

        <div className="card basic-data-table">
          <div className="card-header">
            <h5 className="card-title mb-0">Dispatch informations</h5>
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
        <ModalComponent
          show={modalOpen}
          title="Are you Sure"
          body="Do you want to remove ?"
          onClose={handleCloseModal}
          onSave={handleSaveChanges}
        />
      </div>
    </>
  );
};

export default JobProduction;
