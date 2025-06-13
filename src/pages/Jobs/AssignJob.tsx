import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { assignJob } from "../../redux/reducers/materialSlice";
import {
  getIncharge,
  getAllFloor,
  getAllShift,
  // getJobTypeMaterialList
} from "../../redux/reducers/CommonSlice";
import { toast } from "react-toastify";
import AlertComponent from "../../components/AlertComponent";
import PageLoader from "../../components/PageLoader";
import "./assignJob.css";

interface IFormInput {
  receivedQty: number;
  date: string;
  assignedFloor: string;
  assignedShift: string;
  shiftIncharge: string;
}

const AssignJob: React.FC = () => {
  const inchargeList = useSelector((state: RootState) => state.common.inchargeList);
  const floorList = useSelector((state: RootState) => state.common.floorList);
  const shiftList = useSelector((state: RootState) => state.common.shiftList);
  // const jobTypeMaterialList = useSelector((state: RootState) => state.common.jobTypeMaterialList);

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState([]);
  // const [jobTypeMaterial, setJobTypeMaterial] = useState<any>([]);

  // useEffect(()=>{
  //   let materialFields:any = [];
  //   jobTypeMaterialList.forEach((material:any)=>{
  //     let materialInfo:any = {}
  //     materialInfo.displayName = material.displayName
  //     materialInfo.name = material.id
  //     materialInfo.qty = ""
  //     materialFields.push(materialInfo)
  //  })
  //  setJobTypeMaterial(materialFields)
  // },[jobTypeMaterialList])
  
  const location = useLocation();
  const jobData = location?.state?.jobData;
  const editData = location?.state?.editData;
 
  const [formData, setFormData] = useState<IFormInput>({
    receivedQty: editData?.receivedQty || "",
    date: editData?.date || "",
    assignedFloor: editData?.assignedFloor || "",
    assignedShift: editData?.assignedShift || "",
    shiftIncharge: editData?.shiftIncharge || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    receivedQty: Yup.string().required("Assign Qty is required"),
    date: Yup.string().required("Date is required"),
    assignedFloor: Yup.string().required("Assigned floor is required"),
    assignedShift: Yup.string().required("Assigned shift is required"),
    shiftIncharge: Yup.string().required("Incharge is required"),
  });

  const getInchargeDetails = (shift: string) => {
    let query = "shift=" + shift;
    dispatch(getIncharge(query))
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

  // const handleJobTypeMaterial = (e: React.ChangeEvent<HTMLInputElement>) =>{
  //   const { name, value } = e.target;
  //   let id = name.split('-')[1]
  //   let data = jobTypeMaterial.map((material:any)=>{
  //      if(material.name == id){
  //        material.qty = value 
  //      }
  //      return material;
  //   })  
  //   setJobTypeMaterial(data)
  // }

  // const getJobTypeMaterial = () => {
  //   let query = "id="+jobData.jobTypeId
  //   dispatch(getJobTypeMaterialList(query))
  //     .unwrap()
  //     .then((response: any) => {
  //       console.log("API response:", response);
  //       if (response?.status === 200 || response?.status === 201) {
  //         // toast.success(response?.message);
  //       } else {
  //         toast.error(response?.message);
  //       }
  //     })
  //     .catch((err: any) => {
  //       console.error("API call error:", err);
  //     });
  // };

  useEffect(() => {
    getFloorDetails();
    getShiftDetails();
    // getJobTypeMaterial()
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      makeApiCall(assignJob({ ...formData, id: jobData.id }));
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: any = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const makeApiCall = (functionName: any) => {
    dispatch(functionName)
      .unwrap()
      .then((response: any) => {
        setIsLoading(false);
        if (response?.status === 200 || response?.status === 201) {
          toast.success(response?.message);
          setServerError([]);
          navigate("/jobs");
        } else {
          toast.error(response?.message);
          setServerError(response?.data);
        }
      })
      .catch((err: any) => {
        toast.error(err?.message);
        setServerError(err?.data);
        setIsLoading(false);
      });
  };

  const handleSelectInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name == "assignedShift") getInchargeDetails(value);
  };

  return (
    <>
      {isLoading && <PageLoader />}
      <div className="dashboard-main-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
          <h6 className="fw-semibold mb-0">Production Planning</h6>
          <ul className="d-flex align-items-center gap-2">
            <Link to="/jobs" className="fw-medium btn btn-primary">
              Back
            </Link>
          </ul>
        </div>

        <div className="row gy-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <h6 className="job-header">
                    <u>Job details</u>
                  </h6>
                  <br></br>
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Customer name : </span>
                      <span className="job-value">
                        {jobData.materialInward.client.clientName}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p> 
                      <span className="job-lable"> Dc number :</span>
                      <span className="job-value"> {jobData.materialInward.dcNumber} </span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Job type : </span>
                      <span className="job-value">{jobData.jobType.name}</span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Job ID : </span>
                      <span className="job-value">{jobData.jobId}</span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Material : </span>
                      <span className="job-value">{jobData.material}</span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Thickness : </span>
                      <span className="job-value">{jobData.thickness}</span>
                    </p>
                  </div>
                 
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Quantity :</span>
                      <span className="job-value"> {jobData.quantity} </span>
                    </p>
                  </div>
                 
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Received date :</span>
                      <span className="job-value">
                        {new Date(jobData.receivedDate)
                          .toISOString()
                          .slice(0, 10)}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable">

                        Estimated dispatch date :
                      </span>
                      <span className="job-value">
                        {new Date(jobData.estimatedDispatchDate)
                          .toISOString()
                          .slice(0, 10)}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      
                      <span className="job-lable"> Inspection :</span>
                      <span className="job-value"> {jobData.inspection} </span>
                    </p>
                  </div>
                </div>

                <br></br>
                <div>
                  {serverError?.length > 0 && (
                    <AlertComponent serverError={serverError} />
                  )}
                </div>
                <br></br>
                <hr></hr>
                {/* <div className="row">
                  {jobTypeMaterial?.map((val:any)=>{
                    return <>
                        <div key={val.name} className="col-md-4">
                            <div className="form-group">
                            <label htmlFor={`materoal-${val.name}`}>{val.displayName} </label>
                                <input
                                    type="text" 
                                    className="form-control"
                                    name={`materoal-${val.name}`}
                                    id={`materoal-${val.name}`}
                                    value={val.qty}
                                    onChange={handleJobTypeMaterial}
                                  />
                            </div>
                        </div>
                      </>
                  })}
                 
                </div>
                <br></br> */}
                <form onSubmit={handleSubmit}>
                  <div className="row formStyle">
                    <hr></hr>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="receivedQty">Assign Qty </label>
                        <input
                          type="text"
                          className="form-control"
                          name="receivedQty"
                          id="receivedQty"
                          value={formData.receivedQty}
                          onChange={handleChange}
                          placeholder="Assign Qty"
                        />
                      </div>
                      {errors.receivedQty && (
                        <p style={{ color: "red" }}>{errors.receivedQty}</p>
                      )}
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="date"> Date</label>
                        <input
                          type="date"
                          className="form-control"
                          name="date"
                          id="date"
                          min={new Date().toISOString().split("T")[0]}
                          value={formData.date}
                          onChange={handleChange}
                          placeholder="date"
                        />
                      </div>
                      {errors.date && (
                        <p style={{ color: "red" }}>{errors.date}</p>
                      )}
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="assignedFloor">Assigned Floor</label>
                        <select
                          className="form-control"
                          name="assignedFloor"
                          id="assignedFloor"
                          value={formData.assignedFloor}
                          onChange={handleSelectInputChange}
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
                      {errors.assignedFloor && (
                        <p style={{ color: "red" }}>{errors.assignedFloor}</p>
                      )}
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="assignedShift">Assigned Shift</label>
                        <select
                          className="form-control"
                          name="assignedShift"
                          id="assignedShift"
                          value={formData.assignedShift}
                          onChange={handleSelectInputChange}
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
                      {errors.assignedShift && (
                        <p style={{ color: "red" }}>{errors.assignedShift}</p>
                      )}
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="shiftIncharge"> Shift incharge</label>
                        <select
                          className="form-control"
                          name="shiftIncharge"
                          id="shiftIncharge"
                          value={formData.shiftIncharge}
                          onChange={handleSelectInputChange}
                        >
                          <option value="">Please select </option>
                          {inchargeList?.map((incharge: any) => {
                            return (
                              <>
                                <option value={incharge.id}>
                                  {incharge.firstName} {incharge.lastName}
                                </option>
                              </>
                            );
                          })}
                        </select>
                      </div>
                      {errors.shiftIncharge && (
                        <p style={{ color: "red" }}>{errors.shiftIncharge}</p>
                      )}
                    </div>
                  </div>
                  <br></br>
                  <hr></hr>
                  <br></br>
                  <div style={{ textAlign: "center", padding: "5px" }}>
                    <Link to="/jobs" className="fw-medium btn btn-primary">
                      Back
                    </Link>
                    <button
                      type="submit"
                      style={{ marginLeft: "5px" }}
                      className="btn btn-success"
                    >
                      {editData ? "Update" : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignJob;
