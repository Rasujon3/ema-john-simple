import React, {useState,useEffect} from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart,removeFromDatabaseCart } from '../../utilities/databaseManager';
import Reviewitem from '../ReviewItem/Reviewitem';
import Cart from '../Cart/Cart';

const Review = () => {

   const [cart, setCart] = useState([]);

   const removeProduct = (productKey) => {
    const newCart = cart.filter(pd => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
}

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
        <div className="twin-container">
            <div className="product-container">
            {
                cart.map(pd=><Reviewitem 
                    key={pd.key}
                    removeProduct = {removeProduct}
                    product={pd}></Reviewitem>)
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Review;












