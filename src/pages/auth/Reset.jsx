import React, { useState } from 'react'
import reste from '../../assets/forgot.png'
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase/Config'
import { toast } from 'react-toastify'
import { Loader } from '../../components'
const Reset = () => {
    const [email,setEmail] =useState("");
    const [isLoading,setIsLoading] =useState(false);
    const resetPassword = (e) =>{
        e.preventDefault();
        setIsLoading(true)
        sendPasswordResetEmail(auth, email)
  .then(() => {
    toast.success("Reset your password !")
  })
  .catch((error) => {
   toast.error(error.message)
  });

    }
  return (
    <>
    {isLoading && <Loader/>}
    <section className='auth'>
    <div className='img'>
            <img src={reste} alt="forgot" width={400} />
        </div>
        <Card>
        <div className="form">
        <h2>Register</h2>
        <form onSubmit={resetPassword}>
            <input type="text" placeholder='Email' required value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            <button className='--btn --btn-primary --btn-block'>Reset Password</button>
            <div className="links">
            <p>
                <Link to='/login'> -  Login</Link>
            </p>
            <p>
                <Link to='/register'> -  Register</Link>
            </p>
            </div>
        </form>
        </div>
        </Card>
    </section>
</>
  )
}

export default Reset
