import React, { useState , useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addInventory, updateInventory, getAllMaterial } from "../../redux/reducers/CommonSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { toast } from "react-toastify";
import AlertComponent from "../../components/AlertComponent";
import PageLoader from "../../components/PageLoader";

interface IFormInput {
  materialId: string;
  qty: string;
}

const AddAndEditFloor: React.FC = () => {
  const materialList = useSelector((state: RootState) => state.common.materialList);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState([]);
  const location = useLocation();
  const editData = location?.state;

  const [formData, setFormData] = useState<IFormInput>({
    materialId: editData?.materialId || "",
    qty: editData?.qty || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    materialId: Yup.string().required("Material is required"),
    qty: Yup.string().required("Qty is required"),
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
        makeApiCall(updateInventory(userData));
      } else {
        makeApiCall(addInventory(formData));
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
          navigate("/inventory");
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
    dispatch(getAllMaterial(""))
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
            <Link to="/inventory" className="fw-medium btn btn-primary">
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
                        <label htmlFor="materialId">Material</label>
                        <select
                          className="form-control"
                          name="materialId"
                          id="materialId"
                          value={formData.materialId}
                          disabled={editData ? true : false}
                          onChange={handleChange}
                        >
                          <option value="">Please select </option>
                          {materialList?.map((naterial: any) => {
                            return (
                              <>
                                <option value={naterial.id}>{naterial.name}</option>
                              </>
                            );
                          })}
                        </select>
                      </div>
                      {errors.materialId && (
                        <p style={{ color: "red" }}>{errors.materialId}</p>
                      )}
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="qty">Qty</label>
                        <input
                          type="text"
                          className="form-control"
                          name="qty"
                          id="qty"
                          value={formData.qty}
                          onChange={handleChange}
                          placeholder="Material Qty"
                        />
                        {errors.qty && (
                          <p style={{ color: "red" }}>{errors.qty}</p>
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
