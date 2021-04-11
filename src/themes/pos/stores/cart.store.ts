import React from 'react';
import { observable, action, computed, reaction, makeObservable, autorun } from 'mobx';
import productService from '../../../modules/product/product.service';
import { message } from 'antd';
// import { Product } from '../../../modules/product/product.dto';

interface CartProduct {
    Id: number;
    ProductName: string;
    CategoryId: number;
    QuantityPerUnit: string;
    UnitPrice: number;
    UnitsInStock: number;
    ReorderLevel: number;
    Discontinued: boolean;
    Quantity: number;
    Total: number;
}
interface Product {
    Id: number;
    ProductName: string;
    CategoryId: number;
    QuantityPerUnit: string;
    UnitPrice: number;
    UnitsInStock: number;
    ReorderLevel: number;
    Discontinued: boolean;
}

class CartStore {
    @observable productsInCart: CartProduct[] = [];
    @observable isCheckout: boolean = false;
    @computed get totalNum() {
        let total = 0;
        for (let item of this.productsInCart) {
            total = total + (item.Quantity)
        }
        return Number(total.toFixed(2));;
    }
    @computed get totalAmount() {
        let total = 0;
        for (let item of this.productsInCart) {
            total = total + (item.Total)
        }
        return total.toFixed(2);
    }
    @action.bound
    addToCart = async (product: Product) => {
        let found = false;
        await this.productsInCart.map(item => {
            if (item.Id === product.Id) {
                item.Quantity += 1;
                item.Total = Number((item.UnitPrice * item.Quantity).toFixed(2));
                found = true;
                const index = this.productsInCart.findIndex(({ Id }) => Id === product.Id);
                this.productsInCart.splice(index, 1, item);
            }
        });
        if (!found) {
            await this.productsInCart.push({ ...product, Quantity: 1, Total: product.UnitPrice });
        }
    }
    @action.bound
    addToCartById = async (id: number) => {
        const promise = productService.getOne(id);
        promise.then((res: any) => {
            if (res.data != "") {
                this.addToCart(res.data);
            }
            else {
                message.error("Invalid ID!");
            }
        });
        promise.catch((err: any) => {
            message.error(err.response);
        });
    }
    @action.bound
    updateQuantity = async (product: Product, quantity: number) => {
        await this.productsInCart.map(item => {
            if (item.Id === product.Id) {
                item.Quantity = Number(quantity);
                item.Total = item.UnitPrice * item.Quantity;
                const index = this.productsInCart.findIndex(({ Id }) => Id === product.Id);
                this.productsInCart.splice(index, 1, item);
            }
        });
    }
    @action.bound
    decreaseToCart = async (product: Product) => {
        await this.productsInCart.map(item => {
            if (item.Id === product.Id) {
                if (item.Quantity > 1) {
                    item.Quantity -= 1;
                    item.Total = Number((item.UnitPrice * item.Quantity).toFixed(2));
                    const index = this.productsInCart.findIndex(({ Id }) => Id === product.Id);
                    this.productsInCart.splice(index, 1, item);
                }
                else {
                    this.removeFromCart(product);
                }
            }
        });
    }
    @action.bound
    removeFromCart = async (product: Product) => {
        const index = this.productsInCart.findIndex(({ Id }) => Id === product.Id);
        if (index >= 0) {
            this.productsInCart.splice(index, 1);
        }
    }
    @action.bound
    emptyCart = async () => {
        this.productsInCart.splice(0, this.productsInCart.length);
    }
    @action.bound
    checkoutCart = async () => {
        this.isCheckout = true;
    }
    @action.bound
    returnToCart = async () => {
        this.isCheckout = false;
    }
    @action.bound
    fetchCart = async () => {
        return this.productsInCart;
    }

    constructor() {
        makeObservable(this);
        autorun(() => console.log(this.productsInCart));
    }
}
export default new CartStore();

export const CartStoreContext = React.createContext(new CartStore());
