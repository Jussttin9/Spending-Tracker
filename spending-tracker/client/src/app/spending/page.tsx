'use client'

import { useState } from "react";
import Navbar from "../navbar";
import Image from "next/image";
import ReceiptItem from "../COMPONENTS/receipt_item";

export default function Spending() {
    const [itemName, setItemName] = useState('');
    const [itemCost, setItemCost] = useState('');

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setItemName(event.target.value);
    }

    const handleCost = (event: React.ChangeEvent<HTMLInputElement>) => {
        let price = event.target.value;

        if (price.length == 0) {
            setItemCost('$0.00');
            return;
        } else if (price.length == 1) {
            price = '$0.0' + price;
            setItemCost(price);
            return;
        } else if (price.length > 23) {
            setItemCost(price.slice(0, 23));
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
        <div className="bg-white h-fit lg:h-screen overflow-hidden">
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
                <section className="text-black flex flex-col lg:flex-row place-content-evenly items-center">
                    <div>
                        <div className="absolute h-72 w-3/5 mobile-md:h-80 mobile-md:w-56 mobile-lg:h-92 mobile-lg:w-64 translate-x-16 translate-y-20 mobile-md:translate-x-20 mobile-md:translate-y-24 mobile-lg:translate-x-20 mobile-lg:translate-y-28 flex flex-col overflow-auto">
                            <ReceiptItem item={'Food'} cost={'$37.94'}/>
                            <ReceiptItem item={'Food'} cost={'$37.94'}/>
                            <ReceiptItem item={'Food'} cost={'$37.94'}/>
                            <ReceiptItem item={'Food'} cost={'$37.94'}/>
                            <ReceiptItem item={'Food'} cost={'$37.94'}/>
                            <ReceiptItem item={'Food'} cost={'$37.94'}/>
                            <ReceiptItem item={'Food'} cost={'$37.94'}/>
                            <ReceiptItem item={'Food'} cost={'$37.94'}/>
                            <ReceiptItem item={'Food'} cost={'$37.94'}/>
                            <ReceiptItem item={'Food'} cost={'$37.94'}/>
                            <ReceiptItem item={'Food'} cost={'$37.94'}/>
                            <ReceiptItem item={'Food'} cost={'$37.94'}/>
                            <ReceiptItem item={'Food'} cost={'$37.94'}/>
                            <ReceiptItem item={'Food'} cost={'$37.94'}/>
                            <ReceiptItem item={'Food'} cost={'$37.94'}/>
                            <ReceiptItem item={'Food'} cost={'$37.94'}/>
                        </div>
                        <Image
                            height={567}
                            width={422}
                            alt="receipt-history"
                            src="/receipt.png"
                        />
                    </div>
                    <div className="bg-[#E9E9E9] h-80 w-80 mobile-lg:h-92 mobile-lg:w-96 sm:h-108 sm:w-120 flex flex-col place-content-evenly p-6">
                        <div className="flex gap-2 place-content-evenly">
                            <p className="text-xl mobile-lg:text-2xl sm:text-3xl text-center">What did you purchase?</p>
                            <input onChange={handleName} placeholder="Item Name" type="text" required className="bg-[#D9D9D9] text-xl mobile-lg:text-2xl sm:text-3xl w-44"></input>
                        </div>
                        <div className="flex gap-2 place-content-evenly">
                            <p className="text-xl mobile-lg:text-2xl sm:text-3xl text-center">How much did it cost?</p>
                            <input onChange={handleCost} placeholder="$0.00" value={itemCost} type="text" pattern="[0-9]*" required className="bg-[#D9D9D9] text-xl mobile-lg:text-2xl sm:text-3xl w-44"></input>
                        </div>
                        <button><div className="bg-[#D9D9D9] flex flex-col place-content-evenly h-14">Enter</div></button>
                    </div>
                </section>
            </div>
        </div>
    
    );
}