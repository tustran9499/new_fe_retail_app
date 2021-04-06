import React from 'react';
import { observable, action, computed, reaction, makeObservable, autorun } from 'mobx';
// import { Product } from '../../../modules/product/product.dto';

interface Product {
    Id: number;
    ProductName: string;
    CategoryId: number;
    QuantityPerUnit: string;
    UnitPrice: number;
    // UnitsInStock: number;
    // ReorderLevel: number;
    // Discontinued: boolean;
    // PhotoURL: string;
}

class CartStore {
    @observable productsInCart: Product[] = [];

    @computed get count() {
        return this.productsInCart.length;
    }
    @computed get totalAmount() {
        let total = 0;
        for (let item of this.productsInCart) {
            total = total + (item.UnitPrice)
        }
        return total;
    }
    @action.bound
    addToCart = async (product: Product) => {
        console.log("signal add to cart");
        await this.productsInCart.push(product);
        console.log(this.productsInCart)
    }
    @action.bound
    removeFromCart = async (product: Product) => {
        const index = this.productsInCart.indexOf(product);
        if (index >= 0) {
            this.productsInCart.splice(index, 1);
        }
    }
    @action.bound
    fetchCart = async () => {
        console.log("fetch");
        console.log(this.productsInCart);
        return this.productsInCart;
    }

    constructor() {
        makeObservable(this);
        autorun(() => console.log(this.productsInCart));
    }
}
export default new CartStore();

export const CartStoreContext = React.createContext(new CartStore());
