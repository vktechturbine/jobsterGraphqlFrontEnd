import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toast } from 'react-toastify';
import FormRow from '../../components/FormRow';
import { updateUser } from '../../features/user/userSlice';

const Profile = () => {
  const {isLoading,user} = useSelector((store) => store.user);
  console.log(isLoading)
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name:user?.name || '',
    email:user?.email || '',
    lastName:user?.lastName || '',
    location:user?.location || '',
    userId:user?.userId || ''
  })
  
  console.log(userData);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const {name, email,lastName,location,userId} = userData;
    console.log(userData);
    if(!name || !email || !lastName || !location )
    {
      toast.error('please Fill Out All Fields');
      return;
    }
    dispatch(updateUser({name,email,lastName,location,userId}));
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({...userData,[name]:value});
    
  }
  return (
   <main className='dashboardFormPage'>
       <form className='form' onSubmit={handleSubmit}>
      <h3>Profile</h3>
      <div className='form-center'>
        <input type="hidden" name='userId' value={userData.userId} handleChange={handleChange}/>
        <FormRow type='text' name='name' value={userData.name} handleChange={handleChange}/>
        <FormRow type='text' labelText='last name' name='lastName' value={userData.lastName} handleChange={handleChange}/>
        <FormRow type='email' name='email' value={userData.email} handleChange={handleChange}/>
        <FormRow type='text' name='location' value={userData.location} handleChange={handleChange}/>
        <button className='btn btn-block' type='submit' disabled={isLoading}>{isLoading ? 'please Wait...':'save changes'}</button>
      </div>
    </form>
   </main>
  )
}

export default Profile