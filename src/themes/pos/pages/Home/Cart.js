import React from 'react';
import { inject, observer } from 'mobx-react';
import CartItem from './CartItem';
import { CartStoreContext } from "../../stores/cart.store";
import { makeAutoObservable, autorun, observable } from "mobx"
import { Table, Breadcrumb } from 'react-bootstrap';
import { Input, Tooltip, Button, message } from 'antd';
import { PlusOutlined, MinusOutlined, DeleteOutlined, CheckOutlined, ArrowLeftOutlined, PrinterOutlined } from "@ant-design/icons";


const Cart = observer(({ productsInCart, totalNum, totalAmount, isCheckout }) => {
    const cartStore = React.useContext(CartStoreContext);
    const handleEmptyClick = async () => {
        await cartStore.emptyCart();
    }
    const handleCheckoutClick = async () => {
        if (totalNum == 0) {
            message.error('Cart is empty');
        }
        else {
            await cartStore.checkoutCart();
        }
    }
    const handleModifyClick = async () => {
        await cartStore.returnToCart();
    }
    const handleConfirmPrintClick = async () => {
        window.print();
    }
    return (
        <div class="p-4 mr-2">
            <Breadcrumb>
                <h5>Cart</h5>
            </Breadcrumb>
            {(!isCheckout) && <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th class="pr-0">#</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th class="text-right pr-5">Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productsInCart.map((item, idx) => {
                            return (<CartItem item={item} key={idx} isCheckout={isCheckout} />)
                        })
                    }
                    <tr>
                        <td>
                        </td>
                        <td class="pr-0">
                            Num
                        </td>
                        <td>
                            {totalNum}
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td class="p-0">
                            <Button onClick={async () => await handleEmptyClick()} type="link" icon={<DeleteOutlined />} >Empty cart</Button>
                        </td>


                    </tr>
                    <tr>
                        <td>
                        </td>
                        <td class="pr-0">
                            Total
                        </td>
                        <td>
                            {totalAmount}
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td class="p-0">
                            <Button onClick={async () => await handleCheckoutClick()} type="link" icon={<CheckOutlined />} >Confirm order</Button>
                        </td>

                    </tr>
                </tbody>
            </Table>}
            {(isCheckout) && <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th class="text-right pr-5">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productsInCart.map((item, idx) => {
                            return (<CartItem item={item} key={idx} isCheckout={isCheckout} />)
                        })
                    }
                    <tr>
                        <td>
                        </td>
                        <td>
                            Num
                        </td>
                        <td>
                            {totalNum}
                        </td>
                        <td>
                        </td>
                        <td class="p-0">
                            <Button onClick={async () => await handleConfirmPrintClick()} type="link" icon={<PrinterOutlined />} >Confirm and print receipt</Button>
                        </td>

                    </tr>
                    <tr>
                        <td>
                        </td>
                        <td>
                            Total
                        </td>
                        <td>
                            {totalAmount}
                        </td>
                        <td>
                        </td>
                        <td class="p-0">
                            <Button onClick={async () => await handleModifyClick()} type="link" icon={< ArrowLeftOutlined />} >Modify order</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>}
        </div>
    );
});
export default Cart;

