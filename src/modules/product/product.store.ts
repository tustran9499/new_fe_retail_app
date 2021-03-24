import React from 'react';
import { observable, action } from 'mobx';
import productService from './product.service';
import { Product } from './product.dto';

class ProductStore {
    @observable products: Product[] = [];
    @observable totalCount: number = 0;

    @action
    async getProducts(skip: number, take: number) {
        let data: any = [];
        data = await productService.getProducts(skip, take);
        this.products = data;
        this.totalCount = 0;
    }
}

export default new ProductStore();

export const ProductStoreContext = React.createContext(new ProductStore());
