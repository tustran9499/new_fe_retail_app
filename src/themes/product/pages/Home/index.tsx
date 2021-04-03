import { observer } from "mobx-react";
import React from "react";
import { ProductStoreContext } from "../../../../modules/product/product.store";
import { Row, Modal, Col, Button, Pagination, Table, Tag, Radio, Space, Tabs, Card, Skeleton, Avatar } from 'antd';
import { ExclamationCircleOutlined, AudioOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import "antd/dist/antd.css";
import UpdateProductModal from "../../../../modules/product/components/ManageProduct/UpdateProductModal";
import CreateProductModal from "../../../../modules/product/components/ManageProduct/CreateProductModal";
import { autorun } from 'mobx'

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

const { confirm } = Modal;



const HomePage = () => {
  const productStore = React.useContext(ProductStoreContext);
  const [products, setProducts] = React.useState<any[]>([]);
  const [total, setTotal] = React.useState<number>();
  const [pagination, setPagination] = React.useState<any>({ PageNo: 1, PageSize: 10 });
  productStore.getProducts(pagination.PageNo, pagination.PageSize);
  const getProducts = async () => {
    // await productStore.getProducts(pagination.PageNo, pagination.PageSize);
    setProducts(productStore.products);
    setTotal(productStore.totalCount);
    setPagination({ PageNo: productStore.pageNum, PageSize: productStore.pageSize });
  };
  const initfunc = async () => {
    await productStore.getProducts(pagination.PageNo, pagination.PageSize);
    setProducts(productStore.products);
    setTotal(productStore.totalCount);
    setPagination({ PageNo: productStore.pageNum, PageSize: productStore.pageSize });
  }
  React.useEffect(() => {
    initfunc();
  }, []);
  React.useEffect(() => {
    getProducts();
  }, [productStore, productStore.products]);

  // const getProducts = async () => {
  //   await productStore.getProducts(pagination.PageNo, pagination.PageSize);
  //   setProducts(productStore.products);
  //   setTotal(productStore.totalCount);
  //   setPagination({ PageNo: productStore.pageNum, PageSize: productStore.pageSize });
  // };

  // React.useEffect(
  //   () =>
  //     autorun(() => getProducts()),
  //   [], // note empty dependencies
  // )

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

  const showPromiseConfirm = async (row: any) => {
    confirm({
      title: "Do you want to delete product " + row.ProductName,
      icon: <ExclamationCircleOutlined />,
      content: "Warning: The delete product cannot be recover",
      onOk() {
        productStore.deleteProduct(row.Id);
        // return new Promise((resolve, reject) => {
        //   setProducts(productStore.products);
        //   setTimeout(Math.random() > 0.5 ? resolve : reject, 2000);
        // }).catch(() => console.log("opps error"));
        setProducts(productStore.products);
      },
      onCancel() { },
    });
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
        (!val) ? <Tag color="green">In stock</Tag> : <Tag color="red">Out of stock</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <UpdateProductModal record={record} />
          <Button
            style={{}}
            className="p-2 h-100"
            type="primary"
            danger
            onClick={() => showPromiseConfirm(record)}
          >
            Delete
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


  return (
    <>
      <div style={{ background: "white" }}>
        {console.log(products)}
        {/* <Row style={{ marginLeft: '10px' }}>Home Page</Row>
        <Row style={{ marginLeft: '10px' }}>Test products</Row> */}
        <br />
        <CreateProductModal />
        <br />
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Table" key="1">
            <Table<Product> columns={columns} dataSource={products} rowKey={(record) => record.Id} pagination={false} />
          </TabPane>
          <TabPane tab="Cards" key="2">
            Content of Tab Pane 2
             <Card
              style={{ width: 300, marginTop: 16 }}
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Skeleton loading={false} avatar active>
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title="Card title"
                  description="This is the description"
                />
              </Skeleton>
            </Card>
            {products?.map((product: any) => (
              <Card
                style={{ width: 300, marginTop: 16 }}
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" />,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Skeleton loading={false} avatar active>
                  <Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={product.ProductName}
                    description="This is the description"
                  />
                </Skeleton>
              </Card>
            ))}
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
      </div>
    </>
  );
};

export default observer(HomePage);
