import React from 'react';
import { observable, action, computed, reaction, makeObservable, autorun } from 'mobx';
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

    @computed get totalNum() {
        let total = 0;
        for (let item of this.productsInCart) {
            total = total + (item.Quantity)
        }
        return total;
    }
    @computed get totalAmount() {
        let total = 0;
        for (let item of this.productsInCart) {
            total = total + (item.Total)
        }
        return total;
    }
    @action.bound
    addToCart = async (product: Product) => {
        let found = false;
        await this.productsInCart.map(item => {
            if (item.Id === product.Id) {
                item.Quantity += 1;
                item.Total = item.UnitPrice * item.Quantity;
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
    decreaseToCart = async (product: Product) => {
        await this.productsInCart.map(item => {
            if (item.Id === product.Id) {
                if (item.Quantity > 1) {
                    item.Quantity -= 1;
                    item.Total = item.UnitPrice * item.Quantity;
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
