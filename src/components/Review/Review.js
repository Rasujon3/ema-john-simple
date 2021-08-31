import React, {useState,useEffect} from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart,processOrder,removeFromDatabaseCart } from '../../utilities/databaseManager';
import Reviewitem from '../ReviewItem/Reviewitem';
import Cart from '../Cart/Cart';
import happpyimage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {

   const [cart, setCart] = useState([]);
   const [orderPlaced, setOrderPlaced] = useState(false);
   const history = useHistory()

   const handleProceedCheckOut = () =>{
       history.push('/shipment');
   }

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
    },[]);

    let thankyou;
     if (orderPlaced) {
        thankyou = <img src={happpyimage} alt=""/>
     } 

    return (
        <div className="twin-container">
            <div className="product-container">
            {
                cart.map(pd=><Reviewitem 
                    key={pd.key}
                    removeProduct = {removeProduct}
                    product={pd}></Reviewitem>)
            }

            { thankyou }

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckOut} className="main-button">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;












