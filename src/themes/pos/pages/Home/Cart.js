import React from 'react';
import { inject, observer } from 'mobx-react';
import CartItem from './CartItem';
import { CartStoreContext } from "../../stores/cart.store";
import { makeAutoObservable, autorun, observable } from "mobx"


const Cart = observer(({ productsInCart }) => {
    // const cartStore = React.useContext(CartStoreContext);
    // const [items, setItems] = React.useState(cartStore.fetchCart());
    // const test = autorun(() => {
    //     console.log(cartStore.productsInCart);
    // });
    // React.useEffect(() => test);
    // React.useEffect(() => autorun(() => {
    //     {
    //         const data = cartStore.fetchCart();
    //         console.log("data", data);
    //         setItems(data);
    //     }
    // }), []);
    // console.log(productsInCart);
    return (
        <div>
            <h2>Cart</h2>
            <table>
                <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
                {
                    productsInCart.map((item, idx) => {
                        return (<CartItem item={item} key={idx} />)
                    })
                }
            </table>
        </div>
    );
});
export default Cart;

