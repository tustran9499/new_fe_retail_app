import React from 'react';
import { observable, action } from 'mobx';
import productService from './product.service';
import { Product } from './product.dto';

class ProductStore {
    @observable products: Product[] = [];
    @observable totalCount: number = 0;
    @observable pageNum: number = 1;
    @observable pageSize: number = 10;

    @action
    async getProducts(skip: number, take: number) {
        let data: any = [];
        data = await productService.getProductsPagination(skip, take);
        this.products = data.items;
        this.totalCount = data.meta.totalItems;
        // this.pageNum = data.meta.currentPage;
        // this.pageSize = data.meta.itemCount;
    }

    @action
    async createProducts(product: Product) {
        await productService.createProduct(product);
        let data: any = [];
        data = await productService.getProductsPagination(this.pageNum, this.pageSize);
        this.products = data.items;
        this.totalCount = data.meta.totalItems;
        // this.pageNum = data.meta.currentPage;
        // this.pageSize = data.meta.itemCount;
    }

    @action
    async updateProducts(id: number, product: Product) {
        await productService.updateProduct(id, product);
        let data: any = [];
        data = await productService.getProductsPagination(this.pageNum, this.pageSize);
        this.products = data.items;
        this.totalCount = data.meta.totalItems;
        // this.pageNum = data.meta.currentPage;
        // this.pageSize = data.meta.itemCount;
    }

    @action
    async changePage(page: number, pageSize: number) {
        let data: any = [];
        this.pageNum = page;
        this.pageSize = pageSize
        data = await productService.getProductsPagination(page, this.pageSize);
        this.products = data.items;
        this.totalCount = data.meta.totalItems;
        // this.pageNum = data.meta.currentPage;
        // this.pageSize = data.meta.itemCount;
    }

    @action
    async deleteProduct(Id: number) {
        let data: any = [];
        await productService.deleteProducts(Id);
        data = await productService.getProductsPagination(this.pageNum, this.pageSize);
        this.products = data.items;
        this.totalCount = data.meta.totalItems;
        this.pageNum = data.meta.currentPage;
        this.pageSize = data.meta.itemCount;
    }
}

export default new ProductStore();

export const ProductStoreContext = React.createContext(new ProductStore());
