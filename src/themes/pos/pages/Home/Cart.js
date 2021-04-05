import React from 'react';
import { inject, observer } from 'mobx-react';
import CartItem from './CartItem';
import { CartStoreContext } from "../../stores/cart.store";

const Cart = () => {
    const cartStore = React.useContext(CartStoreContext);
    const [items, setItems] = React.useState(cartStore.fetchCart());
    return (
        <div>
            <h2>Cart</h2>
            <table>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
                {
                    items.map((item, idx) => {
                        return (<CartItem item={item} key={idx} />)
                    })
                }
                {/* <tr>
                    <th>
                        Total Amount
                </th>
                    <th>
                        {this.props.cartStore.totalAmount}
                    </th>
                </tr> */}
            </table>
        </div>
    );
}
export default Cart;

