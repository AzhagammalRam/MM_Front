import React, { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, removeUser } from "../../redux/reducers/CommonSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { toast } from "react-toastify";
import PageLoader from "../../components/PageLoader";
import DynamicTable from "../../components/DynamicTable";
import { Column } from "react-table";
import ModalComponent from "../../components/ModalComponent";


interface TableColumn {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  shiftId: string;
  floorId: string;
}

const User: React.FC = () => {
  const data = useSelector((state: RootState) => state.common.user);
  const count = useSelector((state: RootState) => state.common.userCount);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [deletedData, setDeletedData] = useState<any>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const columns: Column<TableColumn>[] = React.useMemo(
    () => [
      {
        Header: "firstName",
        accessor: "firstName",
      },
      {
        Header: "lastName",
        accessor: "lastName",
      },
      {
        Header: "email",
        accessor: "email",
      },
      {
        Header: "Floor",
        accessor: (row:any)=>row?.floor?.name ,
      },
      {
        Header: "Shift",
        accessor: (row:any)=>row?.shift?.name ,
      },
      {
        Header: "Role",
        accessor: (row:any)=>row?.roleId?.name ,
      },
    ],
    []
  );

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (row: any) => {
    navigate("/editUser", { state: row });
  };

  const handleDelete = (row: any) => {
    setDeletedData(row);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveChanges = () => {
    setModalOpen(false);
    let data: any = {
      id: deletedData?.id,
    };

    dispatch(removeUser(data))
      .unwrap()
      .then((response: any) => {
        if (response?.status === 200 || response?.status === 201) {
          toast.success(response?.message);
          getData();
        } else {
          toast.error(response?.message);
        }
      })
      .catch((err: any) => {
        console.error("API call error:", err);
      });
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
    let query = `page=${currentPage}&limit=${pageSize}`;
    dispatch(getUser(query))
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
          <h6 className="fw-semibold mb-0">Users</h6>
          <ul className="d-flex align-items-center gap-2">
            <li className="fw-medium">
              {" "}
              <Link to="/addUser" className="btn btn-primary">
                {" "}
                Add User
              </Link>{" "}
            </li>
          </ul>
        </div>

        <div className="card basic-data-table">
          <div className="card-header">
            <h5 className="card-title mb-0">User informations</h5>
          </div>
          <div className="card-body">
            <DynamicTable
              columns={columns}
              data={data}
              onEdit={handleEdit}
              onDelete={handleDelete}
              editOption={true}
              deleteOption={true}
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

export default User;
