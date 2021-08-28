import React, {useState,useEffect} from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManager';
import Reviewitem from '../ReviewItem/Reviewitem';

const Review = () => {

   const [cart, setCart] = useState([]);

    useEffect(()=>{
        // cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd =>pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    },[])

    return (
        <div>
            <h1>Cart Items : {cart.length}</h1>
            {
                cart.map(pd=><Reviewitem 
                    key={pd.key}
                    product={pd}></Reviewitem>)
            }
        </div>
    );
};

export default Review;