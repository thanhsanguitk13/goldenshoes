import { useReadLocalStorage } from "usehooks-ts";
import { CartItem } from "./CardIM";
import { formatMoney } from '../api/utils'

export function Cart(){
    const cartItems = useReadLocalStorage('cart',[])
    const total = cartItems.reduce( (acc, crr) => acc + ( + crr.price * crr.quantity) ,0);
    return  <div className="card">
        <img src="/nike.png" className="nike" />
        <div className="flex justify-between items-center"> 
            <div className="formatCartMoney">Your cart</div>
            <div className="formatCartMoney">${formatMoney(total)}</div>
        </div>
        <div className="card-body relative">
            <ul className="">
                <div className="hidden last:block"><p>Your cart is empty.</p></div>
                {
                    cartItems?.map(card=>{
                        return  <li key={card.id}>
                                    <CartItem data={card}/>
                                </li>
                    })
                }
            </ul>
        </div>
    </div>
}