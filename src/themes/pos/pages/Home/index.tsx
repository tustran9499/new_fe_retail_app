import { observer } from "mobx-react";
import React from "react";
import { ProductStoreContext } from "../../../../modules/product/product.store";
import { CartStoreContext } from "../../stores/cart.store";
import { Row, Modal, Col, Button, Pagination, Table, Tag, Radio, Space, Tabs, Card, Skeleton, Avatar, List, Spin, Divider } from 'antd';
import { ExclamationCircleOutlined, AudioOutlined, EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import "antd/dist/antd.css";
import UpdateProductModal from "../../../../modules/product/components/ManageProduct/UpdateProductModal";
import CreateProductModal from "../../../../modules/product/components/ManageProduct/CreateProductModal";
import { makeAutoObservable, autorun, observable, toJS } from "mobx"
import Cart from "./Cart";

interface Product {
  Id: number;
  ProductName: string;
  CategoryId: number;
  QuantityPerUnit: string;
  UnitPrice: number;
  UnitsInStock: number;
  ReorderLevel: number;
  Discontinued: boolean;
  PhotoURL: string;
}

const { confirm } = Modal;



const HomePage = () => {
  const productStore = React.useContext(ProductStoreContext);
  const cartStore = React.useContext(CartStoreContext);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [products, setProducts] = React.useState<any[]>([]);
  const [total, setTotal] = React.useState<number>();
  const [pagination, setPagination] = React.useState<any>({ PageNo: 1, PageSize: 10 });
  productStore.getProducts(pagination.PageNo, pagination.PageSize);
  const getProducts = async () => {
    setLoading(true);
    // await productStore.getProducts(pagination.PageNo, pagination.PageSize);
    setProducts(productStore.products);
    setTotal(productStore.totalCount);
    setPagination({ PageNo: productStore.pageNum, PageSize: productStore.pageSize });
    setLoading(false);
  };
  const initfunc = async () => {
    setLoading(true);
    await productStore.getProducts(pagination.PageNo, pagination.PageSize);
    setProducts(productStore.products);
    setTotal(productStore.totalCount);
    setPagination({ PageNo: productStore.pageNum, PageSize: productStore.pageSize });
    setLoading(false);
  }
  const refetch = async () => {
    await initfunc();
    await productStore.toggleRefetch();
  }
  React.useEffect(() => {
    initfunc();
  }, [productStore, productStore.refetch]);
  React.useEffect(() => autorun(() => {
    getProducts();
  }), []);

  const showTotal = (total: number) => {
    return `Total ${total} items`;
  }

  const onChange = async (pageNumber: number, pageSize: any) => {
    setLoading(true);
    if (pageNumber == 0 || pageSize != pagination.PageSize) pageNumber = 1;
    await productStore.changePage(pageNumber, pageSize);
    setProducts(productStore.products);
    setTotal(productStore.totalCount);
    setPagination({ PageNo: productStore.pageNum, PageSize: productStore.pageSize });
    setLoading(false);
  }

  const showPromiseConfirm = async (row: any) => {
    confirm({
      title: "Do you want to delete product " + row.ProductName,
      icon: <ExclamationCircleOutlined />,
      content: "Warning: The delete product cannot be recover",
      async onOk() {
        setLoading(true)
        await productStore.deleteProduct(row.Id);
        await productStore.toggleRefetch();
        setProducts(productStore.products);
        setLoading(false)
      },
      onCancel() { },
    });
  }

  const handleClick = (e: any) => {
    cartStore.addToCart(e);
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
      title: "UnitPrice",
      dataIndex: "UnitPrice",
      sorter: false,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <UpdateProductModal record={record} refetch={refetch} />
          <DeleteOutlined onClick={() => showPromiseConfirm(record)} /> */}
          <Button
            style={{}}
            className="p-2 h-100"
            type="primary"
            danger
            onClick={() => handleClick(record)}
          >
            Add
          </Button>
        </Space>
      ),
    },
  ];

  // getProducts();
  const initf = () => { productStore.getProducts(pagination.PageNo, pagination.PageSize); };

  const callback = (key: any) => {
    console.log(key);
  }

  const { TabPane } = Tabs;
  const { Meta } = Card;
  const gridStyle = {
    width: '50%',
    border: "none",
  };


  return (
    <>
      <div style={{ background: "white" }}>
        {console.log(products)}
        <Row>
          <Col span={10}><Cart productsInCart={cartStore.productsInCart} /></Col>
          <Col span={14}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Table" key="1">
                <Spin spinning={loading}>
                  <Table<Product> columns={columns} dataSource={products} rowKey={(record) => record.Id} pagination={false} />
                </Spin>
              </TabPane>
              <TabPane tab="Cards" key="2">
                <Spin spinning={loading}>
                  <List
                    grid={{
                      gutter: 16,
                      xs: 1,
                      sm: 2,
                      md: 2,
                      lg: 2,
                      xl: 3,
                      xxl: 4,
                    }}
                    dataSource={products}
                    renderItem={product => (
                      <List.Item>
                        <Card
                          style={{ width: 300, marginTop: 16 }}
                          actions={[
                            <UpdateProductModal record={product} refetch={refetch} />,
                            <DeleteOutlined onClick={() => showPromiseConfirm(product)} />
                          ]}
                        >

                          <Skeleton loading={false} avatar active>
                            <Meta
                              avatar={
                                <Avatar shape="square" size={64} src={"http://127.0.0.1:4000/api/products/img/thumbnails-" + String(product.PhotoURL ? product.PhotoURL : "default.png")} />
                              }
                              title={product.ProductName}
                              description={!product.Discontinued ? <Tag color="green">In stock</Tag> : <Tag color="red">Out of stock</Tag>}
                            />
                            <p>{product.QuantityPerUnit}</p>
                          </Skeleton>

                        </Card>
                      </List.Item>
                    )}
                  />,
              </Spin>
              </TabPane>
            </Tabs>
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
          </Col>
        </Row>
      </div>
    </>
  );
};

export default observer(HomePage);
