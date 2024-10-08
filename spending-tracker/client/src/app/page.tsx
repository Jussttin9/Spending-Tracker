'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { auth } from '@/app/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AuthError extends Error {
  code?: string;
}

export default function Home() {
  const [useEmail, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [uid, setUid] = useState<string>("");

  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setEmail(event.target.value);
  };

  const clickLogin = async () => {
    setError(null);
    if (useEmail.length > 0) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, useEmail, process.env.NEXT_PUBLIC_FIREBASE_PASS || '');
        const userID = userCredential.user.uid;
        setUid(userID);
        routeToHome();
      } catch (error) {
        const authError = error as AuthError;
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

  useEffect(() => {
    localStorage.setItem('uid', uid);
  }, [uid])

  const router = useRouter();
  function routeToHome() {
    router.replace("/home");
  }

  return (
    <div className="bg-white min-h-screen xs:h-fit md:h-screen overflow-hidden flex place-content-center items-center">
      <div className="w-4/6 h-3/6 md:w-2/6 bg-[#E9E9E9] rounded-5xl overflow-hidden flex flex-col place-content-center justify-around p-6">
        <div className="text-black text-3xl text-center">
          If there is no such account associated with this email, please register your email.
        </div>
        <div className="flex flex-col place-content-center gap-3">
          <h3 className="text-3xl text-black">Email</h3>
          <input className="text-black h-10" onChange={changeEmail} value={useEmail} />
        </div>
        <div className="flex flex-col ">
          <div className="flex place-content-center text-black m-3">{error}</div>
          <button onClick={clickLogin} className="text-black bg-[#cac9c9] h-full text-3xl rounded-3xl">
            Sign in
          </button>
          <div className="flex place-content-center m-5 text-black text-xl gap-1">
            <div>Don&apos;t have an account?</div>
            <div><Link href={'/register'} className="text-black place-content-center"><strong>Sign Up</strong></Link></div>
          </div>
        </div>
      </div>
    </div>
  );
}
