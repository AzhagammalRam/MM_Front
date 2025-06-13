import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  addMaterialInward,
  editMaterialInwardr,
  addMessage,
} from "../../redux/reducers/materialSlice";
import { getAllSupplier } from "../../redux/reducers/ClientSlice";
import { getJobType } from "../../redux/reducers/CommonSlice";
import { toast } from "react-toastify";
import AlertComponent from "../../components/AlertComponent";
import PageLoader from "../../components/PageLoader";
import "./material_inward.css";

interface ClientFormInput {
  email: string;
  contact: string;
  pincode: string;
  address: string;
  area: string;
  city: string;
  contactPersonName: string;
  contactPersonContact: string;
  description: string;
}

interface IFormInput {
  clientId: string;
  dcNumber: number;
  dcImage: any;
}

interface MaterialDetails {
  index: number;
  material: string;
  thickness: string;
  quantity: string;
  receivedDate: string;
  estimatedDispatchDate: string;
  jobTypeId: string;
  inspection: string;
  type: string;
  length: string;
  cleaning: string;
  printing: string;
}

const AddAndEditMaterialInward: React.FC = () => {
  const ClientData = useSelector(
    (state: RootState) => state.client.allSupplier
  );
  const jobTypeList = useSelector(
    (state: RootState) => state.common.getJobType
  );
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState([]);

  const location = useLocation();
  const editData = location?.state;

  const [formData, setFormData] = useState<IFormInput>({
    clientId: editData?.clientId || "",
    dcNumber: editData?.dcNumber || "",
    dcImage: "",
  });

  let initialMaterialDetails: MaterialDetails[] = [];
  if (editData && editData?.materialInwardDetails?.length > 0) {
    editData?.materialInwardDetails?.map((data: any, index: number) => {
      let material: any = {};
      material.index = index;
      material.material = data.material;
      material.thickness = data.thickness;
      (material.quantity = data?.quantity || ""),
        (material.receivedDate = data?.receivedDate
          ? new Date(data?.receivedDate).toISOString().slice(0, 10)
          : ""),
        (material.estimatedDispatchDate = data?.estimatedDispatchDate
          ? new Date(data?.estimatedDispatchDate).toISOString().slice(0, 10)
          : ""),
        (material.jobTypeId = data?.jobTypeId || ""),
        (material.inspection = data?.inspection || ""),
        (material.type = data?.type || ""),
        (material.length = data?.length || ""),
        (material.cleaning = data?.cleaning || ""),
        (material.printing = data?.printing || ""),
        initialMaterialDetails.push(material);
    });
  } else {
    initialMaterialDetails = [
      {
        index: 1,
        material: "",
        thickness: "",
        quantity: "",
        receivedDate: "",
        estimatedDispatchDate: "",
        jobTypeId: "",
        inspection: "",
        type: "",
        length: "",
        cleaning: "",
        printing: "",
      },
    ];
  }

  const [materialDetails, setMaterialDetails] = useState<MaterialDetails[]>(
    initialMaterialDetails
  );
  const [clientFormData, setClientFormData] = useState<ClientFormInput>({
    email: "",
    contact: "",
    pincode: "",
    address: "",
    area: "",
    city: "",
    contactPersonName: "",
    contactPersonContact: "",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    clientId: Yup.string().required("Client name is required"),
    dcNumber: Yup.string().required("DC Number is required"),
  });

  const validationMaterialDetailsSchema = Yup.object().shape({
    items: Yup.array().of(
      Yup.object().shape({
        material: Yup.string().required("Material is required"),
        thickness: Yup.string().required("Thickness is required"),
        quantity: Yup.string().required("Quantity is required"),
        receivedDate: Yup.string().required("Received Date is required"),
        estimatedDispatchDate: Yup.string().required(
          "Estimated Dispatch Date is required"
        ),
        jobTypeId: Yup.string().required("Job Type is required"),
        inspection: Yup.string().required("Inspection is required"),
        type: Yup.string().required("Type is required"),
        length: Yup.string().required("Length is required"),
        cleaning: Yup.string().required("Cleaning is required"),
        printing: Yup.string().required("Printing is required"),
      })
    ),
  });

  const getJobTypeDetails = () => {
    dispatch(getJobType({}))
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
        dispatch(addMessage({ error: err }));
      });
  };

  const getSupplierData = () => {
    dispatch(getAllSupplier({}))
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
        dispatch(addMessage({ error: err }));
      });
  };

  useEffect(() => {
    getJobTypeDetails();
    getSupplierData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "dcImage") {
      if (e.target.files && e.target.files.length > 0) {
        setFormData({ ...formData, [name]: e.target.files[0] });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      // await validationMaterialDetailsSchema.validate(materialDetails, { abortEarly: false })
      setErrors({});
      const formPayload = new FormData();
      Object.keys(formData).forEach((key) => {
        const typedKey = key as keyof IFormInput;
        const value = formData[typedKey];
        formPayload.append(key, value);
      });
      formPayload.append("materialDetails", JSON.stringify(materialDetails));

      if (editData) {
        formPayload.append("materialInwardId", editData.id);
        formPayload.append("oldDCImage", editData.dcImage);
        makeApiCall(editMaterialInwardr(formPayload));
      } else {
        makeApiCall(addMaterialInward(formPayload));
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: any = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        console.log('newErrors',newErrors)
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
          navigate("/material_inward");
        } else {
          setServerError(response?.data);
        }
      })
      .catch((err: any) => {
        setIsLoading(false);
        dispatch(addMessage({ error: err }));
      });
  };

  const handleMaterialChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let nameAndId = name.split("-");
    let materialUpdate = materialDetails.map((material: any) => {
      if (material.index == nameAndId[1]) {
        return { ...material, [nameAndId[0]]: value };
      }
      return material;
    });
    setMaterialDetails(materialUpdate);
  };

  const handleClientNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const clientId = selectedOption.value;
    const clientAddress = selectedOption.dataset.clientAddress
      ? JSON.parse(selectedOption.dataset.clientAddress)
      : null;
    setFormData({ ...formData, clientId: clientId });
    setClientFormData(clientAddress);
  };

  const addMaterial = () => {
    let material = [
      ...materialDetails,
      {
        index: materialDetails.length + 1,
        material: "",
        thickness: "",
        quantity: "",
        receivedDate: "",
        estimatedDispatchDate: "",
        jobTypeId: "",
        inspection: "",
        type: "",
        length: "",
        cleaning: "",
        printing: "",
      },
    ];
    setMaterialDetails(material);
  };
  const removeMaterial = (id: number) => {
    let material = materialDetails.filter((m: any) => m.index != id);
    setMaterialDetails(material);
  };

  return (
    <>
      {isLoading && <PageLoader />}
      <div className="dashboard-main-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
          <h6 className="fw-semibold mb-0">Material Inward</h6>
          <ul className="d-flex align-items-center gap-2">
            <Link to="/material_inward" className="fw-medium btn btn-primary">
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
                        <label htmlFor="clientId">Customer Name</label>
                        <select
                          className="form-control"
                          name="clientId"
                          id="clientId"
                          value={formData.clientId}
                          onChange={handleClientNameChange}
                        >
                          <option value="">Please select</option>
                          {ClientData.map((client: any) => {
                            return (
                              <>
                                <option
                                  id={client.id}
                                  data-client-address={JSON.stringify(
                                    client.address?.[0]
                                  )}
                                  value={client.id}
                                >
                                  {client.clientName}
                                </option>
                              </>
                            );
                          })}
                        </select>
                        {errors.clientId && (
                          <p style={{ color: "red" }}>{errors.clientId}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="address">Customer Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          id="address"
                          disabled={true}
                          value={clientFormData.address}
                          placeholder="Customer Address"
                        />
                        {errors.address && (
                          <p style={{ color: "red" }}>{errors.address}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email">Customer Email</label>
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          id="email"
                          disabled={true}
                          value={clientFormData.email}
                          placeholder="Customer email"
                        />
                        {errors.email && (
                          <p style={{ color: "red" }}>{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="area">Customer Area</label>
                        <input
                          type="text"
                          className="form-control"
                          name="area"
                          id="area"
                          disabled={true}
                          value={clientFormData.area}
                          placeholder="Customer Area"
                        />
                        {errors.area && (
                          <p style={{ color: "red" }}>{errors.area}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="contact">Customer Contact</label>
                        <input
                          type="text"
                          className="form-control"
                          name="contact"
                          id="contact"
                          disabled={true}
                          value={clientFormData.contact}
                          placeholder="Customer Contact"
                        />
                        {errors.contact && (
                          <p style={{ color: "red" }}>{errors.contact}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="city">Customer city</label>
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          id="city"
                          disabled={true}
                          value={clientFormData.city}
                          placeholder="Customer city"
                        />
                        {errors.city && (
                          <p style={{ color: "red" }}>{errors.city}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="contactPersonName">
                          Contact Person Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="contactPersonName"
                          id="contactPersonName"
                          value={clientFormData.contactPersonName}
                          disabled={true}
                          placeholder="Contact Person Name"
                        />
                        {errors.contactPersonName && (
                          <p style={{ color: "red" }}>
                            {errors.contactPersonName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="city">Pincode</label>
                        <input
                          type="text"
                          className="form-control"
                          name="pincode"
                          id="pincode"
                          disabled={true}
                          value={clientFormData.pincode}
                          placeholder="pincode"
                        />
                        {errors.pincode && (
                          <p style={{ color: "red" }}>{errors.pincode}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="contactPersonContact">
                          Contact Person Contact
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="contactPersonContact"
                          id="contactPersonContact"
                          value={clientFormData.contactPersonContact}
                          disabled={true}
                          placeholder="Contact Person Contact"
                        />
                        {errors.contactPersonContact && (
                          <p style={{ color: "red" }}>
                            {errors.contactPersonContact}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                          type="text"
                          className="form-control"
                          name="description"
                          id="description"
                          value={clientFormData.description}
                          disabled={true}
                          placeholder="Description"
                        />
                      </div>
                    </div>
                    <hr></hr>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="dcNumber">DC Number</label>
                        <input
                          type="text"
                          className="form-control"
                          name="dcNumber"
                          id="dcNumber"
                          value={formData.dcNumber}
                          onChange={handleChange}
                          placeholder="DC Number"
                        />
                      </div>
                      {errors.dcNumber && (
                        <p style={{ color: "red" }}>{errors.dcNumber}</p>
                      )}
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="dcImage">
                          DC Image &#8203;
                          {editData?.dcImage ? (
                            <span>
                              <a
                                target="_blank"
                                href={`${process.env.REACT_APP_BACKEND_FILE_URL}/materialInwards/1724748362096.pdf`}
                                download
                              >
                                <iconify-icon icon="mingcute:download-fill"></iconify-icon>
                              </a>
                            </span>
                          ) : (
                            <span></span>
                          )}
                        </label>

                        <input
                          type="file"
                          className="form-control"
                          name="dcImage"
                          id="dcImage"
                          onChange={handleChange}
                          placeholder="DC Image"
                        />
                      </div>
                      {errors.dcImage && (
                        <p style={{ color: "red" }}>{errors.dcImage}</p>
                      )}
                    </div>

                    <hr></hr>
                    <span className="add-material" onClick={addMaterial}>
                      <iconify-icon icon="zondicons:add-solid"></iconify-icon>
                    </span>
                    {materialDetails.map((data) => {
                      return (
                        <>
                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor={`material-${data.index}`}>
                                Material
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name={`material-${data.index}`}
                                id={`material-${data.index}`}
                                value={data.material}
                                onChange={handleMaterialChange}
                                placeholder="Material"
                              />
                            </div>
                            {errors.material && (
                              <p style={{ color: "red" }}>{errors.material}</p>
                            )}
                          </div>
                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor={`thickness-${data.index}`}>
                                Thickness
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name={`thickness-${data.index}`}
                                id={`thickness-${data.index}`}
                                value={data.thickness}
                                onChange={handleMaterialChange}
                                placeholder="Thickness"
                              />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor={`quantity-${data.index}`}>
                                Quantity (KG)
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name={`quantity-${data.index}`}
                                id={`quantity-${data.index}`}
                                value={data.quantity}
                                onChange={handleMaterialChange}
                                placeholder="Quantity"
                              />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor={`type-${data.index}`}>
                                Required coating thickness
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name={`type-${data.index}`}
                                id={`type-${data.index}`}
                                value={data.type}
                                onChange={handleMaterialChange}
                                placeholder="Required coating thickness"
                              />
                            </div>
                          </div>

                          {/* <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor={`length-${data.index}`}>
                                Length{" "}
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name={`length-${data.index}`}
                                id={`length-${data.index}`}
                                value={data.length}
                                onChange={handleMaterialChange}
                                placeholder="Length"
                              />
                            </div>
                          </div> */}

                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor={`jobTypeId-${data.index}`}>
                                Process
                              </label>
                              <select
                                className="form-control"
                                name={`jobTypeId-${data.index}`}
                                id={`jobTypeId-${data.index}`}
                                value={data.jobTypeId}
                                onChange={handleMaterialChange}
                              >
                                <option value="">Please select </option>
                                {jobTypeList?.map((jobList: any) => {
                                  return (
                                    <>
                                      <option value={jobList.id}>
                                        {jobList.name}
                                      </option>
                                    </>
                                  );
                                })}
                
                              </select>
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor={`receivedDate-${data.index}`}>
                                Received Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                name={`receivedDate-${data.index}`}
                                id={`receivedDate-${data.index}`}
                                value={data.receivedDate || new Date().toISOString().split("T")[0]}
                                onChange={handleMaterialChange}
                                min={new Date().toISOString().split("T")[0]}
                                placeholder="Received Date "
                              />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="form-group">
                              <label
                                htmlFor={`estimatedDispatchDate-${data.index}`}
                              >
                                Estimated Date{" "}
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                name={`estimatedDispatchDate-${data.index}`}
                                id={`estimatedDispatchDate-${data.index}`}
                                value={data.estimatedDispatchDate}
                                min={new Date().toISOString().split("T")[0]}
                                onChange={handleMaterialChange}
                                placeholder="Estimated Date"
                              />
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor={`inspection-${data.index}`}>
                                Inspection
                              </label>
                              <select
                                className="form-control"
                                name={`inspection-${data.index}`}
                                id={`inspection-${data.index}`}
                                value={data.inspection}
                                onChange={handleMaterialChange} 
                              >
                                <option value="">Please select </option>
                                <option value="Internal">Internal </option>
                                <option value="Third Party">Third Party</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor={`cleaning-${data.index}`}>
                                Received material condition
                              </label>
                              <select
                                className="form-control"
                                name={`cleaning-${data.index}`}
                                id={`cleaning-${data.index}`}
                                value={data.cleaning}
                                onChange={handleMaterialChange}
                              >
                                <option value="">Please select </option>
                                <option value="1">Yes </option>
                                <option value="3">No</option>
                               
                              </select>
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor={`printing-${data.index}`}>
                                Print
                              </label>
                              <select
                                className="form-control"
                                name={`printing-${data.index}`}
                                id={`printing-${data.index}`}
                                value={data.printing}
                                onChange={handleMaterialChange}
                              >
                                {/* <option value="">Please select </option> */}
                                <option value="2">Yes </option>
                                <option value="1">No</option>
                               
                              </select>
                            </div>
                          </div>
                          
                          <div className="col-md-2">
                            <div className="form-group">
                              <span
                                className="remove-material"
                                id={`remove-${data.index}`}
                                onClick={() => removeMaterial(data.index)}
                              >
                                <iconify-icon icon="clarity:remove-solid"></iconify-icon>
                              </span>
                            </div>
                          </div>
                          <br></br>
                          <hr></hr>
                        </>
                      );
                    })}
                  </div>
                  <br></br>
                  <div style={{ textAlign: "center", padding: "5px" }}>
                    <Link
                      to="/material_inward"
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAndEditMaterialInward;
