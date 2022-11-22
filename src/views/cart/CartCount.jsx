import {useEffect, useState} from "react";
import axios from "axios";
import {API_GET_CART} from "../../utils/const";

const CartCount = () => {

  let token = localStorage.getItem("token");
  const [count, setCount] = useState(0);
  const getCartCount = async() => {
    if(token==null){
      setCount(JSON.parse(localStorage.getItem("cartTemp")).length);
      console.log('local',count);
    } else {
      const response = await axios.get(API_GET_CART, {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('token'),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      if (response) {
        setCount(response.data.length);
        console.log(count);
      }
    }
  };

useEffect(() => {
    getCartCount();

})
  return (
    <div className="cart-count">
      <span>{count}</span>
    </div>
  );
}

export default CartCount;