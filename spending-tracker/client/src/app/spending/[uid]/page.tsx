'use client'

import { useEffect, useState } from "react";
import Navbar from "../../navbar";
import Image from "next/image";
import axios from "axios";
import ReceiptItem from "../../COMPONENTS/receipt_item";

interface Item {
    name: string;
    cost: number;
}

export default function Spending({ params }: { params: { uid: string }}) {
    // user info
    const [items, setItems] = useState<Item[]>([]);
    const [weekly, setWeekly] = useState(0);
    const [spending, setSpending] = useState(0);

    // form info
    const [itemName, setItemName] = useState('');
    const [itemCost, setItemCost] = useState('');
    const [itemVal, setItemVal] = useState(0.0);
    const [error, setError] = useState<string | null>(null);

    const userID = params.uid;

    const removeItem = async (key: number) => {
        try {
            const response = await axios.get(`http://localhost:4000/user/get-info/${userID}`);
            const user = response.data;
            const userItems = user.items;
            const userItemCost = userItems[userItems.length-1-key].cost;
            const newSpend = parseFloat((spending + userItemCost).toFixed(2));
            
            await axios.delete('http://localhost:4000/item/delete-item', {
                params: {
                    userID: userID,
                    item_id: userItems[userItems.length - 1 - key]._id
                }
            });

            await axios.put('http://localhost:4000/user/update-spending', {
                userID: userID,
                newSpending: newSpend
            });

            const newItems = [];
            const reversedItems = items.slice().reverse();

            for (let i = reversedItems.length-1; i >= 0; i--) {
                if(i !== key) {
                    newItems.push(reversedItems[i]);
                }
            }
            setItems(newItems);
            setSpending(newSpend);
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    }

    const loadUser = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/user/get-info/${userID}`);
            const user = response.data;
            setItems(user.items);
            setSpending(user.spending);
            setWeekly(user.weeklySpent)
        } catch (error) {
            console.error("Failed to load user:", error);
        }
    }

    const loadItems = () => {
        setItems(items => [...items, { name: itemName, cost: itemVal}]);
    }

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
        let newPrice = String(parseFloat(res));

        if (newPrice.length == 1) {
            price = "$0.0" + newPrice;
        } else if (newPrice.length == 2) {
            price = "$0." + newPrice;
        } else {
            price = "$" + newPrice.slice(0, newPrice.length-2) + "." + newPrice.slice(newPrice.length-2)
        }
        setItemVal(parseFloat(price.slice(1)));
        setItemCost(price)
    }

    const handleClick = async () => {
        setError(null);
        if (itemName.length > 0) {
            try {
                await axios.post('http://localhost:4000/item/add-saving', {
                    userID: userID,
                    name: itemName,
                    cost: itemVal
                });

                const newSpend = parseFloat((spending - itemVal).toFixed(2));

                await axios.put('http://localhost:4000/user/update-spending', {
                    userID: userID,
                    newSpending: newSpend
                });

                loadItems();
                setItemName('');
                setItemCost('');
                setSpending(newSpend);
            } catch (error) {
                console.error("Failed to add item:", error);
                setError("Failed to add item. Please try again later.");
            }
        } else {
            setError("Please fill out all fields");
        }
    }

    useEffect(() => {
        loadUser();
    }, [])

    return (
        <div className="bg-white h-fit lg:h-screen overflow-hidden">
            <Navbar/>
            <div className="h-5/6 flex flex-col place-content-evenly">
                <section className="text-black flex flex-col md:flex-row place-content-evenly items-center p-5">
                    <div className="bg-white flex max-w-full w-96 place-content-evenly items-center text-center">
                        <Image 
                        height={100}
                        width={100}
                        alt='spendings icon'
                        src='/spend.jpg'
                        />
                        <div className="text-2xl sm:text-4xl text-[#1A5100]">{String(spending).charAt(0) === '-' ? `${String(spending).charAt(0)}$${String(spending).slice(1)}` : `$${spending}`} (Spending)</div>
                    </div>
                    <div className="bg-white flex max-w-full w-96 place-content-evenly items-center text-center">
                        <Image 
                        height={100}
                        width={100}
                        alt='weekly spending icon'
                        src='/cash-register.png'
                        />
                        <div className="text-2xl sm:text-4xl text-[#1A5100]">${weekly} <br/>(Weekly Spendings)</div>
                    </div>
                </section>
                <section className="text-black flex flex-col lg:flex-row place-content-evenly items-center">
                    <div>
                        <div className="absolute h-72 w-3/5 mobile-md:h-80 mobile-md:w-56 mobile-lg:h-92 mobile-lg:w-64 translate-x-16 translate-y-20 mobile-md:translate-x-20 mobile-md:translate-y-24 mobile-lg:translate-x-20 mobile-lg:translate-y-28 flex flex-col gap-1 overflow-auto">
                            <>
                                {items.slice().reverse().map((item, index) => (
                                    <ReceiptItem 
                                    key={index}
                                    itemKey={index} 
                                    item={item.name} 
                                    cost={`$${item.cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                    onClick={removeItem}
                                    />
                                ))}
                            </>
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
                            <input onChange={handleName} placeholder="Item Name" value={itemName} type="text" required className="bg-[#D9D9D9] text-xl mobile-lg:text-2xl sm:text-3xl w-44"></input>
                        </div>
                        <div className="flex gap-2 place-content-evenly">
                            <p className="text-xl mobile-lg:text-2xl sm:text-3xl text-center">How much did it cost?</p>
                            <input onChange={handleCost} placeholder="$0.00" value={itemCost} type="text" pattern="[0-9]*" required className="bg-[#D9D9D9] text-xl mobile-lg:text-2xl sm:text-3xl w-44"></input>
                        </div>
                        <div className="text-center">{error}</div>
                        <button onClick={handleClick}><div className="bg-[#D9D9D9] flex flex-col place-content-evenly h-14">Enter</div></button>
                    </div>
                </section>
            </div>
        </div>
    
    );
}