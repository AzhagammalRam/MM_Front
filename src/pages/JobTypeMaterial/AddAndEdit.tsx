import React, { useState , useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addJobTypeMaterial, updateJobTypeMaterial, getJobType,getAllMaterial } from "../../redux/reducers/CommonSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { toast } from "react-toastify";
import AlertComponent from "../../components/AlertComponent";
import PageLoader from "../../components/PageLoader";
import Select from 'react-select';

interface IFormInput {
  jobTypeId: string;
  materialId: string;
}

const AddAndEditFloor: React.FC = () => {
  const jobTypeList = useSelector((state: RootState) => state.common.getJobType);
  const materialList = useSelector((state: RootState) => state.common.materialList);
  const options:any = []
  materialList.forEach((material:any)=>{
    let optionValue:any = {}
    optionValue.value = material.id
    optionValue.label = material.displayName
    options.push(optionValue)
  })

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const location = useLocation();
  const [editData,serEditData] = useState(location?.state || null)
  
  const [formData, setFormData] = useState<IFormInput>({
    jobTypeId:  "",
    materialId:  "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    jobTypeId: Yup.string().required("Job type is required"),
    materialId: Yup.string().required("Material is required"),
  });

  useEffect(() => {
    if (editData) {
      const materialIdArray = editData.materialid?.split(",")
      const materialnamesArray = editData.materialnames?.split(",")
          let finalData:any = []
          materialIdArray.map((material:any,index:any)=>{
             let option:any = {}
             option.value = parseInt(material)
             option.label = materialnamesArray[index]
             finalData.push(option)
          })
      setSelectedOptions(finalData);
      setFormData({
        jobTypeId: editData.jobtypeid || "",
        materialId:  editData.materialid || "",
      });
    }
  }, [editData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (selectedOptions: any) => {
    console.log('selectedOptions',selectedOptions)
    let selectedValue:any = []
    selectedOptions.forEach((selected:any)=>{
        selectedValue.push(selected.value)
    })
    setFormData({ ...formData, "materialId": selectedValue.join() });
    setSelectedOptions(selectedOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      if (editData) {
        let userData: any = { ...formData, id: editData.jobtypematerialid };
        makeApiCall(updateJobTypeMaterial(userData));
      } else {
        makeApiCall(addJobTypeMaterial(formData));
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
          navigate("/jobtype_material");
        } else {
          setServerError(response?.data);
        }
      })
      .catch((err: any) => {
        setIsLoading(false);
        setServerError(err?.data);
      });
  };

  const getJobTypeDetails = () => {
    dispatch(getJobType(""))
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

  const getMaterialDetails = () => {
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
    getJobTypeDetails();
    getMaterialDetails();
  }, []);

  return (
    <>
      {isLoading && <PageLoader />}
      <div className="dashboard-main-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
          <h6 className="fw-semibold mb-0">Material</h6>
          <ul className="d-flex align-items-center gap-2">
            <Link to="/jobtype_material" className="fw-medium btn btn-primary">
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
                        <label htmlFor="jobTypeId">Job type</label>
                        <select
                          className="form-control"
                          name="jobTypeId"
                          id="jobTypeId"
                          value={formData.jobTypeId}
                          disabled ={editData ? true : false}
                          onChange={handleChange}
                        >
                          <option value="">Please select </option>
                          {jobTypeList?.map((jobType: any) => {
                            return (
                              <>
                                <option value={jobType.id}>{jobType.name}</option>
                              </>
                            );
                          })}
                        </select>
                      </div>
                      {errors.jobTypeId && (
                        <p style={{ color: "red" }}>{errors.jobTypeId}</p>
                      )}
                    </div>
                    
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="materialId">Materials</label>
                        <Select
                           isMulti
                           value={selectedOptions}
                           onChange={handleSelectChange}
                           options={options}
                           placeholder="Select materials"
                         />
                      </div>
                      {errors.materialId && (
                        <p style={{ color: "red" }}>{errors.materialId}</p>
                      )}
                    </div>
                   
                  </div>
                  <br></br>
                  <div style={{ textAlign: "center", padding: "5px" }}>
                    <Link to="/jobtype_material" className="fw-medium btn btn-primary">
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
