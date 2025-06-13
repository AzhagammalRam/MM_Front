import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { assignFiling, forwardJob,updateProduction } from "../../redux/reducers/materialSlice";
import {
  getIncharge,
  getAllFloor,
  getAllShift,
  getJobTypeMaterialList,
} from "../../redux/reducers/CommonSlice";
import { toast } from "react-toastify";
import AlertComponent from "../../components/AlertComponent";
import PageLoader from "../../components/PageLoader";
import "./production.css";
import ReactToPrint from "react-to-print";

interface IFormInput {
  completedQty: string;
  date: string;
  remarks: string;
  assignedFloor: string;
  assignedShift: string;
  shiftIncharge: string;
}

interface ForwardFormInput {
  receivedQty: string;
  date: string;
  assignedFloor: string;
  assignedShift: string;
  shiftIncharge: string;
}

const ProductionProcess: React.FC = () => {
  const inchargeList = useSelector(
    (state: RootState) => state.common.inchargeList
  );

  const floorList = useSelector((state: RootState) => state.common.floorList);
  const shiftList = useSelector((state: RootState) => state.common.shiftList);
  const jobTypeMaterialDataList = useSelector(
    (state: RootState) => state.common.jobTypeMaterialList
  );
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState([]);
  const [materialError, setMaterialError] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState("production");
  const location = useLocation();
  const jobData = location?.state?.jobData;
  
  const editData = location?.state?.editData;
  const componentRef: any = useRef();

  const initFormData = {
    completedQty: editData?.completedQty || "",
    remarks: editData?.remarks || "",
    date: editData?.date || "",
    assignedFloor: editData?.assignedFloor || "",
    assignedShift: editData?.assignedShift || "",
    shiftIncharge: editData?.shiftIncharge || "",
  };

  const [formData, setFormData] = useState<IFormInput>(initFormData);

  const initForwardFormData = {
    receivedQty: "",
    date: "",
    assignedFloor: "",
    assignedShift: "",
    shiftIncharge: "",
  };

  const [forwardFormData, setForwardFormData] =
    useState<ForwardFormInput>(initForwardFormData);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [forwrdFormerrors, setForwardFormErrors] = useState<
    Record<string, string>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobTypeMaterial, setJobTypeMaterial] = useState<any>([]);

  const validationSchema = Yup.object().shape({
    completedQty: Yup.string().required("Completed Qty is required"),
    date: Yup.string().required("Date is required"),
    assignedFloor: Yup.string().required("Assigned floor is required"),
    assignedShift: Yup.string().required("Assigned shift is required"),
    shiftIncharge: Yup.string().required("Incharge is required"),
  });

  const validationForwardSchema = Yup.object().shape({
    receivedQty: Yup.string().required("Forward Qty is required"),
    date: Yup.string().required("Date is required"),
    assignedFloor: Yup.string().required("Assigned floor is required"),
    assignedShift: Yup.string().required("Assigned shift is required"),
    shiftIncharge: Yup.string().required("Incharge is required"),
  });

  const validateMaterialError = (field:any) =>{
     let error:any = {}
     let status = true;
     jobTypeMaterial?.forEach((val:any)=>{
       if(!val[field]){
         error[val.name] = "This field is required";
       }
     })
     if(Object.keys(error).length > 0){
      status = false
     }
     setMaterialError(error)
     return status;
  }

  useEffect(() => {
    let materialFields: any = [];
    if(jobData?.jobExpenses && jobData?.jobExpenses.length > 0){
      jobData?.jobExpenses?.forEach((material: any) => {
        let materialInfo: any = {};
        materialInfo.displayName = material.displayName;
        materialInfo.name = material.materrialId;
        materialInfo.qty = material?.expectedQty || "";
        materialInfo.cqty = material?.usedQty || "";
        materialFields.push(materialInfo);
      });
    }else{
      jobTypeMaterialDataList.forEach((material: any) => {
        let materialInfo: any = {};
        materialInfo.displayName = material.displayName;
        materialInfo.name = material.id;
        materialInfo.qty = "";
        materialInfo.cqty = "";
        materialFields.push(materialInfo);
      });
    }
    
    setJobTypeMaterial(materialFields);
  }, [jobTypeMaterialDataList]);

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

  const getJobTypeMaterial = () => {
    let query = "id=" + jobData.id;
    dispatch(getJobTypeMaterialList(query))
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
    getJobTypeMaterial();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleForwardFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForwardFormData({ ...forwardFormData, [name]: value });
    if (name == "assignedShift") getInchargeDetails(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let isValid = validateMaterialError('cqty');
      await validationSchema.validate(formData, { abortEarly: false });
      if(!isValid){
        return false;
      }
      setErrors({});
      makeApiCall(
        assignFiling({
          ...formData,
          jobTypeMaterial,
          id: jobData.MaterialInwardDetailsId,
          materialProductionId: jobData.id,
        })
      );
      setFormData(initFormData);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: any = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        console.log("newErrors", newErrors);
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForwardFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await validationForwardSchema.validate(forwardFormData, {
        abortEarly: false,
      });
      setErrors({});
      makeApiCall(
        forwardJob({
          ...forwardFormData,
          materialProductionId: jobData.id,
          materialInwardId: jobData.materialInwardId,
        })
      );
      setForwardFormData(initForwardFormData);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: any = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setForwardFormErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProductionFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let isValid = validateMaterialError('qty');
      if(!isValid){
         return false;
      }
      makeApiCall(
        updateProduction({
          jobTypeMaterial,
          materialProductionId: jobData.id,
          id: jobData.MaterialInwardDetailsId,
        })
      );
      setForwardFormData(initForwardFormData);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: any = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setForwardFormErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  

  const makeApiCall = (functionName: any) => {
    dispatch(functionName)
      .unwrap()
      .then((response: any) => {
        console.log("response", response);
        setIsLoading(false);
        if (response?.status === 200 || response?.status === 201) {
          toast.success(response?.message);
          setServerError([]);
          // navigate("/production_details");
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

  const handleTabClick = (tabId: any) => {
    setActiveTab(tabId);
  };

  const handleJobTypeMaterial = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let inputField = name.split("-");
    let id = inputField[1];
    let field = inputField[0].split("_");
    let data = jobTypeMaterial.map((material: any) => {
      if (material.name == id) {
        if (field[1] == "starting") {
          material.qty = value;
        } else {
          material.cqty = value;
        }
      }
      return material;
    });
    setJobTypeMaterial(data);
  };

  return (
    <>
      {isLoading && <PageLoader />}
      <div className="dashboard-main-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
          <h6 className="fw-semibold mb-0">Production Details</h6>
          <ul className="d-flex align-items-center gap-2">
            <Link
              to="/production_details"
              className="fw-medium btn btn-primary"
            >
              Back
            </Link>
          </ul>
        </div>

        <div className="row gy-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="print">
                  <ReactToPrint
                    trigger={() => (
                      <button className="btn btn-primary">Print</button>
                    )}
                    content={() => componentRef.current}
                  />
                </div>
                <div className="row" ref={componentRef}>
                  <h6 className="job-header">
                    <u>Job details</u>
                  </h6>
                  <br></br>
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Customer name : </span>
                      <span className="job-value">
                        {
                          jobData.materialInwardDetails.materialInward.client
                            .clientName
                        }
                      </span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Dc number :</span>
                      <span className="job-value">
                        {" "}
                        {
                          jobData.materialInwardDetails.materialInward.dcNumber
                        }{" "}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Job type : </span>
                      <span className="job-value">
                        {jobData.materialInwardDetails.jobType.name}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Job ID : </span>
                      <span className="job-value">
                        {jobData.materialInwardDetails.jobId}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Material : </span>
                      <span className="job-value">
                        {jobData.materialInwardDetails.material}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Thickness : </span>
                      <span className="job-value">
                        {jobData.materialInwardDetails.thickness}
                      </span>
                    </p>
                  </div>

                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Quantity :</span>
                      <span className="job-value"> {jobData.receivedQty} </span>
                    </p>
                  </div>

                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Received date :</span>
                      <span className="job-value">
                        {new Date(jobData.materialInwardDetails.receivedDate)
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
                        {new Date(
                          jobData.materialInwardDetails.estimatedDispatchDate
                        )
                          .toISOString()
                          .slice(0, 10)}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Inspection :</span>
                      <span className="job-value">
                        {" "}
                        {jobData.materialInwardDetails.inspection}{" "}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Date :</span>
                      <span className="job-value"> {jobData.date} </span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Floor :</span>
                      <span className="job-value">
                        {" "}
                        {jobData?.floor?.name}{" "}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Shift :</span>
                      <span className="job-value">
                        {" "}
                        {jobData?.shift?.name}{" "}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Incharge :</span>
                      <span className="job-value">
                        {" "}
                        {jobData.user.firstName}{" "}
                      </span>
                    </p>
                  </div>

                  {jobTypeMaterial?.map((val: any) => {
                        return (
                          <>
                            <div key={val.name} className="col-md-4">
                              <p className="form-group">
                                <span className="job-lable">  {val.displayName} (Starting Level) :</span>
                                <span className="job-value"> {val.qty}</span>  
                              </p>
                            </div>
                            <div key={val.name} className="col-md-4">
                              <p className="form-group">
                                <span className="job-lable">  {val.displayName} (Ending Level) :</span>
                                <span className="job-value"> {val.cqty}</span>
                              </p>
                            </div>
                          </>
                        );
                  })}
                </div>

                <br></br>
                <div>
                  {serverError?.length > 0 && (
                    <AlertComponent serverError={serverError} />
                  )}
                </div>

                <div>
                  <div className="" role="group" aria-label="...">
                    <div className="btn-group" role="group">
                      <button
                        type="button"
                        id="production"
                        className={`btn ${
                          activeTab === "production"
                            ? "btn-primary"
                            : "btn-default"
                        }`}
                        onClick={() => handleTabClick("production")}
                      >
                        Production
                      </button>
                    </div>

                    <div className="btn-group" role="group">
                      <button
                        type="button"
                        id="filing"
                        className={`btn ${
                          activeTab === "filing" ? "btn-primary" : "btn-default"
                        }`}
                        onClick={() => handleTabClick("filing")}
                      >
                        Filing
                      </button>
                    </div>

                    <div className="btn-group" role="group">
                      <button
                        type="button"
                        id="forward"
                        className={`btn ${
                          activeTab === "forward"
                            ? "btn-primary"
                            : "btn-default"
                        }`}
                        onClick={() => handleTabClick("forward")}
                      >
                        Forward
                      </button>
                    </div>
                  </div>
                  <br></br>
                  <div className="tab-content">
                    {activeTab === "forward" && (
                      <div className="tab-pane  in active" id="tab1">
                        <form onSubmit={handleForwardFormSubmit}>
                          <div className="row formStyle">
                            <hr></hr>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="receivedQty">Forward Qty</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="receivedQty"
                                  id="receivedQty"
                                  value={forwardFormData.receivedQty}
                                  onChange={handleForwardFormChange}
                                  placeholder="Forward Qty"
                                />
                              </div>
                              {forwrdFormerrors.receivedQty && (
                                <p style={{ color: "red" }}>
                                  {forwrdFormerrors.receivedQty}
                                </p>
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
                                  value={forwardFormData.date}
                                  onChange={handleForwardFormChange}
                                  placeholder="date"
                                />
                              </div>
                              {forwrdFormerrors.date && (
                                <p style={{ color: "red" }}>
                                  {forwrdFormerrors.date}
                                </p>
                              )}
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="assignedFloor">
                                  Assigned Floor
                                </label>
                                <select
                                  className="form-control"
                                  name="assignedFloor"
                                  id="assignedFloor"
                                  value={forwardFormData.assignedFloor}
                                  onChange={handleForwardFormChange}
                                >
                                  <option value="">Please select </option>
                                  {floorList?.map((floor: any) => {
                                    return (
                                      <>
                                        <option value={floor.id}>
                                          {floor.name}
                                        </option>
                                      </>
                                    );
                                  })}
                                </select>
                              </div>
                              {forwrdFormerrors.assignedFloor && (
                                <p style={{ color: "red" }}>
                                  {forwrdFormerrors.assignedFloor}
                                </p>
                              )}
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="assignedShift">
                                  Assigned Shift
                                </label>
                                <select
                                  className="form-control"
                                  name="assignedShift"
                                  id="assignedShift"
                                  value={forwardFormData.assignedShift}
                                  onChange={handleForwardFormChange}
                                >
                                  <option value="">Please select </option>
                                  {shiftList?.map((shift: any) => {
                                    return (
                                      <>
                                        <option value={shift.id}>
                                          {shift.name}
                                        </option>
                                      </>
                                    );
                                  })}
                                </select>
                              </div>
                              {forwrdFormerrors.assignedShift && (
                                <p style={{ color: "red" }}>
                                  {forwrdFormerrors.assignedShift}
                                </p>
                              )}
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="shiftIncharge">
                                  {" "}
                                  Shift incharge
                                </label>
                                <select
                                  className="form-control"
                                  name="shiftIncharge"
                                  id="shiftIncharge"
                                  value={forwardFormData.shiftIncharge}
                                  onChange={handleForwardFormChange}
                                >
                                  <option value="">Please select </option>
                                  {inchargeList?.map((incharge: any) => {
                                    return (
                                      <>
                                        <option value={incharge.id}>
                                          {incharge.firstName}{" "}
                                          {incharge.lastName}
                                        </option>
                                      </>
                                    );
                                  })}
                                </select>
                              </div>
                              {forwrdFormerrors.shiftIncharge && (
                                <p style={{ color: "red" }}>
                                  {forwrdFormerrors.shiftIncharge}
                                </p>
                              )}
                            </div>
                          </div>
                          <br></br>
                          <div style={{ textAlign: "center", padding: "5px" }}>
                            <Link
                              to="/production_details"
                              className="fw-medium btn btn-primary"
                            >
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
                    )}
                    {activeTab === "production" && (
                      <div className="tab-pane  in active" id="tab1">
                        <form onSubmit={handleProductionFormSubmit}>
                          <div className="row formStyle">
                            <hr></hr>

                            {jobTypeMaterial?.map((val: any) => {
                              return (
                                <>
                                  <div key={val.name} className="col-md-6">
                                    <div className="form-group">
                                      <label
                                        htmlFor={`materoal_starting-${val.name}`}
                                      >
                                        {val.displayName} (Starting Level){" "}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        name={`materoal_starting-${val.name}`}
                                        id={`materoal_starting-${val.name}`}
                                        value={val.qty}
                                        onChange={handleJobTypeMaterial}
                                      />
                                      {materialError[val.name] && (
                                        <p style={{ color: "red" }}>
                                          {materialError[val.name]}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                          <br></br>
                          <div style={{ textAlign: "center", padding: "5px" }}>
                            <Link
                              to="/production_details"
                              className="fw-medium btn btn-primary"
                            >
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
                    )}
                    {activeTab === "filing" && (
                      <>
                        <br></br>
                        <hr></hr>
                        <div className="row">
                          {jobTypeMaterial?.map((val: any) => {
                            return (
                              <>
                                <div key={val.name} className="col-md-6">
                                  <div className="form-group">
                                    <label
                                      htmlFor={`materoal_ending-${val.name}`}
                                    >
                                      {val.displayName} (Ending Level){" "}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name={`materoal_ending-${val.name}`}
                                      id={`materoal_ending-${val.name}`}
                                      value={val.cqty}
                                      onChange={handleJobTypeMaterial}
                                    />
                                    {materialError[val.name] && (
                                        <p style={{ color: "red" }}>
                                          {materialError[val.name]}
                                        </p>
                                      )}
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>
                        <br></br>
                        <hr></hr>
                        <div className="tab-pane  in active" id="tab2">
                          <form onSubmit={handleSubmit}>
                            <div className="row formStyle">
                              <hr></hr>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="completedQty">
                                    Completed Qty{" "}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="completedQty"
                                    id="completedQty"
                                    value={formData.completedQty}
                                    onChange={handleChange}
                                    placeholder="Completed Qty"
                                  />
                                </div>
                                {errors.completedQty && (
                                  <p style={{ color: "red" }}>
                                    {errors.completedQty}
                                  </p>
                                )}
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="remarks"> Remarks</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="remarks"
                                    id="remarks"
                                    value={formData.remarks}
                                    onChange={handleChange}
                                    placeholder="Remarks "
                                  />
                                </div>
                                {errors.remarks && (
                                  <p style={{ color: "red" }}>
                                    {errors.remarks}
                                  </p>
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
                                  <label htmlFor="assignedFloor">
                                    Assigned Floor
                                  </label>
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
                                          <option value={floor.id}>
                                            {floor.name}
                                          </option>
                                        </>
                                      );
                                    })}
                                  </select>
                                </div>
                                {errors.assignedFloor && (
                                  <p style={{ color: "red" }}>
                                    {errors.assignedFloor}
                                  </p>
                                )}
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="assignedShift">
                                    Assigned Shift
                                  </label>
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
                                          <option value={shift.id}>
                                            {shift.name}
                                          </option>
                                        </>
                                      );
                                    })}
                                  </select>
                                </div>
                                {errors.assignedShift && (
                                  <p style={{ color: "red" }}>
                                    {errors.assignedShift}
                                  </p>
                                )}
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  <label htmlFor="shiftIncharge">
                                    {" "}
                                    Shift incharge
                                  </label>
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
                                            {incharge.firstName}{" "}
                                            {incharge.lastName}
                                          </option>
                                        </>
                                      );
                                    })}
                                  </select>
                                </div>
                                {errors.shiftIncharge && (
                                  <p style={{ color: "red" }}>
                                    {errors.shiftIncharge}
                                  </p>
                                )}
                              </div>
                            </div>
                            <br></br>
                            <div
                              style={{ textAlign: "center", padding: "5px" }}
                            >
                              <Link
                                to="/production_details"
                                className="fw-medium btn btn-primary"
                              >
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
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductionProcess;
