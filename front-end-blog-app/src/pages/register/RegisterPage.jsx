import React  ,{useEffect} from 'react'
import MainLayout from '../../components/MainLayout'
import { useForm } from 'react-hook-form'; 
import { Link, useNavigate} from 'react-router-dom'

import { images } from '../../constants'
import { useMutation } from '@tanstack/react-query';
import { signup } from '../../services/index/users';
import { toast } from 'react-hot-toast';
import { useDispatch ,useSelector } from 'react-redux';
import { userActions } from '../../store/reducers/userReducers';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user)

  const{mutate , isLoading}= useMutation({
    mutationFn: ({name , email ,password})=>{
      return signup({name, email, password});
    },

    onSuccess:(data) =>{

      dispatch(userActions.setUserInfo(data));
      localStorage.setItem('account', JSON.stringify(data));


    },
    onError:(error) =>{
      toast.error(error.message)
      console.log(error);
    }
  })

  useEffect(() =>{
    if(userState.userInfo){
      navigate("/");
    }

  } , [navigate , userState.userInfo]);


  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const {name, email, password} = data;
    mutate({ name, email , password})
   
  };

  const password = watch("password");


  return (
    <MainLayout>
      <div className=' lg:ml-17 container m-auto mb-20   justify-center px-10 py-10b  w-full lg:w-3/4'>
      <div className=' flex mt-4  bg-transparent justify-center flex-row '>
          <h2 className='items-center font-bold text-3xl  font-roboto mt-0  text-center'>Sign Up</h2>
        </div>
      <section className='container flex mx-auto -m-10  px-5 py-10 w-full shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]  '>
        

        <div className='w-full max-w-sm mx-auto mr-4 mt-4 md:justify-between md:ml-auto md:mr-auto'>
          <form onSubmit={handleSubmit(submitHandler) }>

            <div className='flex flex-col mb-2 w-full'>
            <label
                htmlFor="name"
                className="text-[#5a7184] font-semibold block"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  minLength: {
                    value: 3,
                    message: "Name length must be at least 3 character",
                  },
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                placeholder="Enter name"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.name ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.name?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="email"
                className="text-[#5a7184] font-semibold block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Enter a valid email",
                  },
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                })}
                placeholder="Enter email"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.email ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.email?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="password"
                className="text-[#5a7184] font-semibold block"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Password length must be at least 6 characters",
                  },
                })}
                placeholder="Enter password"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.password ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.password?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="confirmPassword"
                className="text-[#5a7184] font-semibold block"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Confirm password is required",
                  },
                  validate: (value) => {
                    if (value !== password) {
                      return "Passwords do not match";
                    }
                  },
                })}
                placeholder="Enter confirm password"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.confirmPassword ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.confirmPassword?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={!isValid  || isLoading }
              className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Register
            </button>
            <p className="text-sm font-semibold text-[#5a7184]">
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Login now
              </Link>
            </p>
          </form>
        </div>
        
        <div className='lg:flex lg:flex-col lg:w-1/2 lg:mt-2 ml-4 '>
          <img src={images.login} alt="img" className='mt-4  h-fit' />
        </div>
      </section>
      </div>
    </MainLayout>
  )
}

export default RegisterPage