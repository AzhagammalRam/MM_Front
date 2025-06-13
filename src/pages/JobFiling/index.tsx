import React, { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getFiling,
} from "../../redux/reducers/materialSlice";
import {
  getIncharge,
  getAllFloor,
  getAllShift,
} from "../../redux/reducers/CommonSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { toast } from "react-toastify";
import PageLoader from "../../components/PageLoader";
import DynamicTable from "../../components/DynamicTable";
import { Column } from "react-table";
import ModalComponent from "../../components/ModalComponent";



const JobProduction: React.FC = () => {
  const data = useSelector((state: RootState) => state.clientMaterial.filing);
  const count = useSelector((state: RootState) => state.clientMaterial.filingCount);
  const inchargeList = useSelector(
    (state: RootState) => state.common.inchargeList
  );

  const floorList = useSelector((state: RootState) => state.common.floorList);

  const shiftList = useSelector((state: RootState) => state.common.shiftList);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [deletedData, setDeletedData] = useState<any>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productionDate, setProductionData] = useState("");
  const [shift, setShift] = useState("");
  const [floor, setFloor] = useState("");
  const [incharge, setIncharge] = useState("");

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
        accessor: (row) => row.receivedQty || "N/A",
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
    navigate("/filing", { state: {jobData:row} });
  };

  const getInchargeDetails = () => {
    
    dispatch(getIncharge(""))
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

  const getFloorDetails = () => {
    dispatch(getAllFloor(""))
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

  const getShiftDetails = () => {
    dispatch(getAllShift(""))
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

  
  useEffect(() => {
    getFloorDetails();
    getShiftDetails();
    getInchargeDetails();
  }, []);

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
    getFilingData();
  }, [currentPage, pageSize,productionDate,shift,floor,incharge]);


  useEffect(() => {
    if (data.length > 0) {
      let page = Math.ceil(count / pageSize);
      setTotalPages(page);
    }
  }, [data, pageSize]);

  const getFilingData = () => {
    let query = `page=${currentPage}&limit=${pageSize}&productionDate=${productionDate}&shift=${shift}&floor=${floor}&incharge=${incharge}`
    dispatch(getFiling(query))
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
          <h6 className="fw-semibold mb-0">Filing</h6>
        </div>

        <div className="card basic-data-table">
          <div className="card-header">
            <h5 className="card-title mb-0">Filing informations</h5>
          </div>
          <div className="card-body">
            <div className="row">
            <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="date"> Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    id="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={productionDate}
                    onChange={(e)=>setProductionData(e.target.value)}
                    placeholder="date"
                  />
                </div>
             </div>

            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="assignedShift">Floor</label>
                <select
                  className="form-control"
                  name="assignedShift"
                  id="assignedShift"
                  value={floor}
                  onChange={(e)=>setFloor(e.target.value)}
                >
                  <option value="">Please select </option>
                  {floorList?.map((floor: any) => {
                    return (
                      <>
                        <option value={floor.id}>{floor.name}</option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="assignedShift">Shift</label>
                <select
                  className="form-control"
                  name="assignedShift"
                  id="assignedShift"
                  value={shift}
                  onChange={(e)=>setShift(e.target.value)}
                >
                  <option value="">Please select </option>
                  {shiftList?.map((shift: any) => {
                    return (
                      <>
                        <option value={shift.id}>{shift.name}</option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="assignedShift">Manager / Incharge</label>
                <select
                  className="form-control"
                  name="assignedShift"
                  id="assignedShift"
                  value={incharge}
                  onChange={(e)=>setIncharge(e.target.value)}
                >
                  <option value="">Please select </option>
                  {inchargeList?.map((incharge: any) => {
                    return (
                      <>
                        <option value={incharge.id}>{incharge.firstName} {incharge.lastName} </option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
            </div>
            <br></br>
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
