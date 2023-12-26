import { useMutation } from "react-query"
import { axiosClient } from "../lib/axiosClient"
import { getUserId} from "../api/utils"
import { useLocalStorage } from "usehooks-ts";

export function AddToCart({data}){
    const userId = getUserId();
    const [cartItems,setCartItems] = useLocalStorage('cart',[])
    const curIndex = cartItems.findIndex( item => item.id === data.id) ;
    const {mutate, isLoading} = useMutation({
        mutationFn:()=>axiosClient({
            method: "POST",
            url: "/updateCart.php",
            data: {
                user_id : userId,
                shoe_id : data.id,
                quantity : 1
            },
            headers: { "Content-Type": "multipart/form-data" },
          }),
          onSuccess(data){
          }
    })
    function addItem (){
        if( curIndex == -1){
            setCartItems([...cartItems,{...data, quantity : 1} ])
            mutate();        
        }
    }
    return (   
    <button className="shopItemButton relative" onClick={addItem} 
    style={{cursor: curIndex == -1 ? 'pointer' : 'default', width: curIndex == -1 ? 'auto' : '50px'}}>
        {
           curIndex == -1 ? <p className="uppercase">add to cart</p> : <img src="/check.png" className="checkTick"/>
        }
    </button>
    )
}