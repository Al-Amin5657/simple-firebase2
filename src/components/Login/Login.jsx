import React, { useState } from 'react';
import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase.config';
import { GoogleAuthProvider } from "firebase/auth";

const Login = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [user, setUser] = useState(null);

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setUser(loggedUser);
            })
            .catch(error => {
                console.log('error', error);
            })
    }

    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                setUser(null);
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            })
    }


    return (
        <div>
            {user ?
                <button onClick={handleSignOut}>Sign Out</button> :
                <button onClick={handleGoogleSignIn}>Google Sign In</button>
            }
            {user &&
                <div>
                    <p>Name: {user.displayName}</p>
                    <p>Email: {user.email}</p>
                    <img src={user.photoURL} alt="" />
                </div>
            }
        </div>
    );
};

export default Login;