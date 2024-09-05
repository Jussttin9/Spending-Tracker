'use client'

import axios from "axios";
import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from "next/navigation";

interface AuthError extends Error {
  code?: string;
}

export default function Home() {
  const [useEmail, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setEmail(event.target.value);
  };

  const clickSignup = async () => {
    setError(null);
    if (useEmail.length > 0) {
      try {
        console.log(process.env.NEXT_PUBLIC_FIREBASE_PASS);
        const userCredential = await createUserWithEmailAndPassword(auth, useEmail, process.env.NEXT_PUBLIC_FIREBASE_PASS || '');
        const userID = userCredential.user.uid;
        await axios.post(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/user/register`, {
          id: userID,
          email: useEmail,
          savings: 0,
          spending: 0,
          budget: 0
        });
        routeToHome();
      } catch (error) {
        const authError = error as AuthError;
        console.log(authError)
        if (authError.code === 'auth/email-already-in-use') {
          setError('Email already in use');
        } else {
          setError("Couldn't use credentials to register");
        }
      }
    } else {
      setError('Please fill out all fields.');
    }
  }

  const router = useRouter();
  function routeToHome() {
    router.replace("/");
  }

  return (
    <div className="bg-white min-h-screen xs:h-fit md:h-screen overflow-hidden flex place-content-center items-center">
      <div className="w-4/6 h-3/6 md:w-2/6 bg-[#E9E9E9] rounded-5xl overflow-hidden flex flex-col place-content-center justify-around p-6">
        <div className="text-black text-3xl text-center">
          Please enter your email to register an account.
        </div>
        <div className="flex flex-col place-content-center gap-3">
          <h3 className="text-3xl text-black">Email</h3>
          <input className="text-black h-10" onChange={changeEmail} value={useEmail} />
        </div>
        <div className="flex flex-col ">
          <button onClick={clickSignup} className="text-black bg-[#cac9c9] h-full text-3xl rounded-3xl">
            Sign Up
          </button>
          <div className="flex place-content-center text-black m-3">{error}</div>
        </div>
      </div>
    </div>
  );
}
