import React, { useState } from "react";
import axios from "axios";
import TopNavigation from "../../components/topnavigation";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

const Login = () => {

  const [userName, setUserName] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorMsg, setErrorMsg] = useState<any>(null);

  const handleUsernameChange = (e: any) => {
    const value = e.target.value;
    setUserName(value);
  }

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  }

  const showPassword = () => {
    setPasswordShown((currVal: boolean) => !currVal)
  }

  const onSubmit = async (e: any) => { 
    await axios.post('LOGIN', {'userName': userName, 'password': password})
      .then((response: any) =>{})
      .catch((error: any) =>{setErrorMsg(error.message)})
  }

  return (
    <div className='bg-page-bg w-screen h-screen'>
      <TopNavigation/>
      <div className='w-full h-full pt-16'>
        <div className='grid place-items-center h-full w-full pt-8'>
        <div className='bg-white w-1/4 border-2 h-min rounded-lg py-8'>
          <h1 className='text-center text-black text-3xl'>*LOGO HERE*</h1>
          <div className='w-full flex flex-col items-center pt-8 gap-y-4'>
            <div className='w-2/3 bg-queens-red'>
              {errorMsg && <p className='text-white text-center py-1 rounded-md'>{errorMsg}</p>}
            </div>
            <input 
              className='w-2/3 bg-page-bg content-center pl-2 py-2 rounded-md outline-0'
              type='text'
              placeholder='Username'
              onChange={handleUsernameChange} 
              name='userName' 
              value={userName}
              defaultValue="Username"
              />
              <div className='w-2/3 grid grid-cols-10'>
                <input 
                  id='password'
                  className='w-full bg-page-bg content-center pl-2 py-2 rounded-l-md col-span-9 outline-0'
                  type={passwordShown ? "text" : "password"}
                  placeholder='Password'
                  onChange={handlePasswordChange} 
                  name='password' 
                  value={password}
                  defaultValue="password"
                />
                <button 
                  className={`w-full bg-page-bg rounded-r-md pr-4  outline-0`} onClick={showPassword}>
                  {passwordShown ? <AiOutlineEye color="#002452" size={"16"}/> : <AiOutlineEyeInvisible color="#002452" size={"16"}/>}
                </button>
              </div>
          </div>
          <div className='w-full flex flex-col items-center pt-8'>
            <button 
              className='w-2/3 text-white bg-queens-blue rounded-md py-1 hover:bg-blue-400'
              onClick={onSubmit}
              >Log in
            </button>
          </div>
        </div>
          <div className='w-1/4 py-8 flex flex-col items-center bg-white rounded-md'>
            <p>Don't have an account? <a href="/register" className="no-underline hover:underline text-blue-500 text-bold">Sign Up</a></p>
          </div>
        <div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Login