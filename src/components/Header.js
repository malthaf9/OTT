import { signOut } from "firebase/auth"
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            navigate('/error')
          });
    }

    useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const { uid, email, displayName } = user;
            dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
            navigate('/browse')
            // ...
          } else {
            dispatch(removeUser());
            navigate('/')
            // User is signed out
            // ...
          }
        });
        return () => unsubscribe
      }, []); 

    return (
        <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between">
            <img className="w-44" src={LOGO} alt="header-logo" />
            <div className="py-5">
                <button onClick={handleSignOut} className="bg-red-800 rounded-lg text-white font-bold p-2">Sign Out</button>
            </div>
        </div>
    )
}

export default Header