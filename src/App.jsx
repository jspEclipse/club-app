import { useEffect, useState, createContext } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Auth from "./auth";
import UserHome from "./home";
import About from "./about"

export const AppContext = createContext(null);

export default function App() {
  let [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if(session) {
        setUser(session.user);
      }else{
        setUser(null);
      }
    });
  }, []);



  return (
    <div>
      <AppContext.Provider value={{ user }}>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<UserHome/>}></Route>
            <Route path="/about" element={<About/>}></Route>
          </Route>
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

function Layout(){
  let { user } = useContext(AppContext);
  function signOut(){
    supabase.auth.signOut();
  }


  return(
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center border-b boorder-primary p-5 space-x-5">
        <div className="text-xl font-bold">
          <Link to="/">btree</Link>
        </div>
        <div className="flex-grow">
          <Link to="/about">About Us</Link>
        </div>
        <div>
          {user && (<button onClick={signOut} className = "btn btn-sm btn-error">
            Sign Out
          </button>)}
        </div>
      </div>
      <div   className="flex-grow p-5">{user ? <Outlet /> : <Auth />}</div>
    </div>
  )
}