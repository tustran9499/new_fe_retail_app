import React from 'react';
import { inject, observer } from 'mobx-react';
import { CartStoreContext } from "../../stores/cart.store";

const CartItem = (item) => {
    const cartStore = React.useContext(CartStoreContext);
    const handleRemoveClick = async (e) => {
        await cartStore.removeFromCart(e);
    }
    const handleIncreaseClick = async (e) => {
        await cartStore.addToCart(e);
    }
    const handleDecreaseClick = async (e) => {
        await cartStore.decreaseToCart(e);
    }
    console.log("ahdh", item);
    return (
        <tr>
            <td>
                {item.item.ProductName}
            </td>
            <td>
                {item.item.Quantity}
            </td>
            <td>
                {item.item.UnitPrice}
            </td>
            <td>
                {item.item.Total}
            </td>
            <td>
                <button onClick={async () => await handleIncreaseClick(item.item)} > Increase </button>
            </td>
            <td>
                <button onClick={async () => await handleDecreaseClick(item.item)} > Decrease </button>
            </td>
            <td>
                <button onClick={async () => await handleRemoveClick(item.item)} > Remove </button>
            </td>
        </tr>
    );
}
export default CartItem;
