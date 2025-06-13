import React,{ useState, useEffect } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import AlertComponent from "../../components/AlertComponent";
import { toast } from "react-toastify";
import { updateDispatch } from "../../redux/reducers/materialSlice";
import "./dispatch.css";

interface IFormInput {
  invoiceNo: string;
  invoiceDate: string;
  invoiceAmount: string;
}

const ProductionProcess: React.FC = () => {

  const location = useLocation();
  const jobData = location?.state?.jobData;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState([]);

  const [formData, setFormData] = useState<IFormInput>({
    invoiceNo: "",
    invoiceDate:  "",
    invoiceAmount: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    invoiceNo: Yup.string().required("Invoice no is required"),
    invoiceDate: Yup.string().required("Invoice date is required"),
    invoiceAmount: Yup.string().required("Invoice amount is required"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      makeApiCall(updateDispatch({ ...formData, id: jobData.id }));
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const makeApiCall = (functionName: any) => {
    dispatch(functionName)
      .unwrap()
      .then((response: any) => {
        setIsLoading(false);
        if (response?.status === 200 || response?.status === 201) {
          toast.success(response?.message);
          setServerError([]);
          navigate("/dispatch_details");
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
      <div className="dashboard-main-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
          <h6 className="fw-semibold mb-0">Dispatch</h6>
          <ul className="d-flex align-items-center gap-2">
            <Link
              to="/dispatch_details"
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
                <div className="row">
                  <h6 className="job-header">
                    <u>Dispatch details</u>
                  </h6>
                  <br></br>
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Customer name : </span>
                      <span className="job-value">
                        {jobData.materialInwardDetails.materialInward.client.clientName}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p> 
                      <span className="job-lable"> Dc number :</span>
                      <span className="job-value"> {jobData.materialInwardDetails.materialInward.dcNumber} </span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Job type : </span>
                      <span className="job-value">{jobData.materialInwardDetails.jobType.name}</span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Job ID : </span>
                      <span className="job-value">{jobData.materialInwardDetails.jobId}</span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Material : </span>
                      <span className="job-value">{jobData.materialInwardDetails.material}</span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Thickness : </span>
                      <span className="job-value">{jobData.materialInwardDetails.thickness}</span>
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
                        {new Date(jobData.materialInwardDetails.estimatedDispatchDate)
                          .toISOString()
                          .slice(0, 10)}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Inspection :</span>
                      <span className="job-value"> {jobData.materialInwardDetails.inspection} </span>
                    </p>
                  </div>

                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Invoice no :</span>
                      <span className="job-value"> {jobData.invoiceNo} </span>
                    </p>
                  </div>

                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Invoice Date :</span>
                      <span className="job-value"> {jobData.invoiceDate} </span>
                    </p>
                  </div>

                  <div className="col-md-4">
                    <p>
                      <span className="job-lable"> Invoice Amount :</span>
                      <span className="job-value"> {jobData.invoiceAmount} </span>
                    </p>
                  </div>

                  <br></br>
                  <div>
                  {serverError?.length > 0 && (
                    <AlertComponent serverError={serverError} />
                  )}
                </div>
                  <form onSubmit={handleSubmit}>
                  <div className="row formStyle">
                    <hr></hr>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="invoiceNo">Invoice No </label>
                        <input
                          type="text"
                          className="form-control"
                          name="invoiceNo"
                          id="invoiceNo"
                          value={formData.invoiceNo}
                          onChange={handleChange}
                          placeholder="Invoice No"
                        />
                      </div>
                      {errors.invoiceNo && (
                        <p style={{ color: "red" }}>{errors.invoiceNo}</p>
                      )}
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="invoiceDate"> Invoice Date</label>
                        <input
                          type="date"
                          className="form-control"
                          name="invoiceDate"
                          id="invoiceDate"
                          min={new Date().toISOString().split("T")[0]}
                          value={formData.invoiceDate}
                          onChange={handleChange}
                          placeholder="Invoice Date"
                        />
                      </div>
                      {errors.invoiceDate && (
                        <p style={{ color: "red" }}>{errors.invoiceDate}</p>
                      )}
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="invoiceAmount"> Invoice Amount</label>
                        <input
                          type="text"
                          className="form-control"
                          name="invoiceAmount"
                          id="invoiceAmount"
                          value={formData.invoiceAmount}
                          onChange={handleChange}
                          placeholder="Invoice Amount"
                        />
                      </div>
                      {errors.invoiceAmount && (
                        <p style={{ color: "red" }}>{errors.invoiceAmount}</p>
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
                      Submit
                    </button>
                  </div>
                </form>
                </div>
                 <div>
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
