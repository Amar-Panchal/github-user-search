import React, { useEffect, useState } from "react";
import {FaGithub} from "react-icons/fa";
import { Link } from "react-router-dom";
import {BiSearch} from "react-icons/bi";
import './App.css';
function App() {
  const [username,setusername] = useState('');
  const [data,setdata] =useState('');
  const [isLoading, setLoading] = useState(false); // Loading state
  const [notfound,setnotfound] = useState(false)
  
  const onSearch = (e) =>{
    e.preventDefault();
    fetch(`https://api.github.com/users/${username}`)
    .then((result)=>{
      return result.json();
    }).then((value)=>{
      setdata(value);
      console.log(value)
      if(value.message == "Not Found" ){
        setLoading(false)
        setnotfound(true)
        
      }if (username == "") {
        setLoading(false)
        setnotfound(false)
      }
      else{
        setLoading(true)
        setnotfound(false)
      }
    })
  }
  
  return (
    <div>
      <div className="search text-center mt-4 my-5">
      <input className="search-bar" type="text" placeholder="enter username"  onChange={(e)=>setusername(e.target.value)}/>
      <button className="search-btn" onClick={onSearch}><span><BiSearch /> </span> Search</button>
      </div>
      
      {isLoading && (
      <div className="card mx-auto">
        <img className="avatar" src={data.avatar_url} alt="" />
        <div className="design"></div>

        <a href={data.html_url} className="login" value={data.html_url}><span><FaGithub/> </span> {data.login}</a>
        <h1 className="name">{data.name}</h1>
        <h1 className="created_at ">Account created : {data.created_at}</h1>
        <div className="repo-box d-flex justify-content-between text-center px-5">
        <h1 className="repos">{data.public_repos }<span>Repository</span></h1>
        <h1 className="repos">{data.public_gists  }<span>Gists</span></h1>
        </div>
        
      </div>
      )
      }{notfound &&
        (
          <h1 className="notfound">Username is Invalid ...!</h1>
        )
      }
    </div>
  );
}

export default App;
