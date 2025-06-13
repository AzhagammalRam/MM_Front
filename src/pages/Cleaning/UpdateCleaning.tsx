import React, { useState } from "react";
import { Link,useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { updateCeaning } from "../../redux/reducers/materialSlice";
import { toast } from "react-toastify";
import AlertComponent from "../../components/AlertComponent";
import PageLoader from "../../components/PageLoader";
import "./style.css";

const ProductionProcess: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState([]);
  const location = useLocation();
  const jobData = location?.state?.jobData;
 

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      makeApiCall(updateCeaning({ id: jobData.id }));
    } catch (err) {
      console.log("err", err);
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
          navigate("/cleaning");
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

  return (
    <>
      {isLoading && <PageLoader />}
      <div className="dashboard-main-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
          <h6 className="fw-semibold mb-0">Cleaning Job</h6>
          <ul className="d-flex align-items-center gap-2">
            <Link to="/cleaning" className="fw-medium btn btn-primary">
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
                      <span className="job-value">
                        {jobData.materialInward.dcNumber}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Job ID :</span>
                      <span className="job-value"> {jobData.jobId} </span>
                    </p>
                  </div>

                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Material :</span>
                      <span className="job-value"> {jobData.material} </span>
                    </p>
                  </div>

                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Thickness :</span>
                      <span className="job-value"> {jobData.thickness} </span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Job type : </span>
                      <span className="job-value">
                        {jobData.jobType.name}
                      </span>
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
                      <span className="job-value">{jobData.inspection}</span>
                    </p>
                  </div>
                </div>

                <br></br>
                <div>
                  {serverError?.length > 0 && (
                    <AlertComponent serverError={serverError} />
                  )}
                </div>

                <div style={{ textAlign: "center", padding: "5px" }}>
                  <Link to="/cleaning" className="fw-medium btn btn-primary">
                    Back
                  </Link>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    style={{ marginLeft: "5px" }}
                    className="btn btn-success"
                  >
                    complete
                  </button>
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
