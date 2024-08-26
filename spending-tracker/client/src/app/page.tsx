'use client'

import Card from "./COMPONENTS/card";
import Image from "next/image";
import Navbar from "./navbar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [saving, setSaving] = useState(0);
  const [spending, setSpending] = useState(0);

  const loadUser = async () => {
    const response = await axios.get('http://localhost:4000/user/get-info/999');
    const user = response.data;
    setSaving(user.savings);
    setSpending(user.spending);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="bg-white h-screen">
      <Navbar/>
      <div className="h-5/6 flex flex-col place-content-evenly">
        <section className="text-black flex place-content-evenly p-5">
          {/* USE MIN-WIDTH and MAX-WIDTH TO ACCOUNT FOR INCREASING LENGTHS IN THE NUMBERS */}
          <div className="bg-white flex w-96 place-content-evenly items-center">
            <Image 
              height={100}
              width={100}
              alt='savings icon'
              src='/save.jpg'
            />
            <div className="text-4xl text-[#1A5100]">${saving} (Savings)</div>
          </div>
          <div className="bg-white flex w-96 place-content-evenly items-center">
            <Image 
              height={100}
              width={100}
              alt='spendings icon'
              src='/spend.jpg'
            />
            <div className="text-4xl text-[#1A5100]">${spending} (Spending)</div>
          </div>
        </section>
        <section className="text-black flex place-content-evenly">
          <Card page="spending" img="/file.png" hoverImg="/vault_open.png" color="bg-[#E9E9E9]">Spending</Card>
          <Card page="budget" img="/Notebook.jpg" hoverImg="/vault_open.png" color="bg-[#E4DBD2]">Budget Tracker</Card>
          <Card page="savings" img="/vault_closed.png" hoverImg="/vault_open.png" color="bg-[#E9E9E9]">Savings</Card>
        </section>
      </div>
    </div>
  );
}
