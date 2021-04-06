import React from 'react';
import { inject, observer } from 'mobx-react';
import { CartStoreContext } from "../../stores/cart.store";

const CartItem = (item) => {
    const cartStore = React.useContext(CartStoreContext);
    const handleClick = async (e) => {
        await cartStore.removeFromCart(e);
    }
    console.log("ahdh", item);
    return (
        <tr>
            <td>
                {item.item.ProductName}
            </td>
            <td>
                {item.item.UnitPrice}
            </td>
            <td>
                <button onClick={async () => await handleClick(item.item)} > Remove </button>
            </td>
        </tr>
    );
}
export default CartItem;
