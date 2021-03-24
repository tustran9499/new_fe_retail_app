import { observer } from "mobx-react";
import React from "react";
import { Row, Table } from "react-bootstrap";
import { ProductStoreContext } from "../../../../modules/product/product.store";

const HomePage = () => {
  const productStore = React.useContext(ProductStoreContext);
  const [products, setProducts] = React.useState<any[]>([]);

  React.useEffect(() => {
    const getProducts = async () => {
      await productStore.getProducts(0, 10);
      setProducts(productStore.products);
    };
    getProducts();
  }, [productStore]);

  return (
    <>
      <div style={{ background: "white", minHeight: "1000px" }}>
        {console.log(products)}
        <Row style={{ marginLeft: '10px' }}>Home Page</Row>
        <Row style={{ marginLeft: '10px' }}>Test account</Row>
        <br />
        <Table striped bordered hover responsive="lg" style={{ marginLeft: '10px' }}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category Id</th>
              <th>Quantity/Unit</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product: any) => (
              <tr>
                <td>{product.ProductName}</td>
                <td>{product.CategoryId}</td>
                <td>{product.QuantityPerUnit}</td>
                <td>{product.UnitsInStock}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default observer(HomePage);
