import React,{ useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {  useDispatch } from 'react-redux';
import { login, addMessage } from '../redux/reducers/AuthSlice'
import { AppDispatch } from '../redux/store'
import { toast } from 'react-toastify';
import AlertComponent  from '../components/AlertComponent'

interface IFormInput {
    email: string;
    password: string;
}


const Register:React.FC = ()=>{
    const navigate = useNavigate();
    const dispatch:AppDispatch = useDispatch();

    const [viewPassword, setViewPassword ] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const [serverError, setServerError] = useState([])
    
    const [formData, setFormData] = useState<IFormInput>(
        { 
            email: '',
            password: '' 
        }
    );

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validationSchema = Yup.object().shape({
        email: Yup.string()
          .email('Invalid email format')
          .required('Email is required'),
        password: Yup.string()
          .required('Password is required')
          .min(5, 'Password must be at least 6 characters long'),
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

          dispatch(login(formData))
            .unwrap()
            .then((response:any)=>{
              setIsLoading(false)
              if(response?.status === 200){
                toast.success(response?.message);
                setServerError([])
                localStorage.setItem("token", response.token);
                if(response.role == 1){
                  navigate('/home')
                }else if(response.role == 1){
                  navigate('/material_inward')
                }else{
                  navigate('/production_details')
                }
                
              }else{
                setServerError(response?.data)
              }
            })
            .catch((err:any) => {
              setServerError(err?.data)
              toast.error(err?.message);
               setIsLoading(false)
               dispatch(addMessage({'error':err}))
            });
          
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

    const handleViewPassword = () => {
        setViewPassword(!viewPassword)
    }

   
    return (
        <>
         <section className="auth bg-base d-flex flex-wrap">  
            <div className="auth-left d-lg-block d-none">
                <div className="d-flex align-items-center flex-column h-100 justify-content-center">
                    <img src="assets/images/auth/auth-img.png" alt="" />
                </div>
            </div>
            <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
                <div className="max-w-464-px mx-auto w-100">
                    <div>
                        <a href="index.html" className="mb-40 max-w-290-px">
                            <img src="assets/images/logo.png" alt="" />
                        </a>
                        <h4 className="mb-12">Sign In</h4>
                    </div>
                    {AlertComponent?.length > 0 && <AlertComponent serverError={serverError}/>}
                    <form onSubmit={handleSubmit}>
                        <div className="icon-field mb-16">
                            <span className="icon top-50 translate-middle-y">
                                <iconify-icon icon="mage:email"></iconify-icon>
                            </span>
                            <input 
                              type="text" 
                              name ="email"
                              value={formData.email}
                              onChange={handleChange} 
                              className="form-control h-56-px bg-neutral-50 radius-12" 
                              placeholder="Email" 
                            />
                            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                        </div>
                        <div className="position-relative mb-20">
                            <div className="icon-field">
                                <span className="icon top-50 translate-middle-y" onClick={handleViewPassword}>
                                    <iconify-icon icon="solar:lock-password-outline"></iconify-icon>
                                </span> 
                                <input 
                                    type={viewPassword ? "text" : "password"} 
                                    name ="password"
                                    value={formData.password}
                                    onChange={handleChange} 
                                    className="form-control h-56-px bg-neutral-50 radius-12" 
                                    placeholder="Password" 
                                    />
                                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                            </div>
                            <span className="toggle-password ri-eye-line cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light" data-toggle="#your-password"></span>
                        </div>
                       
                        <button type="submit" className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"> Sign In</button>

                        <div className="mt-32 text-center text-sm">
                        <p className="mb-0">Don't have account? <Link to="/register" className="text-primary-600 fw-semibold">Sign Up</Link></p>
                        </div>
                        
                    </form>
                </div>
            </div>
        </section>
        </>
    )
}

export default Register;