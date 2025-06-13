import React, { useState , useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addMaterial, updateMaterial, getAllUnit } from "../../redux/reducers/CommonSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { toast } from "react-toastify";
import AlertComponent from "../../components/AlertComponent";
import PageLoader from "../../components/PageLoader";

interface IFormInput {
  name: string;
  unitId: string;
  displayName : string
}

const AddAndEditFloor: React.FC = () => {
  const unitList = useSelector((state: RootState) => state.common.unitList);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState([]);
  const location = useLocation();
  const editData = location?.state;

  const [formData, setFormData] = useState<IFormInput>({
    name: editData?.name || "",
    unitId: editData?.unitId || "",
    displayName: editData?.displayName || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Material name is required"),
    unitId: Yup.string().required("Unit is required"),
    displayName: Yup.string().required("Display name is required"),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      if (editData) {
        let userData: any = { ...formData, id: editData.id };
        makeApiCall(updateMaterial(userData));
      } else {
        makeApiCall(addMaterial(formData));
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: Record<string, string> = {};
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
          navigate("/material");
        } else {
          setServerError(response?.data);
        }
      })
      .catch((err: any) => {
        setIsLoading(false);
        setServerError(err?.data);
      });
  };

  const getUnitDetails = () => {
    dispatch(getAllUnit(""))
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
    getUnitDetails();
  }, []);

  return (
    <>
      {isLoading && <PageLoader />}
      <div className="dashboard-main-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
          <h6 className="fw-semibold mb-0">Material</h6>
          <ul className="d-flex align-items-center gap-2">
            <Link to="/material" className="fw-medium btn btn-primary">
              Back
            </Link>
          </ul>
        </div>

        <div className="row gy-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                {serverError?.length > 0 && (
                  <AlertComponent serverError={serverError} />
                )}
                <form onSubmit={handleSubmit}>
                  <div className="row formStyle">
                  <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="unitId">Unit</label>
                        <select
                          className="form-control"
                          name="unitId"
                          id="unitId"
                          value={formData.unitId}
                          onChange={handleChange}
                        >
                          <option value="">Please select </option>
                          {unitList?.map((unit: any) => {
                            return (
                              <>
                                <option value={unit.id}>{unit.unit}</option>
                              </>
                            );
                          })}
                        </select>
                      </div>
                      {errors.unitId && (
                        <p style={{ color: "red" }}>{errors.unitId}</p>
                      )}
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="clientName">Material Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Material Name"
                        />
                        {errors.name && (
                          <p style={{ color: "red" }}>{errors.name}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="displayName">Material Display Name (Label)</label>
                        <input
                          type="text"
                          className="form-control"
                          name="displayName"
                          id="displayName"
                          value={formData.displayName}
                          onChange={handleChange}
                          placeholder="Material Display Name"
                        />
                        {errors.displayName && (
                          <p style={{ color: "red" }}>{errors.displayName}</p>
                        )}
                      </div>
                    </div>
                   
                  </div>
                  <br></br>
                  <div style={{ textAlign: "center", padding: "5px" }}>
                    <Link to="/material" className="fw-medium btn btn-primary">
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

export default AddAndEditFloor;
