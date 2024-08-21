'use client'

import { useState } from "react";
import Navbar from "../navbar";
import Image from "next/image";

export default function Spending() {
    const [itemName, setItemName] = useState('');
    const [itemCost, setItemCost] = useState('');

    const handleCost = (event: React.ChangeEvent<HTMLInputElement>) => {
        let price = event.target.value;

        if (price.length == 1) {
            price = '$0.0' + price;
            setItemCost(price);
            return;
        }

        let res = ""
        for (let i = 1; i < price.length; i++) {
            if(price.charAt(i) !== '.') {
                res += price.charAt(i);
            }
        }
        console.log(res)
        let newPrice = String(parseFloat(res));

        if (newPrice.length == 1) {
            price = "$0.0" + newPrice;
        } else if (newPrice.length == 2) {
            price = "$0." + newPrice;
        } else {
            price = "$" + newPrice.slice(0, newPrice.length-2) + "." + newPrice.slice(newPrice.length-2)
        }
        setItemCost(price)
    }

    return (
        <div className="bg-white h-screen">
            <Navbar/>
            <div className="h-5/6 flex flex-col place-content-evenly">
                <section className="text-black flex place-content-evenly p-5">
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
                    <div>
                        Image of receipt history
                    </div>
                    <div className="bg-[#E9E9E9] h-108 w-120 flex flex-col place-content-evenly">
                        <div className="flex place-content-evenly">
                            <p>What did you purchase?</p>
                            <input type="text" step="0.01" required></input>
                        </div>
                        <div className="flex place-content-evenly">
                            <p>How much did it cost?</p>
                            <input onChange={handleCost} placeholder="$0.00" value={itemCost} type="text" pattern="[0-9]*" required></input>
                        </div>
                        <div className="flex place-content-evenly"><button>Enter {itemCost}</button></div>
                    </div>
                </section>
            </div>
        </div>
    
    );
}