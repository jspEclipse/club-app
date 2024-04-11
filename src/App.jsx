import { useEffect, useState, createContext } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { supabase } from "./supabaseClient";
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
    <div style={{height:"100vh"}}>
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
    <div>
      <div>
        <div>
          <Link to="/">btree</Link>
        </div>
        <div>
          <Link to="/">About Us</Link>
        </div>
        <div>
          <button onClick={signOut} className = "btn btn-error">
            Sign Out
          </button>
        </div>
      </div>
      {user ? <Outlet /> : <Auth />}
    </div>
  )
}