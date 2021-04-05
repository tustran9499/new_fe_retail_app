import React from 'react';
import { observable, action, computed, reaction } from 'mobx';
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
    addToCart(product: Product) {
        console.log("signal add to cart");
        this.productsInCart.push(product);
    }
    @action.bound
    removeFromCart(product: Product) {
        const index = this.productsInCart.indexOf(product);
        if (index >= 0) {
            this.productsInCart.splice(index, 1);
        }
    }
    @action.bound
    fetchCart() {
        return this.productsInCart;
    }
}
export default new CartStore();

export const CartStoreContext = React.createContext(new CartStore());
