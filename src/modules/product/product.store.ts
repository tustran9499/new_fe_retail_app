import React from 'react';
import { observable, action, makeObservable, autorun } from 'mobx';
import productService from './product.service';
import { Product } from './product.dto';

class ProductStore {
    @observable products: Product[] = [];
    @observable totalCount: number = 0;
    @observable pageNum: number = 1;
    @observable pageSize: number = 10;
    @observable refetch: boolean = true;
    @observable searchKey: string = '';

    @action.bound
    async toggleRefetch() {
        this.refetch = !this.refetch;
    }

    @action.bound
    async getProducts(skip: number, take: number) {
        let data: any = [];
        data = await productService.searchProductsPagination(skip, take, this.searchKey);
        this.products = data.items;
        this.totalCount = data.meta.totalItems;
        // this.pageNum = data.meta.currentPage;
        // this.pageSize = data.meta.itemCount;
    }

    @action.bound
    async createProducts(product: Product) {
        await productService.createProduct(product);
        let data: any = [];
        data = await productService.searchProductsPagination(this.pageNum, this.pageSize, this.searchKey);
        this.products = data.items;
        this.totalCount = data.meta.totalItems;
        // this.pageNum = data.meta.currentPage;
        // this.pageSize = data.meta.itemCount;
    }

    @action.bound
    async updateProducts(id: number, product: Product) {
        await productService.updateProduct(id, product);
        let data: any = [];
        data = await productService.searchProductsPagination(this.pageNum, this.pageSize, this.searchKey);
        this.products = data.items;
        this.totalCount = data.meta.totalItems;
        // this.pageNum = data.meta.currentPage;
        // this.pageSize = data.meta.itemCount;
    }

    @action.bound
    async changePage(page: number, pageSize: number) {
        let data: any = [];
        this.pageNum = page;
        this.pageSize = pageSize
        data = await productService.searchProductsPagination(page, this.pageSize, this.searchKey);
        this.products = data.items;
        this.totalCount = data.meta.totalItems;
        // this.pageNum = data.meta.currentPage;
        // this.pageSize = data.meta.itemCount;
    }

    @action.bound
    async changeSearchKey(key: string) {
        let data: any = [];
        this.pageNum = 1;
        this.pageSize = 10;
        this.searchKey = key.trim();
        data = await productService.searchProductsPagination(1, 10, key);
        this.products = data.items;
        this.totalCount = data.meta.totalItems;
        // this.pageNum = data.meta.currentPage;
        // this.pageSize = data.meta.itemCount;
    }

    @action.bound
    async deleteProduct(Id: number) {
        let data: any = [];
        await productService.deleteProducts(Id);
        data = await productService.searchProductsPagination(this.pageNum, this.pageSize, this.searchKey);
        this.products = data.items;
        this.totalCount = data.meta.totalItems;
        this.pageNum = data.meta.currentPage;
        this.pageSize = data.meta.itemCount;
    }

    @action.bound
    async startSearch() {
        let data: any = [];
        data = await productService.searchProductsPagination(this.pageNum, this.pageSize, this.searchKey.trim());
        this.products = data.items;
        this.totalCount = data.meta.totalItems;
        // this.pageNum = data.meta.currentPage;
        // this.pageSize = data.meta.itemCount;
    }

    constructor() {
        makeObservable(this);
        autorun(() => console.log(this.products));
    }

}

export default new ProductStore();

export const ProductStoreContext = React.createContext(new ProductStore());
