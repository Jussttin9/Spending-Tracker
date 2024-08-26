'use client'

import { useState } from "react";
import AccordionInfo from "../COMPONENTS/accordion";
import ReceiptItem from "../COMPONENTS/receipt_item";
import Navbar from "../navbar";
import Image from "next/image";

export default function Savings() {
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
        <div className="bg-white h-fit">
            <Navbar/>
            <div className="h-fit flex flex-col gap-2 place-content-between">
                <section className="h-112 flex place-content-center items-center">
                    <div className="bg-white flex w-96 place-content-evenly items-center">
                        <Image 
                        height={100}
                        width={100}
                        alt='savings icon'
                        src='/save.jpg'
                        />
                        <div className="text-4xl text-[#1A5100]">$300,145.92 (Savings)</div>
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
                <section className="bg-[#E9E9E9]">
                    <div className="text-black text-3xl md:text-5xl flex justify-center m-6"><h2>Common Saving Methods</h2></div>
                    <div className="min-h-112 h-fit flex flex-col m-3 gap-4">
                        <AccordionInfo title="Savings Account">
                            <p>A savings account is one of the most common ways that people save their money. Whenever you get your paycheck you can put some into your savings account as an emergency fund or to use to buy something big like a house or a car.</p>
                            <br/>
                            <strong>Pros:</strong>
                            <ul className="list-disc">
                                <li>There&apos;s little to no risk, you just put your money in and let it sit there while you get interest.</li>
                                <li>Easy to open and access if you do want to open a savings account.</li>
                                <li>You can earn interest based on the amount of money that you put in.</li>
                            </ul>    
                            <br/>
                            <strong>Cons:</strong>
                            <ul className="list-disc">
                                <li>The interest you get from savings accounts may be very little, which will not help you keep up with inflation. Over time, your money may start to lose its original value.</li>
                                <li>Depnding on where you open your savings account, there may be some withdrawal limits.</li>
                                <li>You may be required to maintain a minimum average balance or else you may get hit with penalties.</li>
                            </ul>    
                        </AccordionInfo>
                        <AccordionInfo title="401(k)">
                            <p>A 401(k) is a plan provided by your employer that allows you to save up money for retirement. It&apos;s mainly used for long-term savings and in some cases, you may be paying less taxes from the paycheck depending on how much you make and how much you put into your account.</p>
                            <br/>
                            <strong>Pros:</strong>
                            <ul className="list-disc">
                                <li>Employers can match the amount you put into the account, up to a certain limit.</li>
                                <li>You&apos;ll be saving money on taxes while you&apos;re working.</li>
                                <li>It can help you budget and leave you a lot of money for when you retire.</li>
                            </ul>    
                            <br/>
                            <strong>Cons:</strong>
                            <ul className="list-disc">
                                <li>Depending on your account, some 401(k) accounts include higher fees.</li>
                                <li>Contributions from employers may vary depending on the company you work for.</li>
                                <li>It can be difficult to access this money early on.</li>
                            </ul>    
                        </AccordionInfo>
                        <AccordionInfo title="Roth IRA">
                            <p>A Roth IRA account is similar to a 401(k) in that they&apos;re both retirement saving accounts. The difference is that you have to open your own Roth IRA account whereas 401(k) plans are offered by your employer.</p>
                            <br/>
                            <strong>Pros:</strong>
                            <ul className="list-disc">
                                <li>Contributions can be withdrawn at any time without any consequences like fees or penalties.</li>
                                <li>It&apos;s not subject to required minimum distributions (RMDs) which are the minimum amount you must withdraw from your retirement account every year.</li>
                                <li>There&apos;s tax-free growth and withdrawals in retirement.</li>
                            </ul>    
                            <br/>
                            <strong>Cons:</strong>
                            <ul className="list-disc">
                                <li>There&apos;s a limitation to how much you can put into your Roth IRA at a time each year.</li>
                                <li>Unlike 401(k), there&apos;s no tax-dedecution for contributing into your Roth IRA account</li>
                                <li>Earnings can&apos;t be withdraw tax-free until a certain age and the account is at least 5 years old.</li>
                            </ul>    
                        </AccordionInfo>
                    </div>
                </section>
            </div>
        </div>
    );
}