import { useState } from 'react';
import '../App.css';
import {Auth} from './Firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'

export default function SignIn ({signIn,setSignIn}){
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    function refresh(){
        window.location.reload();
    }

    async function createAccount (){
        try{
            await createUserWithEmailAndPassword(Auth,email,password);
            alert("You signed in successfully");
            refresh();
        }catch(err){
            alert("An error occurred during sign-in. Please sign in again.")
        }
    }
    return(
        <div className="SignIn">
           <i onClick={()=>{setSignIn(false)}} class="fa-regular fa-circle-left"></i>
           <p>Sign uo Now to join our community</p>
           <div className="name">
             <input type="text" placeholder='Your first name' className="namechild" />
             <input type="text" placeholder='Your last name' className="namechild" />
           </div>
           
           <input type="text" placeholder='Your email' onChange={(e)=>setEmail(e.target.value)} />
           <input type="password" placeholder='Your Password' onChange={(e)=>setPassword(e.target.value)} />
           <button onClick={createAccount}>Sign In</button>
        </div>
    )
   
}