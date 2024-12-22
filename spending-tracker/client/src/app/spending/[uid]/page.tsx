'use client'

import { useEffect, useState } from "react";
import Navbar from "../../navbar";
import Image from "next/image";
import axios from "axios";
import ReceiptItem from "../../COMPONENTS/receipt_item";
import PieChart from "@/app/COMPONENTS/pie_chart";

interface Item {
    name: string;
    cost: number;
    tag: string;
}

export default function Spending({ params }: { params: { uid: string }}) {
    let food_and_drink = 0;
    let entertainment = 0;
    let shopping = 0;
    let travel = 0;
    let gifts = 0;
    let other = 0;
    const labels = ['Food & Drinks', 'Entertainment', 'Shopping', 'Travel', 'Gifts', 'Other'];
    const backgroundColors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#000000', '#8F22A9'];

    const [data, setData] = useState([food_and_drink, entertainment, shopping, travel, gifts, other]);
    const [dataModified, setDataModified] = useState(false);

    // user info
    const [items, setItems] = useState<Item[]>([]);
    const [weekly, setWeekly] = useState(0);
    const [spending, setSpending] = useState(0);

    // form info
    const [itemName, setItemName] = useState('');
    const [itemCost, setItemCost] = useState('');
    const [itemVal, setItemVal] = useState(0.0);
    const [tag, setTag] = useState('');
    const [error, setError] = useState<string | null>(null);

    // other info
    const [textColor, setTextColor] = useState('text-[#1A5100]');

    const userID = params.uid;

    function trackTags (item: Item) {
        switch (item.tag) {
            case "food-and-drink":
                food_and_drink += item.cost;
                break;
            case "entertainment":
                entertainment += item.cost;
                break;
            case "shopping":
                shopping += item.cost;
                break;
            case "travel":
                travel += item.cost;
                break;
            case "gifts":
                gifts += item.cost;
                break;
            case "other":
                other += item.cost;
                break;
            default:
                break;
        }
    }

    const gatherItemCategories = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/user/get-info/${userID}`);
            const user = response.data;
            const userItems = user.items;

            // Updates running totals
            userItems.forEach(trackTags);
            const newData = [
                parseFloat(food_and_drink.toFixed(2)), 
                parseFloat(entertainment.toFixed(2)), 
                parseFloat(shopping.toFixed(2)), 
                parseFloat(travel.toFixed(2)), 
                parseFloat(gifts.toFixed(2)),
                parseFloat(other.toFixed(2))
            ]
            setData(newData);
        } catch (error) {
            console.error("Couldn't categorize items:", error);
        }
    }

    const removeItem = async (key: number) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/user/get-info/${userID}`);
            const user = response.data;
            const userItems = user.items;
            const userItemCost = userItems[userItems.length-1-key].cost;
            const newSpend = parseFloat((spending + userItemCost).toFixed(2));
            
            await axios.delete(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/item/delete-item`, {
                params: {
                    userID: userID,
                    item_id: userItems[userItems.length - 1 - key]._id
                }
            });

            await axios.put(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/user/update-spending`, {
                userID: userID,
                newSpending: newSpend
            });

            await axios.put(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/user/update-track-spending`, {
                userID: userID,
                cost: -userItemCost
            });

            const newResponse = await axios.put(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/user/update-weekly`, {
                userID: userID
            });

            const totalSpent = newResponse.data.weeklySpent;

            const newItems = [];
            const reversedItems = items.slice().reverse();

            for (let i = reversedItems.length-1; i >= 0; i--) {
                if(i !== key) {
                    newItems.push(reversedItems[i]);
                }
            }
            setItems(newItems);
            setSpending(newSpend);
            setWeekly(totalSpent);
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    }

    const loadUser = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/user/get-info/${userID}`);
            const user = response.data;
            setItems(user.items);
            setSpending(user.spending);
            setWeekly(user.weeklySpent);
        } catch (error) {
            console.error("Failed to load user:", error);
        }
    }

    const loadItems = () => {
        setItems(items => [...items, { name: itemName, cost: itemVal, tag: tag}]);
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

    const handleTag = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTag(event.target.value);
    }

    const handleClick = async () => {
        setError(null);
        if (itemName.length > 0 && tag != '') {
            try {
                await axios.post(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/item/add-item`, {
                    userID: userID,
                    name: itemName,
                    cost: itemVal,
                    tag: tag
                });

                const newSpend = parseFloat((spending - itemVal).toFixed(2));

                await axios.put(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/user/update-spending`, {
                    userID: userID,
                    newSpending: newSpend
                });

                await axios.put(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/user/update-track-spending`, {
                    userID: userID,
                    cost: itemVal
                });

                const response = await axios.put(`${process.env.NEXT_PUBLIC_DEPLOY_URL}/user/update-weekly`, {
                    userID: userID
                });

                const totalSpent = response.data.weeklySpent;

                loadItems();
                setItemName('');
                setItemCost('');
                setSpending(newSpend);
                setWeekly(totalSpent);
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
        gatherItemCategories();
    }, [])

    useEffect(() => {
        if (String(spending).charAt(0) === '-') {
            setTextColor('text-red-500');
        } else {
            setTextColor('text-[#1A5100]');
        }
    }, [spending])

    return (
        <div className="bg-white h-fit lg:h-fit overflow-hidden">
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
                        <div className={`text-2xl sm:text-4xl ${textColor}`}>{String(spending).charAt(0) === '-' ? `${String(spending).charAt(0)}$${String(spending).slice(1)}` : `$${spending}`} (Spending)</div>
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
                <section className="text-black flex flex-col lg:flex-row place-content-evenly items-center mb-8 lg:mb-0">
                    <div>
                        <div className="absolute h-72 w-3/5 mobile-md:h-80 mobile-md:w-56 mobile-lg:h-92 mobile-lg:w-64 translate-x-16 translate-y-20 mobile-md:translate-x-20 mobile-md:translate-y-24 mobile-lg:translate-x-20 mobile-lg:translate-y-28 flex flex-col gap-1 overflow-auto">
                            <>
                                {items.slice().reverse().map((item, index) => (
                                    <>
                                    <ReceiptItem 
                                    key={index}
                                    itemKey={index} 
                                    item={item.name} 
                                    cost={`$${item.cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                    onClick={removeItem}
                                    />
                                    <hr className="border-2 border-black border-dotted"/>
                                    </>
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
                    <div className="bg-[#E9E9E9] h-92 w-80 mobile-lg:h-92 mobile-lg:w-96 sm:h-108 sm:w-120 flex flex-col place-content-evenly p-6">
                        <div className="flex gap-2 justify-between">
                            <p className="text-xl mobile-lg:text-2xl sm:text-3xl text-center">What did you purchase?</p>
                            <input onChange={handleName} placeholder="Item Name" value={itemName} type="text" required className="bg-[#D9D9D9] text-xl mobile-lg:text-2xl sm:text-3xl w-32 mobile-lg:w-44"></input>
                        </div>
                        <div className="flex gap-2 justify-between">
                            <p className="text-xl mobile-lg:text-2xl sm:text-3xl text-center">How much did it cost?</p>
                            <input onChange={handleCost} placeholder="$0.00" value={itemCost} type="text" pattern="[0-9]*" required className="bg-[#D9D9D9] text-xl mobile-lg:text-2xl sm:text-3xl w-32 mobile-lg:w-44"></input>
                        </div>
                        <div className="flex gap-2 justify-between">
                            <p className="text-xl mobile-lg:text-2xl sm:text-3xl text-center">Select a tag</p>
                            <select onChange={handleTag} required className="bg-[#D9D9D9] text-lg mobile-lg:text-xl sm:text-2xl w-52">
                                <option value="">Select a tag</option>
                                <option value="food-and-drink">Food & Drinks</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="shopping">Shopping</option>
                                <option value="travel">Travel</option>
                                <option value="gifts">Gifts</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="text-center">{error}</div>
                        <button onClick={handleClick}><div className="bg-[#D9D9D9] flex flex-col place-content-evenly h-14">Enter</div></button>
                    </div>
                </section>
            </div>
            <div className="h-112">
                <PieChart data={data} labels={labels} backgroundColors={backgroundColors}/>
            </div>
        </div>
    
    );
}