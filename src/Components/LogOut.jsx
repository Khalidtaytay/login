import '../App.css';
import { Auth } from './Firebase';
import { signOut } from 'firebase/auth';


export default function LogOut({setShowLogingOut}){
    function refresh(){
        window.location.reload();
    }
    async function logout(){
        try{
            await signOut(Auth)
        }catch(err){
            alert('there is a problem in your loging Out')
        }
        }

    return (
        <>
        <div className='Overlay'></div>
        <div className="LogOut">
          <i class="fa-solid fa-xmark" onClick={()=>setShowLogingOut(false)}></i>
          <p>Are you sure to log out ?</p>
          <div className="logout-btns">
              <button onClick={()=>{logout();setShowLogingOut(false);refresh()}}>Yes</button>
              <button onClick={()=>setShowLogingOut(false)}>No</button>
          </div>
        </div>
        </>
    )
}