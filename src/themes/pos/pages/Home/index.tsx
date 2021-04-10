import { observer } from "mobx-react";
import React from "react";
import { ProductStoreContext } from "../../../../modules/product/product.store";
import { CartStoreContext } from "../../stores/cart.store";
import { Row, Modal, Col, Button, Pagination, Table, Tag, Radio, Space, Tabs, Card, Skeleton, Avatar, List, Spin, Divider, Form, Input, Select, } from 'antd';
import { ExclamationCircleOutlined, AudioOutlined, EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import "antd/dist/antd.css";
import UpdateProductModal from "../../../../modules/product/components/ManageProduct/UpdateProductModal";
import CreateProductModal from "../../../../modules/product/components/ManageProduct/CreateProductModal";
import { makeAutoObservable, autorun, observable, toJS } from "mobx"
import Cart from "./Cart";
import { Jumbotron, Container, Breadcrumb } from 'react-bootstrap';

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
  const [returnCash, setReturnCash] = React.useState<number>(0);
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
  React.useEffect(() => {
  }, [returnCash]);

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
      title: "Discontinued",
      dataIndex: "Discontinued",
      key: "Discontinued",
      render: (val) =>
        (!val) ? <Tag color="green">In stock</Tag> : <Tag color="red">Out of stock</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            style={{}}
            icon={<ShoppingCartOutlined />}
            className=""
            type="primary"
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
  const onChangePay = async (e) => {
    setReturnCash(Number(e.target.value) - cartStore.totalAmount);
    console.log('Change:', e.target.value);
  };

  return (
    <>
      <div style={{ background: "white" }}>
        {console.log(products)}
        <Row>
          <Col span={10} ><Cart productsInCart={cartStore.productsInCart} totalNum={cartStore.totalNum} totalAmount={cartStore.totalAmount} isCheckout={cartStore.isCheckout} /></Col>
          {(!cartStore.isCheckout) && <Col span={12} offset={1}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Table" key="1">
                <Spin spinning={loading}>
                  <Table<Product> size="small" columns={columns} dataSource={products} rowKey={(record) => record.Id} pagination={false} />
                </Spin>
              </TabPane>
              <TabPane tab="Cards" key="2">
                <Spin spinning={loading}>
                  <List
                    grid={{
                      gutter: 16,
                      xs: 1,
                      sm: 2,
                      md: 3,
                      lg: 3,
                      xl: 4,
                      xxl: 4,
                    }}
                    dataSource={products}
                    renderItem={product => (
                      <List.Item>
                        <Card
                          size="small"
                          style={{ marginTop: 7 }}
                          actions={[
                            <ShoppingCartOutlined onClick={() => handleClick(product)} />
                          ]}
                        >

                          <Skeleton loading={false} avatar active>
                            <Meta
                              avatar={
                                <Avatar size="small" shape="square" size={48} src={"http://127.0.0.1:4000/api/products/img/thumbnails-" + String(product.PhotoURL ? product.PhotoURL : "default.png")} />
                              }
                              title={product.ProductName}
                              description={!product.Discontinued ? <Tag color="green">In stock</Tag> : <Tag color="red">Out of stock</Tag>}
                            />

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
              <Col span={20} offset={2}>
                <Pagination
                  size="small"
                  showQuickJumper
                  defaultCurrent={1}
                  total={total}
                  showTotal={showTotal}
                  defaultPageSize={10}
                  onChange={onChange}
                />
              </Col>
            </Row>
          </Col>}
          {(cartStore.isCheckout) && <Col span={12} offset={1}>
            <Breadcrumb class="mb-0 pb-0">
              <h5>Payment</h5>
            </Breadcrumb>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Cash" key="1">
                <Form
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 14 }}
                  layout="horizontal"
                >
                  <Form.Item label="Total">
                    <Input disabled={cartStore.isCheckout} value={cartStore.totalAmount} />
                  </Form.Item>
                  <Form.Item label="Pay">
                    <Input onChange={async (e) => await onChangePay(e)} />
                  </Form.Item>
                  <Form.Item label="Return">
                    <Input disabled={cartStore.isCheckout} value={returnCash} />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Confirm
        </Button>
                  </Form.Item>
                </Form>
              </TabPane>
              <TabPane tab="Credit card" key="2"></TabPane>
              <TabPane tab="E-Wallet" key="3"></TabPane>
            </Tabs>
          </Col>}
        </Row>
        <br />
      </div>
    </>
  );
};

export default observer(HomePage);
