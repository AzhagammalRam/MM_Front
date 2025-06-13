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

interface CurrentMaterialDetails {
  material: string;
  thickness: string;
  quantity: string;
  receivedDate: string;
  estimatedDispatchDate: string;
  jobTypeId: string;
  inspection: string;
  type: string;
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
    initialMaterialDetails = [];
  }

  const [materialDetails, setMaterialDetails] = useState<MaterialDetails[]>(
    initialMaterialDetails
  );

  let initialCurrentMaterialDetails: CurrentMaterialDetails = {
        material: "",
        thickness: "",
        quantity: "",
        receivedDate: new Date().toISOString().split("T")[0],
        estimatedDispatchDate: "",
        jobTypeId: "",
        inspection: "",
        type: "",
        cleaning: "",
        printing: "2",
  };
  
  const [currentMaterialDetails, setCurrentMaterialDetails] = useState<CurrentMaterialDetails>(
    initialCurrentMaterialDetails
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
  const [materialErrors, setMaterialErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    clientId: Yup.string().required("Client name is required"),
    dcNumber: Yup.string().required("DC Number is required"),
  });
  
  const validationMaterialSchema = Yup.object().shape({
    material: Yup.string().required("Material is required"),
    thickness: Yup.string().required("Thickness is required"),
    quantity: Yup.string().required("Quantity is required"),
    receivedDate: Yup.string().required("Received Date is required"),
    estimatedDispatchDate: Yup.string().required(
      "Estimated Dispatch Date is required"
    ),
    jobTypeId: Yup.string().required("Job Type is required"),
    inspection: Yup.string().required("Inspection is required"),
    type: Yup.string().required("Required coating thickness is required"),
    cleaning: Yup.string().required("Received material condition is required"),
    printing: Yup.string().required("Printing is required"),
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

  useEffect(()=>{
    if(editData?.clientId && ClientData?.length > 0){
      const client:any = ClientData.find((val:any)=>{
         return val.id == editData?.clientId
      })
      setClientFormData(client?.address?.[0]);
    }
  },[])

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
      if(materialDetails.length == 0){
        toast.error("Please add material details");
        return false;
      }
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
    setCurrentMaterialDetails({ ...currentMaterialDetails, [name]: value });
  };

  const handleSubmitMaterial = async()=>{
    try{
      await validationMaterialSchema.validate(currentMaterialDetails, { abortEarly: false });
      setMaterialErrors({})
      const newMaterial:any = { ...currentMaterialDetails }
      newMaterial.index = materialDetails.length
      setMaterialDetails([...materialDetails,newMaterial])
      setCurrentMaterialDetails(initialCurrentMaterialDetails)
    }catch(err){
      if (err instanceof Yup.ValidationError) {
        const newErrors: any = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        console.log('newErrors',newErrors)
        setMaterialErrors(newErrors);
      }
    }
     
  }

  const handleClientNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const clientId = selectedOption.value;
    const clientAddress = selectedOption.dataset.clientAddress
      ? JSON.parse(selectedOption.dataset.clientAddress)
      : null;
    setFormData({ ...formData, clientId: clientId });
    setClientFormData(clientAddress);
  };

  
  const removeMaterial = (id: number) => {
    let material = materialDetails.filter((m: any,index:any) => index != id);
    setMaterialDetails(material);
  };

  const getJobName = (jobId:any):string =>{
      const jobType:any = jobTypeList.find((val:any)=>{
         return  val.id == jobId
      })
      let process = jobType?.name || ""
      return process
  }

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
                   
                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor={`material`}>
                                Material
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name={`material`}
                                id={`material`}
                                value={currentMaterialDetails.material}
                                onChange={handleMaterialChange}
                                placeholder="Material"
                              />
                               {materialErrors.material && (
                                 <p style={{ color: "red" }}>{materialErrors.material}</p>
                               )}
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor={`thickness`}>
                                Thickness
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name={`thickness`}
                                id={`thickness`}
                                value={currentMaterialDetails.thickness}
                                onChange={handleMaterialChange}
                                placeholder="Thickness"
                              />
                              {materialErrors.thickness && (
                                 <p style={{ color: "red" }}>{materialErrors.thickness}</p>
                               )}
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor={`quantity`}>
                                Quantity (KG)
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name={`quantity`}
                                id={`quantity`}
                                value={currentMaterialDetails.quantity}
                                onChange={handleMaterialChange}
                                placeholder="Quantity"
                              />
                              {materialErrors.quantity && (
                                 <p style={{ color: "red" }}>{materialErrors.quantity}</p>
                               )}
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor={`type`}>
                                Required coating thickness
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name={`type`}
                                id={`type`}
                                value={currentMaterialDetails.type}
                                onChange={handleMaterialChange}
                                placeholder="Required coating thickness"
                              />
                              {materialErrors.type && (
                                 <p style={{ color: "red" }}>{materialErrors.type}</p>
                               )}
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor={`jobTypeId`}>
                                Process
                              </label>
                              <select
                                className="form-control"
                                name={`jobTypeId`}
                                id={`jobTypeId`}
                                value={currentMaterialDetails.jobTypeId}
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
                              {materialErrors.jobTypeId && (
                                 <p style={{ color: "red" }}>{materialErrors.jobTypeId}</p>
                               )}
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor={`receivedDate`}>
                                Received Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                name={`receivedDate`}
                                id={`receivedDate`}
                                value={currentMaterialDetails.receivedDate || new Date().toISOString().split("T")[0]}
                                onChange={handleMaterialChange}
                                min={new Date().toISOString().split("T")[0]}
                                placeholder="Received Date "
                              />
                              {materialErrors.receivedDate && (
                                 <p style={{ color: "red" }}>{materialErrors.receivedDate}</p>
                               )}
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="form-group">
                              <label
                                htmlFor={`estimatedDispatchDate`}
                              >
                                Estimated Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                name={`estimatedDispatchDate`}
                                id={`estimatedDispatchDate`}
                                value={currentMaterialDetails.estimatedDispatchDate}
                                min={new Date().toISOString().split("T")[0]}
                                onChange={handleMaterialChange}
                                placeholder="Estimated Date"
                              />
                              {materialErrors.estimatedDispatchDate && (
                                 <p style={{ color: "red" }}>{materialErrors.estimatedDispatchDate}</p>
                               )}
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor={`inspection`}>
                                Inspection
                              </label>
                              <select
                                className="form-control"
                                name={`inspection`}
                                id={`inspection`}
                                value={currentMaterialDetails.inspection}
                                onChange={handleMaterialChange} 
                              >
                                <option value="">Please select </option>
                                <option value="Internal">Internal </option>
                                <option value="Third Party">Third Party</option>
                              </select>
                              {materialErrors.inspection && (
                                 <p style={{ color: "red" }}>{materialErrors.inspection}</p>
                               )}
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor={`cleaning`}>
                                Received material condition
                              </label>
                              <select
                                className="form-control"
                                name={`cleaning`}
                                id={`cleaning`}
                                value={currentMaterialDetails.cleaning}
                                onChange={handleMaterialChange}
                              >
                                <option value="">Please select </option>
                                <option value="1">Yes </option>
                                <option value="3">No</option>
                               
                              </select>
                              {materialErrors.cleaning && (
                                 <p style={{ color: "red" }}>{materialErrors.cleaning}</p>
                               )}
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="form-group">
                              <label htmlFor={`printing`}>
                                Print
                              </label>
                              <select
                                className="form-control"
                                name={`printing`}
                                id={`printing`}
                                value={currentMaterialDetails.printing}
                                onChange={handleMaterialChange}
                              >
                                <option value="">Please select </option>
                                <option value="2">Yes </option>
                                <option value="1">No</option>
                               
                              </select>
                              {materialErrors.printing && (
                                 <p style={{ color: "red" }}>{materialErrors.printing}</p>
                               )}
                            </div>
                          </div>
                          
                          <div className="col-md-2">
                            <div className="form-group">
                              {/* <span
                                className="remove-material"
                                id={`remove-${data.index}`}
                                onClick={() => removeMaterial(data.index)}
                              > */}
                                {/* <iconify-icon icon="clarity:remove-solid"></iconify-icon> */}
                                <span className="submit-material" onClick={handleSubmitMaterial}>
                                  <iconify-icon icon="zondicons:add-solid"></iconify-icon>
                                </span>
                              {/* </span> */}
                            </div>
                          </div>
                          <br></br>
                          <hr></hr>

                        { materialDetails.length > 0 && <div className="col-lg-12">
                            <div className="card">
                              <div className="card-header">
                                <h5 className="card-title mb-0">Material List</h5>
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
                                        <th scope="col">Material</th>
                                        <th scope="col">Thickness</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Received Date</th>
                                        <th scope="col">Estimated Date</th>
                                        <th scope="col">Process</th>
                                        <th scope="col">Inspection</th>
                                        <th scope="col">Required coating thickness</th>
                                        <th scope="col">Received material condition</th>
                                        <th scope="col">Print</th>
                                        <th scope="col">Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                     {materialDetails?.map((value:any,index:number)=>{
                                        return <>
                                                <tr>
                                                  <td>{index+1}</td>
                                                  <td>{value.material}</td>
                                                  <td>{value.thickness}</td>
                                                  <td>{value.quantity}</td>
                                                  <td>{value.receivedDate}</td>
                                                  <td>{value.estimatedDispatchDate}</td>
                                                  <td>{getJobName(value.jobTypeId)}</td>
                                                  <td>{value.inspection}</td>
                                                  <td>{value.type}</td>
                                                  <td>{value.cleaning == "1" ? 'Yes' : 'No'}</td>
                                                  <td>{value.printing == "2" ? 'Yes' : 'No'}</td>
                                                  <td> 
                                                    <span onClick={() => removeMaterial(index)} >
                                                      <iconify-icon icon="clarity:remove-solid"></iconify-icon>
                                                    </span> 
                                                  </td>
                                                </tr>
                                            </>
                                        })
                                      }
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div> }

                  <hr></hr>
                       
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
