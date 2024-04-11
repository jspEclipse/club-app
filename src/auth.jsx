import { supabase } from "./supabaseClient";
import { useState } from "react";

export default function Auth() {

    
    

    return (
        <div className="border border-primary p-5 rounded-lg">
            <SignUp/>
            <div className="divider divider-primary"/>
            <SignIn/>
        </div>
    )
}

function SignUp() {

    let  [error, setError] = useState(null);
    
    async function signUp(ev) {
        ev.preventDefault();
        let {error} = await supabase.auth.signUp({
          email: ev.target.email.value,
          password: ev.target.password.value,
        })
    
        if (error) setError(error.message);
    }

    return (
        <>
            <div className="text-center text-xl mb-2">Sign Up</div>
            <form className="flex flex-col items-center space-y-2" onSubmit={signUp}>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">e-mail</span>
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder="name@domain.com"
                        className="input input-primary w-full max-w-xs"
                    />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">password</span>
                    </div>
                    <input
                        type="password"
                        name="password"
                        className="input input-primary w-full max-w-xs"
                    />
                </label>
                <button className="btn btn-primary">Sign Up</button>
            </form>
            {error && <div className="text-error  text-center mt-2">{error}</div>}
        </>
    );
}

function SignIn(){
    let  [error, setError] = useState(null);
    
    async function signIn(ev) {
        ev.preventDefault();
        let {error} = await supabase.auth.signInWithPassword({
          email: ev.target.email.value,
          password: ev.target.password.value,
        })
    
        if (error) setError(error.message);
    }

    return (
        <>
            <div className="text-center text-xl mb-2">Sign In</div>
            <form className="flex flex-col items-center space-y-2" onSubmit={signIn}>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">e-mail</span>
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder="name@domain.com"
                        className="input input-primary w-full max-w-xs"
                    />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">password</span>
                    </div>
                    <input
                        type="password"
                        name="password"
                        className="input input-primary w-full max-w-xs"
                    />
                </label>
                <button className="btn btn-primary">Sign In</button>
            </form>
            {error && <div className="text-error text-center mt-2">{error}</div>}
        </>
    );
}
