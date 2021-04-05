import React from 'react';
import { inject, observer } from 'mobx-react';
import { CartStoreContext } from "../../stores/cart.store";

const CartItem = (item) => {
    const cartStore = React.useContext(CartStoreContext);
    const handleClick = async (e) => {
        await cartStore.removeFromCart(e);
    }
    return (
        <tr>
            <td>
                {item.ProductName}
            </td>
            <td>
                {item.UnitPrice}
            </td>
            <td>
                <button onClick={() => handleClick(item)} > Remove </button>
            </td>
        </tr>
    );
}
export default CartItem;
