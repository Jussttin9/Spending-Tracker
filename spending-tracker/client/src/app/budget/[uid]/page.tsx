'use client'

import { useEffect, useState } from "react";
import Navbar from "../../navbar";
import Image from "next/image";
import axios from "axios";
import { motion as m } from "framer-motion";
import AccordionInfo from "../../COMPONENTS/accordion";

export default function Budget({ params }: { params: { uid: string }}) {
    const [togglePopup, setTogglePopup] = useState(false);
    const [toggleCustom, setToggleCustom] = useState(false);
    const [itemCost, setItemCost] = useState('');
    const [percent, setPercent] = useState('');
    const [error, setError] = useState<string | null>(null);

    const [addSpend, setAddSpend] = useState('0.00');
    const [addSave, setAddSave] = useState('0.00');
    const [oldSpend, setOldSpend] = useState(0);
    const [oldSave, setOldSave] = useState(0);

    const [userPercent, setUserPercent] = useState(0);

    const userID = params.uid;
    const percentOptions = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

    const loadUser = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/user/get-info/${userID}`);
            const user = response.data;
            setUserPercent(user.budget);
            setOldSpend(user.spending);
            setOldSave(user.savings);
            loadOptions(user.budget);
        } catch (error) {
            console.error("Failed to load user:", error);
        }
    }

    const loadOptions = (budget: number) => {
        if (budget % 10 !== 0) {
            setToggleCustom(true);
            setPercent(String(budget));
        } else {
            setToggleCustom(false);
            setPercent(String(budget));
        }
    }

    const updateValues = () => {
        if (itemCost === '' || percent === '') {
            setAddSave('0.00');
            setAddSpend('0.00');
            return;
        }
        const percentage = parseFloat(percent) / 100;
        const newSave = (parseFloat(itemCost.slice(1)) * percentage).toFixed(2);
        const newSpend = (parseFloat(itemCost.slice(1)) - parseFloat(newSave)).toFixed(2);
        setAddSave(newSave);
        setAddSpend(newSpend);
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

    const handlePercent = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === "custom") {
            setToggleCustom(!toggleCustom);
            setPercent('0');
        } else if (toggleCustom && event.target.value !== "custom") {
            setToggleCustom(!toggleCustom);
            setPercent(event.target.value)
        } else {
            setPercent(event.target.value);
        }
    }

    const handleBudget = (event: React.ChangeEvent<HTMLInputElement>) => {
        let percent = event.target.value;

        if (percent.length == 0) {
            setPercent('0');
            return;
        } else if (percent.length == 1) {
            setPercent(percent);
            return;
        } else if (percent.length > 23) {
            setPercent(percent.slice(0, 23));
            return;
        }

        let res = ""
        for (let i = 0; i < percent.length; i++) {
            if(percent.charAt(i) !== '.') {
                res += percent.charAt(i);
            }
        }
        let newPrice = String(parseFloat(res));

        if (newPrice.length <= 2) {
            percent = newPrice;
        } else {
            percent = newPrice.slice(0, newPrice.length-2) + "." + newPrice.slice(newPrice.length-2)
        }
        if (parseFloat(percent) >= 0 && parseFloat(percent) <= 100) {
            setPercent(percent);
        }
    }

    const handleClick = async () => {
        setError(null);
        if (itemCost.length > 0) {
            try {
                await axios.put(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/user/update-budget`, {
                    userID: userID,
                    newBudget: parseFloat(percent)
                });

                const newSpend = parseFloat((parseFloat(addSpend) + oldSpend).toFixed(2));
                const newSave = parseFloat((parseFloat(addSave) + oldSave).toFixed(2));

                await axios.put(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/user/update-spending`, {
                    userID: userID,
                    newSpending: newSpend
                });

                await axios.put(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/user/update-saving`, {
                    userID: userID,
                    newSavings: newSave
                });

                setUserPercent(parseFloat(percent));
                setItemCost('');
                setTogglePopup(!togglePopup)
            } catch (error) {
                console.error("Error updating budget:", error);
            }
        } else {
            setError("Please fill out all fields.");
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    useEffect(() => {
        loadOptions(userPercent);
    }, [togglePopup]);

    useEffect(() => {
        updateValues();
    }, [itemCost, percent])

    return (
    <div className="bg-white h-fit">
        <Navbar/>
        <div className="h-fit flex flex-col place-content-between">
            <section className="bg-[#e9e9e977] h-112 flex place-content-center items-center">
                <button onClick={() => setTogglePopup(!togglePopup)} className="h-fit"><div className="bg-[#E9E9E9] text-3xl text-black p-4 rounded-5xl overflow-hidden">Budget Your Paycheck</div></button>
            </section>
            <section className="bg-[#E9E9E9]">
                <div className="text-black text-3xl md:text-5xl flex justify-center m-6"><h2>Budgeting Methods</h2></div>
                <div className="min-h-112 h-fit flex flex-col m-3 gap-4">
                    <AccordionInfo title="50/30/20 Budget">
                        <p>The general idea of the <strong>50/30/20 Budget</strong> is to budget 50% of your money towards <strong>needs</strong>, 30% towards <strong>wants</strong>, and 20% towards <strong>savings</strong>. </p>
                        <br/>
                        <ul>
                            <li><strong>Needs</strong> can be any necessity in order to live comfortably such as rent, bills, insurance, and food.</li>
                            <li><strong>Wants</strong> can refer to any item that you
                        personally want to buy or do such as vacations, going out to a restaurant, or an item you&apos;ve been wanting to buy for yourself.</li>
                            <li>The rest of your money should be going into some <strong>savings plan</strong> such as a savings account, a 401k, and/or a Roth IRA.</li>
                        </ul>
                    </AccordionInfo>
                    <AccordionInfo title="Zero-Based Budget">
                        <p>The idea of a <strong>Zero-Based Budget</strong> is when you budget your money to where your income minus your expenses <em>equals zero</em>. It basically means that you&apos;re portioning your money 
                        in such a way where all of your money is needed somewhere, whether it be for needs or personal wants.</p>
                        <br/>       
                        <p>First figure out your monthly income and then figure out and list your expenses. Next, subtract your expenses from your income. If you end up running out of money and you still have a list of expenses left then you may have to do one of two things or both.</p> 
                        <br/>
                        <p>You have to either get your income up or you need to decrease your expenses, decreasing the unneccessary expenses first, or you may have to do both.</p>           
                        </AccordionInfo>
                    <AccordionInfo title="Pay Yourself First">
                        <p>The <strong>Pay Yourself First Budget</strong> is a budgeting method where, like it says, you pay yourself first. Before using this method, think about what you want to achieve with your money, it could be something like paying off debt or creating an emergency fund.
                        Once you&apos;ve figured that out, once you get your paycheck, you first set aside a portion of money to help you progress towards that goal. Then your remaining money is used for expenses and personal wants.</p>
                    </AccordionInfo>
                </div>
            </section>
            {togglePopup && (
                <div className="fixed z-10 inset-x-0 inset-y-0">
                    <m.div className="bg-[#31313170] w-full h-full flex place-content-center items-center" onClick={() => setTogglePopup(!togglePopup)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, ease: 'easeInOut'}}
                    >
                        <m.div className="absolute bg-white rounded-5xl overflow-hidden overflow-y-auto min-h-fit h-5/6 w-5/6 lg:w-3/6 z-10 text-black flex flex-col place-content-evenly p-6"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, ease: 'easeInOut'}}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex place-content-between">
                                <p className="text-xl md:text-3xl text-center">How much did you earn?</p>
                                <input onChange={handleCost} placeholder="$0.00" value={itemCost} type="text" pattern="[0-9]*" required className="bg-[#D9D9D9] text-3xl md:text-5xl w-28 mobile-md:w-36 md:w-72"></input>
                            </div>
                            <div className="flex flex-col gap-y-4">
                                <div className="flex place-content-between">
                                    <p className="text-xl md:text-3xl text-center">How much do you want to save?</p>
                                    <select defaultValue={toggleCustom ? "custom" : percent} className="bg-[#D9D9D9] text-3xl md:text-5xl w-28 mobile-md:w-36 md:w-72" onChange={handlePercent} required>
                                        {percentOptions.map((percentOption) => (
                                            <option key={percentOption} value={`${percentOption}`}>{percentOption}%</option>
                                        ))}
                                        <option key="custom" value="custom" selected>Custom</option>
                                    </select>
                                </div>
                                {toggleCustom && (
                                    <div className="flex place-content-between">
                                        <p className="text-xl md:text-3xl text-center">Custom Percent</p>
                                        <input type="text" value={percent} min={0} max={100} required onChange={handleBudget} pattern="[0-9]*" className="bg-[#D9D9D9] text-3xl md:text-5xl w-28 mobile-md:w-36 md:w-72"></input>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col items-center gap-y-3">
                                <div className="bg-white flex w-fit place-content-evenly items-center">
                                    <Image 
                                    height={100}
                                    width={100}
                                    alt='savings icon'
                                    src='/save.jpg'
                                    className="hidden mobile-lg:block"
                                    />
                                    <div className="text-center text-2xl sm:text-4xl text-[#1A5100]">+ ${addSave} (Savings)</div>
                                </div>
                                <div className="bg-white flex w-fit place-content-evenly items-center">
                                    <Image 
                                    height={100}
                                    width={100}
                                    alt='spendings icon'
                                    src='/spend.jpg'
                                    className="hidden mobile-lg:block"
                                    />
                                    <div className="text-center text-2xl sm:text-4xl text-[#1A5100]">+ ${addSpend} (Spending)</div>
                                </div>
                            </div>
                            <div className="text-center">{error}</div>
                            <button onClick={handleClick}><div className="bg-[#D9D9D9] flex flex-col place-content-evenly h-14 text-2xl">Enter</div></button>
                        </m.div>
                    </m.div>
                </div>
            )}
        </div>
    </div>
    );
}