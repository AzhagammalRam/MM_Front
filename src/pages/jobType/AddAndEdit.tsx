import React,{ useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import {  useDispatch } from 'react-redux';
import { addJobTypes, updateJobType} from '../../redux/reducers/CommonSlice'
import { AppDispatch } from '../../redux/store'
import { toast } from 'react-toastify';
import AlertComponent  from '../../components/AlertComponent'
import PageLoader from '../../components/PageLoader';

interface IFormInput {
    name: string;
}


const AddAndEditFloor: React.FC = () => {

  const navigate = useNavigate();
  const dispatch:AppDispatch = useDispatch();
  const [isLoading,setIsLoading] = useState(false)
  const [serverError, setServerError] = useState([])
  const location = useLocation();
  const editData = location?.state ;

  const [formData, setFormData] = useState<IFormInput>(
      { 
        name: editData?.name || "",
      }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
      name: Yup.string()
        .required('Floor name is required'),
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
          let userData:any = {...formData,id:editData.id }
          makeApiCall(updateJobType(userData))
        }else{
          makeApiCall(addJobTypes(formData))
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
        navigate('/jobType')
      }else{
        setServerError(response?.data)
      }
    })
    .catch((err:any) => {
       setIsLoading(false)
       setServerError(err?.data)
    });
  }

  return (
    <>
     { isLoading && <PageLoader/>}
      <div className="dashboard-main-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
          <h6 className="fw-semibold mb-0">Job type</h6>
          <ul className="d-flex align-items-center gap-2">
             <Link to='/jobType' className="fw-medium btn btn-primary">Back</Link>
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
                          <label htmlFor="clientName">Job type</label>
                          <input 
                             type="text" 
                             className="form-control" 
                             name="name" 
                             id="name" 
                             value={formData.name}
                             onChange={handleChange} 
                             placeholder="Job type" 
                             />
                             {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                      </div>
                   </div>
                </div>
                <br></br>
                <div style={{textAlign:'center',padding:"5px"}}>
                   <Link to='/jobType' className="fw-medium btn btn-primary">Back</Link>
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

export default AddAndEditFloor;
