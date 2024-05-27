import React, { useState } from 'react'
import register from '../../assets/register.png'
import Card from '../../components/card/Card'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebase/Config'
import Loader from '../../components/loader/Loader';
const Signup = () => {
    const [email,setEmail] =useState("");
    const [password,setPassword] =useState("");
    const [cpassword,setCPassword] =useState("");
    const [isLoading,setIsLoading] =useState(false);
    const navigate =useNavigate();

    const registerUser = (e) => {
        e.preventDefault();
        if (password !== cpassword){
            toast.error("Your Password dose not matches with the confirm password")
        }
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    setIsLoading(false)
    toast.success("Registration successfully!")
    navigate('/login')
  })
  .catch((error) => {
    toast.error(error.message)
  });

    }
    
  return (
    <>
        <ToastContainer />
    {isLoading && <Loader/> }
    <section className='auth'>
        <Card>
        <div className="form">
        <h2>Register</h2>
        <form onSubmit={registerUser}>
            <input type="text" placeholder='Email' required  onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <input type="password" placeholder='Password' required onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <input type="password" placeholder='ConfirmPassword' required onChange={(e)=>setCPassword(e.target.value)} value={cpassword}/>
            <button className='--btn --btn-primary --btn-block' type='submit'>Register</button>
            <div className="register">
                <p>Already an account?</p>
                <Link to='/login'>
                    Login
                </Link>
            </div>
        </form>
        </div>
        </Card>
        <div className='img'>
            <img src={register} alt="register" width={400} />
        </div>
    </section>
</>
  )
}

export default Signup
