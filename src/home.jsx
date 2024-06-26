import { supabase } from "./supabaseClient";
import { useContext } from "react";
import { AppContext } from "./App";

export default function UserHome() {

    let { user } = useContext(AppContext);
    

    return <div>
        {user?.email}
    </div>
}