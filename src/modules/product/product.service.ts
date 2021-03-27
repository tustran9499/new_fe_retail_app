import http from "../../common/sevices";

class ProductService {
  productPrefix: string = "https://warehouse-retail.herokuapp.com/api" + "/products";

  public async getAllProducts() {
    const result = await http.get(`${this.productPrefix}/`, {
      headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJTdG9yZU1hbmFnZXIiLCJpYXQiOjE2MTY4Mzg0NjMsImV4cCI6MTYxNjg0MjA2M30.hMWDTi8uxVemZ1l29QqTITVPoGdk5ediyvdUfeNE7O4' },
    });
    return result.data;
  }

  public async getProductsPagination(skip: number, take: number) {
    const result = await http.get(`${this.productPrefix}/paginateProducts`, {
      headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJTdG9yZU1hbmFnZXIiLCJpYXQiOjE2MTY4Mzg0NjMsImV4cCI6MTYxNjg0MjA2M30.hMWDTi8uxVemZ1l29QqTITVPoGdk5ediyvdUfeNE7O4' },
      params: {
        page: skip,
        limit: take,
      },
    });
    return result.data;
  }
}

export default new ProductService();
