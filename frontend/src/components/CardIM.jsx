import { useMutation } from "react-query";
import { useQuery } from "react-query";
import { axiosClient } from "../lib/axiosClient";
import { useLocalStorage } from "usehooks-ts";
import { formatMoney } from "../api/utils";




export function CartItem({ data }){
    const userId = getUserId();
    const {mutate} = useMutation({
        mutationFn: (quantity)=>axiosClient({
            method: "POST",
            url: "/updateCart.php",
            data: {
                user_id : userId,
                shoe_id : data.id,
                quantity
            },
            headers: { "Content-Type": "multipart/form-data" },
          }),
        onSuccess({data}){
        }
    })

    const [cartItems,setCartItems] = useLocalStorage('cart',[])
    const curIndex = cartItems.findIndex(item => item.id === data.id) ;
    const updateQuantity = (q) => {
        const newQuantity =  cartItems[curIndex].quantity + q > 0 ? cartItems[curIndex].quantity + q : 0;
        if(newQuantity === 0){
            setCartItems([
                ...cartItems.slice(0,curIndex ),
                ...cartItems.slice(curIndex + 1),
            ])
                mutate(newQuantity)
                return;
        }
        setCartItems([
            ...cartItems.slice(0,curIndex ),
            {
                    ...data,
                    quantity:newQuantity
            },
            ...cartItems.slice(curIndex + 1),

        ])
        mutate(newQuantity)
    }
    return (  
        <div className="flex items-start  py-5">
            <div className="bgimagecart" style={{backgroundColor: data.color}}>
                <div className="block">
                    <img 
                        style={{
                            transform: "rotate(-30deg) translateY(-40px)",
                            filter: "drop-shadow(0 30px 20px rgba(0,0,0,.2))"
                        }}
                        src={data.image}
                        className="w-[130%] block max-w-[130%]"/>
                </div>
            </div>
            <div className="w-full">
                <div className="shopItemName">{data.name}</div>
                <div className="shopItemPrice">${formatMoney(data.price)}</div>
                <div className="flex justify-between">
                    <div className="flex items-center justify-between">
                        <button onClick={()=>updateQuantity(-1)} className="mibo">
                            -
                        </button>
                        <div className="mx-3">{data.quantity}</div>
                        <button onClick={()=>updateQuantity(1)}  className="mibo">
                            +
                        </button>
                    </div>
                    <button onClick={()=>updateQuantity( - cartItems[curIndex]?.quantity)} className="trash">
                        <img src="/trash.png" className="w-5 h-5"/>
                    </button>
                </div>
            </div>
        </div>
    )
}