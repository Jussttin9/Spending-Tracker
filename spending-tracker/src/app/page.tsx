import Card from "./COMPONENTS/card";
import Image from "next/image";
import Navbar from "./navbar";

export default function Home() {
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
            <div className="text-4xl text-[#1A5100]">$300,145.92 (Savings)</div>
          </div>
          <div className="bg-white flex w-96 place-content-evenly items-center">
            <Image 
              height={100}
              width={100}
              alt='spendings icon'
              src='/spend.jpg'
            />
            <div className="text-4xl text-[#1A5100]">$50,914.11 (Spending)</div>
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
