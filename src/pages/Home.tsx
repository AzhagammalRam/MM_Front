import React, { useEffect,useState } from "react";
import { getDashboard } from "../redux/reducers/materialSlice";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/Pagination";
import { toast } from "react-toastify";
import {
  getAllClient,
  getJobType,
  getDashboardJob
} from "../redux/reducers/CommonSlice";
import './home.css';

const Home: React.FC = () => {
  const data: any = useSelector((state: RootState) => state.common.dashboardJob);
  const dashboardCount: any = useSelector((state: RootState) => state.clientMaterial.dashboardDetails);
  const count: any = useSelector((state: RootState) => state.common.dashboardJobCount);
  const clientList: any = useSelector((state: RootState) => state.common.clientList);
  const jobTypeList: any = useSelector((state: RootState) => state.common.getJobType);
  const dispatch: AppDispatch = useDispatch();
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [client, setClient] = useState("");
  const [process, setProcess] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    getJobsData();
  }, [currentPage, pageSize,client,process,startDate,endDate]);

  const getJobsData = () => {
    let query = `page=${currentPage}&limit=${pageSize}&client=${client}&process=${process}&startDate=${startDate}&endDate=${endDate}`
    dispatch(getDashboardJob(query))
      .unwrap()
      .then((response: any) => {
        if (response?.status === 200 || response?.status === 201) {
        } else {
          toast.error(response?.message);
        }
      })
      .catch((err: any) => {
        console.error("API call error:", err);
      });
  };

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  const getDashobardData = () => {
    dispatch(getDashboard({}))
      .unwrap()
      .then((response: any) => {
        console.log("API response:", response);
        if (response?.status === 200 || response?.status === 201) {
        } else {
          toast.error(response?.message);
        }
      })
      .catch((err: any) => {
        console.error("API call error:", err);
      });
  };

  useEffect(() => {
    if (data.length > 0) {
      let page = Math.ceil(count / pageSize);
      setTotalPages(page);
    }
  }, [data, pageSize]);

  const getJobTypeDetails = () => {
      dispatch(getJobType(""))
        .unwrap()
        .then((response: any) => {
          if (response?.status === 200 || response?.status === 201) {
          } else {
            toast.error(response?.message);
          }
        })
        .catch((err: any) => {
          console.error("API call error:", err);
        }); 
  }

  const getAllClientData = () => {
    dispatch(getAllClient(""))
      .unwrap()
      .then((response: any) => {
        if (response?.status === 200 || response?.status === 201) {
        } else {
          toast.error(response?.message);
        }
      })
      .catch((err: any) => {
        console.error("API call error:", err);
      }); 
  } 

  useEffect(() => {
    getDashobardData();
    getJobTypeDetails();
    getAllClientData();
  }, []);

  return (
    <>
      <div className="dashboard-main-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
          <h6 className="fw-semibold mb-0">Dashboard</h6>
          <ul className="d-flex align-items-center gap-2">
            <li className="fw-medium">
              <a
                href="index.html"
                className="d-flex align-items-center gap-1 hover-text-primary"
              >
                <iconify-icon
                  icon="solar:home-smile-angle-outline"
                  className="icon text-lg"
                ></iconify-icon>
                Dashboard
              </a>
            </li>
            
          </ul>
        </div>

        <div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">
          <div className="col">
            <div className="card shadow-none border bg-gradient-start-1 h-100">
              <div className="card-body p-20">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div>
                    <p className="fw-medium text-primary-light mb-1">
                      Total Jobs
                    </p>
                    <h6 className="mb-0">{dashboardCount?.jobCount}</h6>
                  </div>
                  <div className="w-50-px h-50-px bg-cyan rounded-circle icon-text d-flex justify-content-center align-items-center">
                    <iconify-icon icon="material-symbols:work-update-sharp"></iconify-icon>
                  </div>
                </div>
                {/* <p className="fw-medium text-sm text-primary-light mt-12 mb-0">
                  <span className="text-success-main"> 100</span>
                  Last 30 days jobss
                </p> */}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card shadow-none border bg-gradient-start-2 h-100">
              <div className="card-body p-20">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div>
                    <p className="fw-medium text-primary-light mb-1">
                      Production
                    </p>
                    <h6 className="mb-0">{dashboardCount?.productionCount}</h6>
                  </div>
                  <div className="w-50-px h-50-px bg-purple rounded-circle icon-text d-flex justify-content-center align-items-center">
                    <iconify-icon icon="ic:twotone-group-work"></iconify-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card shadow-none border bg-gradient-start-2 h-100">
              <div className="card-body p-20">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div>
                    <p className="fw-medium text-primary-light mb-1">
                      Filing
                    </p>
                    <h6 className="mb-0">{dashboardCount?.filingCount}</h6>
                  </div>
                  <div className="w-50-px h-50-px bg-purple rounded-circle icon-text d-flex justify-content-center align-items-center">
                    <iconify-icon icon="ic:twotone-group-work"></iconify-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card shadow-none border bg-gradient-start-3 h-100">
              <div className="card-body p-20">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div>
                    <p className="fw-medium text-primary-light mb-1">
                      Total Clients
                    </p>
                    <h6 className="mb-0">{dashboardCount?.clientCount}</h6>
                  </div>
                  <div className="w-50-px h-50-px bg-info rounded-circle icon-text d-flex justify-content-center align-items-center">
                    <iconify-icon icon="ph:user-fill"></iconify-icon>
                  </div>
                </div>
                {/* <p className="fw-medium text-sm text-primary-light mt-12 mb-0">
                  <span className="text-success-main">5</span>
                  Last 30 days
                </p> */}
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card shadow-none border bg-gradient-start-5 h-100">
              <div className="card-body p-20">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div>
                    <p className="fw-medium text-primary-light mb-1">
                      Total Material
                    </p>
                    <h6 className="mb-0">{dashboardCount?.totalQuantity} KG</h6>
                  </div>
                  <div className="w-50-px h-50-px bg-red rounded-circle d-flex icon-text justify-content-center align-items-center">
                    <iconify-icon icon="lets-icons:materials"></iconify-icon>
                  </div>
                </div>
                {/* <p className="fw-medium text-sm text-primary-light mt-12 mb-0">
                  <span className="text-success-main">+50 KG</span>
                  Last 30 days
                </p> */}
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0"> Jobs</h5>
          </div>
          <br></br>
          <div className="row">
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="date">Client</label>
                  <select
                    className="form-control"
                    name="date"
                    id="date"
                    value={client}
                    onChange={(e)=>setClient(e.target.value)}
                  >
                  <option value="">Please select</option>
                  {clientList?.map((val:any)=>{
                     return <option value={val.id}>{val.clientName}</option>
                  })}
                  </select>
                </div>
             </div>

             <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="date">Process</label>
                  <select
                    className="form-control"
                    name="date"
                    id="date"
                    value={process}
                    onChange={(e)=>setProcess(e.target.value)}
                  >
                  <option value="">Please select</option>
                  {jobTypeList?.map((val:any)=>{
                     return <option value={val.id}>{val.name}</option>
                  })}
                  </select>
                </div>
             </div>
             <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="date"> Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    id="date"
                    value={startDate}
                    onChange={(e)=>setStartDate(e.target.value)}
                    placeholder="Start date"
                  />
                </div>
             </div>

             <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="date">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    id="date"
                    value={endDate}
                    onChange={(e)=>setEndDate(e.target.value)}
                    placeholder="End date"
                  />
                </div>
             </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table border-primary-table mb-0">
                <thead>
                  <tr>
                    <th scope="col">
                      <div className="form-check style-check d-flex align-items-center">
                        <label className="form-check-label">
                          S.L
                        </label>
                      </div>
                    </th>
                    <th scope="col">Client Name</th>
                    <th scope="col">Process</th>
                    <th scope="col">Material</th>
                    <th scope="col">Reacived Date</th>
                    <th scope="col">Dispatch Date</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.length > 0 ? <>
                    {data?.map((val:any,index:any)=>{
                      return <>
                           <tr>
                              <td>
                                <div className="form-check style-check d-flex align-items-center">
                                  <label className="form-check-label">
                                    {index +1}
                                  </label>
                                </div>
                              </td>
                              <td>{val?.materialInward?.client?.clientName}</td>
                              <td>{val?.jobType?.name}</td>
                              <td>{val?.material}</td>
                              <td>{val?.receivedDate ? new Date(val?.receivedDate).toISOString().slice(0, 10) : "-"} </td>
                              <td>{val?.estimatedDispatchDate ? new Date(val?.estimatedDispatchDate).toISOString().slice(0, 10) : "-"} </td>
                              <td>{val?.quantity}</td>
                              <td>
                                {val?.jobStatus == "1" &&   <span className="bg-warning-focus text-primary-main px-32 py-4 rounded-pill fw-medium text-sm">Not yet</span> }
                                {val?.jobStatus == "2" &&   <span className="bg-warning-focus text-warning-main px-32 py-4 rounded-pill fw-medium text-sm">Production</span> }
                                {val?.jobStatus == "3" &&   <span className="bg-warning-focus text-info-main px-32 py-4 rounded-pill fw-medium text-sm">Filing</span> }
                                {val?.jobStatus == "4" &&   <span className="bg-warning-focus text-success-main px-32 py-4 rounded-pill fw-medium text-sm">Dispatch</span> }
                              </td>
                            </tr>
                      </>
                    })}
                    
                  </>
                  :
                  <>No record found</>
                 }
                </tbody>
              </table>
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
      </div>
      </div>
    </>
  );
};

export default Home;
