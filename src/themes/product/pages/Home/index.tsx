import { observer } from "mobx-react";
import React from "react";
import { ProductStoreContext } from "../../../../modules/product/product.store";
import { Row, Col, Pagination, Table, Tag, Radio, Space } from 'antd';
import { ColumnsType } from "antd/es/table";
import "antd/dist/antd.css";

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


const columns: ColumnsType<Product> = [
  {
    title: "ProductName",
    dataIndex: "ProductName",
    sorter: false,
  },
  {
    title: "CategoryId",
    dataIndex: "CategoryId",
    sorter: false,
  },
  {
    title: "QuantityPerUnit",
    dataIndex: "QuantityPerUnit",
    sorter: false,
  },
  {
    title: "UnitsInStock",
    dataIndex: "UnitsInStock",
    sorter: false,
  },
  {
    title: "ReorderLevel",
    dataIndex: "ReorderLevel",
    sorter: false,
  },
  {
    title: "Discontinued",
    dataIndex: "Discontinued",
    key: "Discontinued",
    render: (val) =>
      val ? <Tag color="green">In stock</Tag> : <Tag color="red">Out of stock</Tag>,
  },
];

const HomePage = () => {
  const productStore = React.useContext(ProductStoreContext);
  const [products, setProducts] = React.useState<any[]>([]);
  const [total, setTotal] = React.useState<number>();
  const [pagination, setPagination] = React.useState<any>({ PageNo: 1, PageSize: 10 });

  React.useEffect(() => {
    const getProducts = async () => {
      await productStore.getProducts(pagination.PageNo, pagination.PageSize);
      setProducts(productStore.products);
      setTotal(productStore.totalCount);
      setPagination({ PageNo: productStore.pageNum, PageSize: productStore.pageSize });
    };
    getProducts();
  }, [productStore]);

  const showTotal = (total: number) => {
    return `Total ${total} items`;
  }

  const onChange = async (pageNumber: number, pageSize: any) => {
    console.log("Page: ", pageNumber);
    console.log("PageSize: ", pageSize);
    console.log("PreviousPageSize: ", pagination.PageSize);
    if (pageNumber == 0 || pageSize != pagination.PageSize) pageNumber = 1;
    console.log("Page: ", pageNumber);
    await productStore.changePage(pageNumber, pageSize);
    setProducts(productStore.products);
    setTotal(productStore.totalCount);
    setPagination({ PageNo: productStore.pageNum, PageSize: productStore.pageSize });
  }


  return (
    <>
      <div style={{ background: "white", minHeight: "1000px" }}>
        {console.log(products)}
        <Row style={{ marginLeft: '10px' }}>Home Page</Row>
        <Row style={{ marginLeft: '10px' }}>Test products</Row>
        <br />
        <Table<Product> columns={columns} dataSource={products} rowKey={(record) => record.Id} pagination={false} />
        <br />
        <Row>
          <Col span={18} offset={6}>
            <Pagination
              showQuickJumper
              defaultCurrent={1}
              total={total}
              showTotal={showTotal}
              defaultPageSize={10}
              onChange={onChange}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default observer(HomePage);
