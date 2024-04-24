import { useState } from 'react';
import '../App.css';
import SignIn from './SingIn';
import {Auth,Google} from './Firebase'
import{signInWithEmailAndPassword,signInWithPopup} from 'firebase/auth';

export function Login({signIn,setSignIn}){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    function refresh(){
        window.location.reload();
    }

    // Log in with Email and Password
    async function LogingIn (){
        try{
            await signInWithEmailAndPassword(Auth,email,password);
            alert("You loged In successfully");
            refresh()
        }catch(err){
            alert("An error occurred during log In. Please log in again.")
        }
    }

    // Log in with Google
    async function logInWithGoogle(){
        try{
            await signInWithPopup(Auth,Google);
            alert("You loged In successfully");
            refresh();
        }catch(err){
            alert('An error occurred during google log In.')
        }
    }

    return (
        <div className="loging">
          <button className="gmail" onClick={logInWithGoogle}><div className='pic'></div>Login with Google</button>
          <p className='or'>or</p>
          <input type="text" placeholder='Your email' onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" placeholder='Your Password' onChange={(e)=>setPassword(e.target.value)} />
          <button onClick={LogingIn}>Log in</button>
          <p>Don't have an account ? <span onClick={()=>setSignIn(true)}>Sign up</span></p>
        </div>
    )
}
export default function Loging (){
    const [signIn,setSignIn]=useState(false);
    return(
        <>
         {signIn?<SignIn signIn = {signIn} setSignIn={setSignIn}/>:<Login signIn = {signIn} setSignIn={setSignIn}/>}
        </>
    )
   
}