import React, { useEffect, useState } from 'react';
import { useContext, createContext } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged  } from "firebase/auth"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../firebase';
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

//   const navigate = useNavigate();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const userCredential = GoogleAuthProvider.credentialFromResult(result);
        const token = userCredential.accessToken;
        const data = result.user;
        localStorage.setItem('user', JSON.stringify(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signUpwithMail = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Successfully signed up 👍');
      })
      .catch((error) => {
        console.log(error.message);
        toast.error('Failed to sign up 😢'+ error.message);
      });
  };

  const signInwithMail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Successfully signed in 👍');
      })
      .catch((error) => {
        console.log(error.message);
        toast.error('Failed to sign in 😢'+ error.message);
      });
  }

  const logOut = () => {
    signOut(auth).then(() => {
      setUser(null);
      localStorage.removeItem('user');
    //   navigate('/signin')
      toast.success('Signed Out successfully 👍')

    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem('user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('user');
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, signUpwithMail, signInwithMail, user  }}>
      {children}
    </AuthContext.Provider>
  );
}

export const UserAuth = () => {
  return useContext(AuthContext)
}