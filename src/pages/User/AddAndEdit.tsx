import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser } from "../../redux/reducers/CommonSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { toast } from "react-toastify";
import AlertComponent from "../../components/AlertComponent";
import PageLoader from "../../components/PageLoader";
import {
  getAllRole,
  getAllFloor,
  getAllShift,
} from "../../redux/reducers/CommonSlice";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  shiftId: string;
  floorId: string;
}

const AddAndEditFloor: React.FC = () => {
  const roleList = useSelector(
    (state: RootState) => state.common.allRole
  );
  const floorList = useSelector((state: RootState) => state.common.floorList);

  const shiftList = useSelector((state: RootState) => state.common.shiftList);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState([]);
  const location = useLocation();
  const editData = location?.state;
 
  const [formData, setFormData] = useState<IFormInput>({
    firstName: editData?.firstName || "",
    lastName: editData?.lastName || "",
    email: editData?.email || "",
    password: "",
    role: editData?.role || "",
    shiftId: editData?.shiftId || "",
    floorId: editData?.floorId || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    role: Yup.string().required("Role is required"),
    shiftId: Yup.string().required("Shift is required"),
    floorId: Yup.string().required("Floor is required"),
  });

  const getRoleDetails = () => {
    
    dispatch(getAllRole({}))
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
    getRoleDetails();
  }, []);

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
        makeApiCall(updateUser(userData));
      } else {
        makeApiCall(addUser(formData));
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
          navigate("/user");
        } else {
          setServerError(response?.data);
        }
      })
      .catch((err: any) => {
        setIsLoading(false);
        setServerError(err?.data);
      });
  };

  return (
    <>
      {isLoading && <PageLoader />}
      <div className="dashboard-main-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
          <h6 className="fw-semibold mb-0">User</h6>
          <ul className="d-flex align-items-center gap-2">
            <Link to="/floor" className="fw-medium btn btn-primary">
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
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="First Name"
                        />
                        {errors.firstName && (
                          <p style={{ color: "red" }}>{errors.firstName}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="firstName">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Last Name"
                        />
                        {errors.lastName && (
                          <p style={{ color: "red" }}>{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="firstName">Email</label>
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email"
                        />
                        {errors.email && (
                          <p style={{ color: "red" }}>{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          id="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Password"
                        />
                        {errors.password && (
                          <p style={{ color: "red" }}>{errors.password}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="role"> Role</label>
                        <select
                          className="form-control"
                          name="role"
                          id="role"
                          value={formData.role}
                          onChange={handleChange}
                        >
                          <option value="">Please select </option>
                          {roleList?.map((role: any) => {
                            return (
                              <>
                                <option value={role.id}>
                                  {role.name}
                                </option>
                              </>
                            );
                          })}
                        </select>
                      </div>
                      {errors.role && (
                        <p style={{ color: "red" }}>
                          {errors.role}
                        </p>
                      )}
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="floorId"> Floor</label>
                        <select
                          className="form-control"
                          name="floorId"
                          id="floorId"
                          value={formData.floorId}
                          onChange={handleChange}
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
                      {errors.floorId && (
                        <p style={{ color: "red" }}>
                          {errors.floorId}
                        </p>
                      )}
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="shiftId"> Shift</label>
                        <select
                          className="form-control"
                          name="shiftId"
                          id="shiftId"
                          value={formData.shiftId}
                          onChange={handleChange}
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
                      {errors.shiftId && (
                        <p style={{ color: "red" }}>
                          {errors.shiftId}
                        </p>
                      )}
                    </div>

                    
                  </div>
                  <br></br>
                  <div style={{ textAlign: "center", padding: "5px" }}>
                    <Link to="/user" className="fw-medium btn btn-primary">
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
