import { useEffect, useRef, useState } from "react"
import { getReceipts } from "@api/graphqlNoodleApi.js";
import Rate from "./Rate.jsx";
import AddToCart from "./AddToCart.jsx";
import LoadingComponent from "./LoadingComponent.jsx";

export default function Main() {
    const originalReceipts = useRef([])
    const [receipts, setReceipts] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        const fetchNoodles = async () => {
            try {
                setIsLoading(true)
                const data = await getReceipts();
                originalReceipts.current = data
                setReceipts(data)
            } catch (error) {
              console.error("Error fetching noodles:", error);
            } finally {
                setIsLoading(false)
            }
          };
      
          fetchNoodles();
    }, [])

    const receiptNameClasses = (nameLength) => {
        const classes = ['block', 'text-center', 'font-bangers']

        const fontSize = (nameLength > 20) 
            ? 'text-2xl'
            : 'text-3xl';

        classes.push(fontSize)

        return classes.join(' ')
    }

    const handleSearchReceipts = async (e) => {        
        const name = e.target.value;

        if (name) {
            const filteredRecepits = originalReceipts.current.filter(
                recepit => 
                recepit.name.toLowerCase().includes(name.toLowerCase())
            )

            setReceipts(filteredRecepits)
        } else {
            setReceipts(originalReceipts.current)
        }
    }

    return <div className="
                    pb-30 pt-4 bg-[#FCFCE3] 
                    px-10 lg:px-30
                    bg-[radial-gradient(circle,rgba(0,0,0,0.15)_2px,transparent_2px)] bg-[size:40px_40px]"
            >
        <div className="flex justify-between items-center">
            <div className="text-6xl font-bangers my-4">Menu</div>
            {isLoading 
                ? <></>
                : <input 
                    type="text" 
                    placeholder="Search Receipt..."
                    className="bg-white px-1 border-1 rounded-lg w-80 h-10" 
                    onChange={(e)=> handleSearchReceipts(e)}
                />
            }
        </div>

        {
            isLoading 
            ? <LoadingComponent />
            : <section className="menu-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {receipts.length <= 0 
                    ? <div className="font-bangers text-xl">
                        No search results found...
                    </div>
                    : receipts.map((receipt, index) => {
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
                                        <AddToCart targetReceipt={receipt} />
                                    </div>
                                    
                                    <h3 className="text-xl font-bangers text-center xl:text-start">{receipt.calories} Cals</h3>
                                    <div className="text-sm text-center xl:text-start">:{receipt.ingredients.join(', ')}</div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </section>
        }
    </div>
}