'use client'

import Card from "./COMPONENTS/card";
import Image from "next/image";
import Navbar from "./navbar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [saving, setSaving] = useState(null);
  const [spending, setSpending] = useState(null);
  const [lastLogged, setLastLogged] = useState("");

  const loadUser = async () => {
    const response = await axios.get('http://localhost:4000/user/get-info/999');
    const user = response.data;
    setLastLogged(user.lastLogged);
    setSaving(user.savings);
    setSpending(user.spending);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="bg-white min-h-screen xs:h-fit overflow-hidden">
      <Navbar/>
      <div className="h-5/6 flex flex-col place-content-evenly">
        <section className="text-black flex flex-col md:flex-row place-content-evenly items-center p-5">
          {/* USE MIN-WIDTH and MAX-WIDTH TO ACCOUNT FOR INCREASING LENGTHS IN THE NUMBERS */}
          <div className="bg-white flex w-96 place-content-evenly items-center">
            <Image 
              height={100}
              width={100}
              alt='savings icon'
              src='/save.jpg'
              className="hidden sm:block sm:h-28 sm:w-28"
            />
            <div className="text-2xl md:text-4xl text-[#1A5100]">${saving} (Savings)</div>
          </div>
          <div className="bg-white flex w-96 place-content-evenly items-center">
            <Image 
              height={100}
              width={100}
              alt='spendings icon'
              src='/spend.jpg'
              className="hidden sm:block sm:h-28 sm:w-28"
            />
            <div className="text-2xl md:text-4xl text-[#1A5100]">${spending} (Spending)</div>
          </div>
        </section>
        <section className="text-black flex place-content-evenly items-center gap-3 flex-col sm:flex-row md:flex-row lg:flex-row">
          <Card page="spending/999" img="/file.png" hoverImg="/vault_open.png" color="bg-[#E9E9E9]">Spending</Card>
          <Card page="budget/999" img="/Notebook.jpg" hoverImg="/vault_open.png" color="bg-[#E4DBD2]">Budget Tracker</Card>
          <Card page="savings/999" img="/vault_closed.png" hoverImg="/vault_open.png" color="bg-[#E9E9E9]">Savings</Card>
        </section>
      </div>
    </div>
  );
}
