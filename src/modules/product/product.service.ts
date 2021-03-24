import http from "../../common/sevices";

class ProductService {
  productPrefix: string = "https://warehouse-retail.herokuapp.com/api" + "/products";

  public async getProducts(skip: number, take: number) {
    const result = await http.get(`${this.productPrefix}/`, {
      headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJTdG9yZU1hbmFnZXIiLCJpYXQiOjE2MTY1OTM0MTgsImV4cCI6MTYxNjU5NzAxOH0.KGhOztwOuBYwth9_D6m8GoQnnxvgcnAEm2iZKv81Hr4' },
      params: {
        page: skip,
        limit: take,
      },
    });
    return result.data;
  }
}

export default new ProductService();
