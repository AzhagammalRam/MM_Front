import React,{ useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import {  useDispatch } from 'react-redux';
import { addSupplier,editSupplier, addMessage } from '../../redux/reducers/ClientSlice'
import { AppDispatch } from '../../redux/store'
import { toast } from 'react-toastify';
import AlertComponent  from '../../components/AlertComponent'
import PageLoader from '../../components/PageLoader';
import './client.css'

interface IFormInput {
    clientName: string;
    email: string;
    contact: string;
    pincode: string;
    address: string;
    area: string;
    city: string;
    contactPersonName: string;
    contactPersonContact: string;
    description: string;
    bankAccount: string;
    bankBranch: string;
    ifsc: string;
    namePerBank: string;
}


const AddAndEditClient: React.FC = () => {

  const navigate = useNavigate();
  const dispatch:AppDispatch = useDispatch();
  const [isLoading,setIsLoading] = useState(false)
  const [serverError, setServerError] = useState([])
  const location = useLocation();
  const editData = location?.state ;
 console.log('editData',editData)
  const [formData, setFormData] = useState<IFormInput>(
      { 
        clientName: editData?.clientName || "",
        email: editData?.address?.[0]?.email || "",
        contact: editData?.address?.[0]?.contact || "",
        pincode: editData?.address?.[0]?.pincode || "",
        address: editData?.address?.[0]?.address || "",
        area: editData?.address?.[0]?.area || "",
        city: editData?.address?.[0]?.city || "",
        contactPersonName: editData?.address?.[0]?.contactPersonName || "",
        contactPersonContact: editData?.address?.[0]?.contactPersonContact || "",
        description: editData?.address?.[0]?.description || "",
        bankAccount: editData?.bankAccount || "",
        bankBranch: editData?.bankBranch || "",
        ifsc: editData?.ifsc || "",
        namePerBank: editData?.namePerBank || "",
      }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      clientName: Yup.string()
        .required('Supplier name is required'),
      contact: Yup.string()
        .required('Contact  is required')
        .min(10, 'Contact  must be at least 10 characters long'),
      address: Yup.string()
        .required('Address  is required'),
      area: Yup.string()
        .required('Area is required'),
      city: Yup.string()
        .required('City  is required'),
      pincode: Yup.string()
        .required('Pincode  is required'),
      contactPersonName: Yup.string()
        .required('Contact person name is required'),
      contactPersonContact: Yup.string()
        .required('Contact person contact is required')
        .min(10, 'Contact person contact must be at least 10 characters long'),
      bankAccount: Yup.string()
        .required('Account no  is required'),
      bankBranch: Yup.string()
        .required('Branch  is required'),
      ifsc: Yup.string()
        .required('IFSC  is required'),
      namePerBank: Yup.string()
        .required('Name  is required'),
      });

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
        if(editData){
          let userData:any = {...formData,clientId:editData.id,addressId :editData.address?.[0]?.id }
          makeApiCall(editSupplier(userData))
        }else{
          makeApiCall(addSupplier(formData))
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

  const makeApiCall = (functionName:any)=>{
    dispatch(functionName)
    .unwrap()
    .then((response:any)=>{
      setIsLoading(false)
      if(response?.status === 200 || response?.status === 201){
        toast.success(response?.message);
        setServerError([])
        navigate('/client')
      }else{
        setServerError(response?.data)
      }
    })
    .catch((err:any) => {
       setIsLoading(false)
       dispatch(addMessage({'error':err}))
    });
  }

  return (
    <>
     { isLoading && <PageLoader/>}
      <div className="dashboard-main-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
          <h6 className="fw-semibold mb-0">Customer</h6>
          <ul className="d-flex align-items-center gap-2">
             <Link to='/client' className="fw-medium btn btn-primary">Back</Link>
          </ul>
        </div>

        <div className="row gy-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
              {serverError?.length > 0 && <AlertComponent serverError={serverError}/>}
              <form onSubmit={handleSubmit}>
                <div className="row formStyle">
                   <div className="col-md-6">
                      <div className="form-group">
                          <label htmlFor="clientName">Customer Name</label>
                          <input 
                             type="text" 
                             className="form-control" 
                             name="clientName" 
                             id="clientName" 
                             value={formData.clientName}
                             onChange={handleChange} 
                             placeholder="Customer Name" 
                             />
                             {errors.clientName && <p style={{ color: 'red' }}>{errors.clientName}</p>}
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
                             value={formData.address}
                             onChange={handleChange} 
                             placeholder="Customer Address" 
                          />
                          {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
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
                            value={formData.email}
                            onChange={handleChange} 
                            placeholder="Customer email" 
                            />
                            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
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
                             value={formData.area}
                             onChange={handleChange} 
                             placeholder="Customer Area" 
                          />
                          {errors.area && <p style={{ color: 'red' }}>{errors.area}</p>}
                      </div>
                   </div>

                   <div className="col-md-6">
                      <div className="form-group">
                          <label htmlFor="contact">Customer Contact</label>
                          <input type="text"
                             className="form-control"
                              name="contact" 
                              id="contact"
                              value={formData.contact}
                              onChange={handleChange} 
                              placeholder="Customer Contact" 
                            />
                            {errors.contact && <p style={{ color: 'red' }}>{errors.contact}</p>}
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
                             value={formData.city}
                             onChange={handleChange} 
                             placeholder="Customer city" 
                          />
                          {errors.city && <p style={{ color: 'red' }}>{errors.city}</p>}
                      </div>
                   </div>
                   

                   <div className="col-md-6">
                      <div className="form-group">
                          <label htmlFor="contactPersonName">Contact Person Name</label>
                          <input 
                              type="text" 
                              className="form-control" 
                              name="contactPersonName" 
                              id="contactPersonName" 
                              value={formData.contactPersonName}
                              onChange={handleChange} 
                              placeholder="Contact Person Name" 
                            />
                            {errors.contactPersonName && <p style={{ color: 'red' }}>{errors.contactPersonName}</p>}
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
                             value={formData.pincode}
                             onChange={handleChange} 
                             placeholder="pincode" 
                          />
                          {errors.pincode && <p style={{ color: 'red' }}>{errors.pincode}</p>}
                      </div>
                   </div>
                  
                   <div className="col-md-6">
                      <div className="form-group">
                          <label htmlFor="contactPersonContact">Contact Person Contact</label>
                          <input 
                             type="text" 
                             className="form-control" 
                             name="contactPersonContact" 
                             id="contactPersonContact" 
                             value={formData.contactPersonContact}
                              onChange={handleChange} 
                             placeholder="Contact Person Contact" 
                          />
                          {errors.contactPersonContact && <p style={{ color: 'red' }}>{errors.contactPersonContact}</p>}
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
                            value={formData.description}
                            onChange={handleChange} 
                            placeholder="Description" 
                          />
                      </div>
                   </div>
                   <hr></hr>
                   <br></br>
                   <div className="col-md-6">
                      <div className="form-group">
                          <label htmlFor="namePerBank">Name (As per bank)</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="namePerBank" 
                            id="namePerBank" 
                            value={formData.namePerBank}
                            onChange={handleChange} 
                            placeholder="Name" 
                          />
                           {errors.namePerBank && <p style={{ color: 'red' }}>{errors.namePerBank}</p>}
                      </div>
                   </div>
                   <div className="col-md-6">
                      <div className="form-group">
                          <label htmlFor="bankAccount">Bank Account</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="bankAccount" 
                            id="bankAccount" 
                            value={formData.bankAccount}
                            onChange={handleChange} 
                            placeholder="Bank Account" 
                          />
                           {errors.bankAccount && <p style={{ color: 'red' }}>{errors.bankAccount}</p>}
                      </div>
                   </div>
                   <div className="col-md-6">
                      <div className="form-group">
                          <label htmlFor="ifsc">IFSC Code</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="ifsc" 
                            id="ifsc" 
                            value={formData.ifsc}
                            onChange={handleChange} 
                            placeholder="IFSC Code" 
                          />
                           {errors.ifsc && <p style={{ color: 'red' }}>{errors.ifsc}</p>}
                      </div>
                   </div>
                   <div className="col-md-6">
                      <div className="form-group">
                          <label htmlFor="bankBranch">Bank Branch</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="bankBranch" 
                            id="bankBranch" 
                            value={formData.bankBranch}
                            onChange={handleChange} 
                            placeholder="Bank Branch" 
                          />
                           {errors.bankBranch && <p style={{ color: 'red' }}>{errors.bankBranch}</p>}
                      </div>
                   </div>
                </div>
                <br></br>
                <div style={{textAlign:'center',padding:"5px"}}>
                   <Link to='/client' className="fw-medium btn btn-primary">Back</Link>
                   <button type="submit" style={{marginLeft:"5px"}}   className="btn btn-success">{editData ? 'Update' : 'Submit'}</button>
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

export default AddAndEditClient;
