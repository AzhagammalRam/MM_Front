import React, { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getMaterialInward,
  addMessage,
  removeMaterialInward,
} from "../../redux/reducers/materialSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { toast } from "react-toastify";
import PageLoader from "../../components/PageLoader";
import DynamicTable from "../../components/DynamicTable";
import { Column } from "react-table";
import ModalComponent from "../../components/ModalComponent";

interface MaterialInward {
  client: Clients;
  dcNumber: number;
}

interface Clients {
  id: number;
  clientName: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}


const MaterialInwards: React.FC = () => {
  const data = useSelector((state: RootState) => state.clientMaterial.materialInward);
  const count = useSelector((state: RootState) => state.clientMaterial.count);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [deletedData, setDeletedData] = useState<any>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const columns: Column<MaterialInward>[] = React.useMemo(
    () => [
      {
        Header: "Customer Name",
        accessor: (row) => row.client.clientName || "N/A",
      },
      {
        Header: "Dc Number",
        accessor: "dcNumber",
      }
    ],
    []
  );
  

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (row: MaterialInward) => {
    navigate("/edit_material_inward", { state: row });
  };

  const handleDelete = (row: MaterialInward) => {
    setDeletedData(row);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveChanges = () => {
    setModalOpen(false);
    let data: any = {
      materialInwardId: deletedData?.id,
    };
    dispatch(removeMaterialInward(data))
      .unwrap()
      .then((response: any) => {
        if (response?.status === 200 || response?.status === 201) {
          toast.success(response?.message);
          getSupplierData();
        } else {
          toast.error(response?.message);
        }
      })
      .catch((err: any) => {
        console.error("API call error:", err);
        dispatch(addMessage({ error: err }));
      });
  };

  useEffect(() => {
    getSupplierData();
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (data.length > 0) {
      let page = Math.ceil(count / pageSize);
      setTotalPages(page);
    }
  }, [data, pageSize]);

  const getSupplierData = () => {
    let query = `page=${currentPage}&limit=${pageSize}`
    dispatch(getMaterialInward(query))
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
        dispatch(addMessage({ error: err }));
      });
  };

  useEffect(() => {
    getSupplierData();
  }, []);

  return (
    <>
      <div className="dashboard-main-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
          <h6 className="fw-semibold mb-0">Material Inward</h6>
          <ul className="d-flex align-items-center gap-2">
            <li className="fw-medium">
              <Link to="/add_material_inward" className="btn btn-primary">
                Add Material Inward
              </Link>
            </li>
          </ul>
        </div>

        <div className="card basic-data-table">
          <div className="card-header">
            <h5 className="card-title mb-0">Material inward informations</h5>
          </div>
          <div className="card-body">
            <DynamicTable
              columns={columns}
              data={data}
              onEdit={handleEdit}
              onDelete={handleDelete}
              editOption ={true}
              deleteOption ={true}
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

export default MaterialInwards;
