import { useEffect, useState } from "react"
import { getReceipts } from "@api/noodleApi"
import Rate from "./Rate.jsx";
import AddToCart from "./AddToCart.jsx";

export default function Main() {
    const [receipts, setReceipts] = useState([]);
    
    useEffect(() => {
        const fetchNoodles = async () => {
            try {
                const data = await getReceipts();
                setReceipts(data)
            } catch (error) {
              console.error("Error fetching noodles:", error);
            }
          };
      
          fetchNoodles();
    }, [])

    const receiptNameClasses = (nameLength) => {
        const classes = ['block', 'text-center', 'font-bangers']

        if (nameLength > 20) {
            classes.push('text-2xl')
        } else {
            classes.push('text-3xl')
        }

        return classes.join(' ')
    }

    const handleSearchReceipts = async (e) => {
        console.log(123);
        
        const name = e.target.value;
        try {
            const data = await getReceipts(name);
            setReceipts(data)
        } catch (error) {
          console.error("Error fetching noodles:", error);
        }
    }

    return <div className="
                    pb-30 pt-4 bg-[#FCFCE3] 
                    px-10 lg:px-30
                    bg-[radial-gradient(circle,rgba(0,0,0,0.15)_2px,transparent_2px)] bg-[size:40px_40px]"
            >
        <div className="flex justify-between items-center">
            <div className="text-6xl font-bangers my-4">Menu</div>
            <input 
                type="text" 
                placeholder="Search Receipt..."
                className="bg-white px-1 border-1 rounded-lg w-80 h-10" 
                onChange={(e)=> handleSearchReceipts(e)}
            />
        </div>

        <section className="menu-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {receipts.map((receipt, index) => {
                return <div key={index} className="relative h-[650px] sm:h-[450px] md:h-[400px] xl:h-[500px]">
                    <div className="group h-auto flex flex-col bg-[#FCFCE3] absolute hover:z-3 rounded-3xl overflow-hidden border-1 border-solid border-black hover:scale-110 transition duration-300">
                        <img src={`/receipts/${receipt.image}`} />
                        <div className="flex justify-between items-end pl-4 pr-4 pt-6 pb-6 group-hover:pb-2">
                            <span className={receiptNameClasses(receipt.name.length)}>{receipt.name}</span>
                            <span className="font-bangers">${receipt.price}</span>
                        </div>
                        <div className="px-4 pb-4 pt-0 hidden h-0 group-hover:block group-hover:h-full">
                            <div className="flex flex-col xl:flex-row justify-between items-center">
                                <Rate score={receipt.rates} />
                                <AddToCart receiptId={receipt.id} />
                            </div>
                            
                            <h3 className="text-xl font-bangers text-center xl:text-start">{receipt.calories} Cals</h3>
                            <div className="text-sm text-center xl:text-start">:{receipt.ingredients.join(', ')}</div>
                        </div>
                    </div>
                </div>
            })}
        </section>
    </div>
}