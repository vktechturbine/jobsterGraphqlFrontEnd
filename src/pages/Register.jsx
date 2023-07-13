import React, { useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import Logo from '../components/Logo';
import FormRow from '../components/FormRow';
import { toast } from 'react-toastify';
import { loginUser,registerUser } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
;const initialState = {
  name :'',
  email:'',
  password:'',
  isUser:true
}
const Register = () => {
const [values,setValues] = useState(initialState);
console.log("Hello");
console.log(values);
console.log("World");
const dispatch = useDispatch();
const {isLoading,user}  = useSelector((state) => state.user);
const navigate = useNavigate();
useEffect(() =>{
  if(user)
  {
    setTimeout(() => {
      navigate('/');
    },3000)
  }
},[user,navigate]);
const toggleMember = () => {
  setValues({...values,isUser:!values.isUser});
}

 const handleChange = (e) =>{
 const name = e.target.name;
 
 const value = e.target.value;
 setValues({...values,[name]:value})
 
}

const onSubmit = (e) => {
  
  e.preventDefault();

  const {name,email,password,isUser} = values;
 /*  if(!email || !password || (!isUser || name))
  {
    toast.error("Please Fill Out All Fields");
    return;
  } */
  if(isUser)
  {
    dispatch(loginUser({email:email,password:password}));
    return;
  }
  dispatch(registerUser({name,email,password}));
}
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo/>
        {!values.isUser &&
          <FormRow type="text" value={values.name} handleChange={handleChange} labelText="Name" name='name' />
        }
        <FormRow type="email" value={values.email} handleChange={handleChange} labelText="Email" name='email' />
        <FormRow type="password" value={values.password} handleChange={handleChange} labelText="PassWord" name='password'/>
      <button type='submit' className='btn btn-block'>
          submit
        </button>
        <button type='button' className='btn btn-block btn-hipster' disabled={isLoading} onClick={() => dispatch(loginUser({email:'testUser@test.com',password:'secret'}))}>{isLoading ? 'loading...' : 'demo'}</button>
        <p>
          {values.isUser ? 'Not a member yet?': 'Already a member'}
          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isUser ? 'Register':'Login'}
          </button>
        </p>
      </form> 
    </Wrapper>
  )
}

export default Register