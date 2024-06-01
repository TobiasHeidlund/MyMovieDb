import React from 'react'
import './css/LoginFormComponent.css'
import BackendHelper from '../BackendHelper'
import useAuthStore from "../stores/AuthStore"
  
function LoginFormComponent() {
  const {setUsername} = useAuthStore(state => ({
    setUsername : state.setUsername
  }));

  const resposeMsg = (msg:string)=>{
    let element = (document.getElementById("login-msg-area") as HTMLElement)
    element.hidden = false
    element.innerText = msg
  }
  const onSuccess = (username:string)=>{
    setUsername(username)
  }

  let backendhelper = new BackendHelper("")
  function submitForm(formData:React.FormEvent<HTMLFormElement>){
      formData.preventDefault()
      let pass = (document.getElementById("password") as HTMLInputElement);
      let user = (document.getElementById("username") as HTMLInputElement);
      if(((formData.nativeEvent as SubmitEvent).submitter as HTMLInputElement).name === "register"){
        backendhelper.register(user.value,pass.value,resposeMsg)
      }else{
        backendhelper.login(user.value,pass.value,resposeMsg,onSuccess)
      }
      formData.currentTarget.reset()
  }



  return (
    <form className='form-section' onSubmit={submitForm} >
        <h3 className='msg-area' id="login-msg-area" hidden >Login Failed</h3>
        <div className='form-box'> 
            <label htmlFor="username">Username</label>
            <input id="username" type='text' name='username' required maxLength={30} minLength={5}></input>
        </div>
        <div className='form-box'> 
            <label htmlFor="password">Password</label>
            <input id="password" type='password' name='password' required minLength={8}></input>
        </div>
        <div className="button-box">
            <input className='login-button' type="submit" name='login' value="Login" />
            <input className='register-button' type="submit" name='register' value="Register" />
        </div>
    </form>
  )
}


export default LoginFormComponent