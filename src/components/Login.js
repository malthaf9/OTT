import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_LOGO } from "../utils/constants";

const Login = () => {

    const dispatch = useDispatch();

    const [isSignInForm, setIsSignInForm] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        //console.log(email.current.value);
        //console.log(password.current.value);
        const message = checkValidData(email.current.value, password.current.value);
        console.log(message);
        setErrorMessage(message);

        if (message) return;

        if (!isSignInForm) {
            // sign up
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        //displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
                      }).then(() => {
                        // Profile updated!
                        // ...
                        const { uid, email, displayName } = auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
                      }).catch((error) => {
                        // An error occurred
                        // ...
                        setErrorMessage(error.message)
                      });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorMessage + errorCode)
                    // ..
                });
        } else {
            // sign in
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorMessage )
                });
        }

    }


    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    return (
        <div>
            <Header />
            <div className="absolute">
                <img src={BG_LOGO} alt="background-logo" />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
                <h1 className="font-bold text-3xl py-4">{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
                {!isSignInForm && (<input type="text" placeholder="Full Name" className="p-4 my-2 w-full bg-gray-700 rounded-lg" />)}
                <input ref={email} type="text" placeholder="Email address" className="p-4 my-2 w-full bg-gray-700 rounded-lg" />
                <input ref={password} type="text" placeholder=" Password" className="p-4 my-2 w-full bg-gray-700 rounded-lg" />
                <p className="text-red-500 font-bold text-lg">{errorMessage}</p>
                <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm ? 'Sign In' : 'Sign Up'}</button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? 'New to Netflix? Sign Up Now' : 'Already a user? Sign In Now'}</p>
            </form>
        </div>
    )
}

export default Login;