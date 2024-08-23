import AccordionInfo from "../COMPONENTS/accordion";
import Navbar from "../navbar";
import Image from "next/image";

export default function Savings() {
    return (
        <div className="bg-white h-fit">
            <Navbar/>
            <div className="h-fit flex flex-col place-content-between">
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
                <section className="bg-[#E9E9E9]">
                    <div className="text-black text-5xl flex justify-center m-6"><h2>Common Saving Methods</h2></div>
                    <div className="min-h-112 h-fit flex flex-col m-3 gap-4">
                        <AccordionInfo title="Savings Account">
                            this is the body of the accordion
                        </AccordionInfo>
                        <AccordionInfo title="401k">
                            this is the body 2 of the accordion
                        </AccordionInfo>
                        <AccordionInfo title="Roth IRA">
                            this is the body 3 of the accordion
                        </AccordionInfo>
                    </div>
                </section>
            </div>
        </div>
    );
}