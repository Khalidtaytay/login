import { useEffect, useState } from 'react';
import './App.css';
import Loging from './Components/Loging';
import LogOut from './Components/LogOut';
import { Data,Auth } from './Components/Firebase';
import { getDocs,collection } from 'firebase/firestore';

function App() {
  const [showLogin,setShowLoging]=useState(false);
  const [showLoginOut,setShowLogingOut]=useState(false);
  const [showLogStatut,setShowLogStatut]=useState(true);
  const [showData,setShowData]=useState([]);
  const [Img,setImg]=useState(false);


  const getDataList = collection(Data,"Data");
  useEffect(()=>{
    async function getData(){
      try{
        const data = await getDocs(getDataList);
        const dataFiltred = data.docs.map((doc)=>({...doc.data(),id: doc.id,}));
        setShowData(dataFiltred);
          if (Auth?.currentUser?.uid ) {
      setShowLogStatut(false);
    };
      }catch(err){
        console.log(err);
      }
    }
    getData();
  },[])
   return (
    
    <>
     <div className="Nav">
        <h3 onClick={()=>setShowLoging(false)}>Home</h3>
        {showLogStatut?<button onClick={()=>setShowLoging(true)}>Log In</button>:<button onClick={()=>setShowLogingOut(true)}>Log Out</button>}
     </div>
     {showLoginOut&&<LogOut setShowLogingOut={setShowLogingOut}/>}
     
     
        {Auth?.currentUser?.uid ? (
           <div className='Data'>
              {showData.map((data) => (
                <img onClick={()=>{return(setImg(data))}} src={data.URL} alt="" />
              ))}
           </div>
        ) : (
          showLogin ? <Loging /> : <p className='initialState'>To access the content on this page, please sign in to your account. If you don't have an account yet, you can create one to get started.</p>
        )}
        {Img&&<div className='ShowImg'>
        <i class="fa-solid fa-arrow-left" onClick={()=>setImg(false)}></i>
        <i class="fa-solid fa-xmark" onClick={()=>setImg(false)}></i>
          <img id='Img' src={Img.URL} alt="" />
          </div>}
 
   
   
    </>
  )

}

export default App;
