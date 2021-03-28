import React, { useState } from "react";
// import { Button, Modal, Form, Input, Radio } from "antd";
// import CreateUserForm from "./CreateUserForm";
import "antd/dist/antd.css";
import {
    Form,
    Input,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    Radio,
    Modal,
    InputNumber,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { ProductStoreContext } from "../../product.store";
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const CollectionCreateForm = ({ visible, onCreate, onCancel, record }) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };

    return (
        <Modal
            visible={visible}
            title="Update product"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log("Validate Failed:", info);
                    });
            }}
        >

            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    Id: record.Id,
                    ProductName: record.ProductName,
                    CategoryId: record.CategoryId,
                    QuantityPerUnit: record.QuantityPerUnit,
                    UnitPrice: record.UnitPrice,
                    UnitsInStock: record.UnitsInStock,
                    ReorderLevel: record.ReorderLevel,
                    Discontinued: record.Discontinued,
                    prefix: "86",
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="Id"
                    label="Id"
                >
                    <InputNumber disabled={true} placeholder="Id" />
                </Form.Item>

                <Form.Item
                    name="ProductName"
                    label="Product Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the product name!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="CategoryId"
                    label="Category Id"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the category id!',
                        },
                    ]}
                    hasFeedback
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    name="QuantityPerUnit"
                    label="Quantity Per Unit"
                    rules={[
                        {
                            required: true,
                            message: 'This is a required field!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="UnitPrice"
                    label="Unit Price"
                    rules={[
                        {
                            required: true,
                            message: 'This is a required field!',
                        },
                    ]}
                    hasFeedback
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    name="UnitsInStock"
                    label="Units In Stock"
                    rules={[
                        {
                            required: true,
                            message: 'This is a required field!',
                        },
                    ]}
                    hasFeedback
                >
                    <InputNumber />
                </Form.Item>


                <Form.Item
                    name="ReorderLevel"
                    label="Reorder Level"
                    rules={[
                        {
                            required: true,
                            message: 'This is a required field!',
                        },
                    ]}
                    hasFeedback
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    name="Discontinued"
                    label="Discontinued"
                    rules={[
                        {
                            required: true,
                            message: 'This is a required field!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const UpdateProductModal = (pros) => {
    const productStore = React.useContext(ProductStoreContext);
    console.log(pros.record);
    const [visible, setVisible] = useState(false);

    const onCreate = async (values) => {
        console.log("Received values of form: ", values);
        // insertUsersApi(values);
        await productStore.updateProducts(values.Id, values);
        setVisible(false);
    };

    return (
        <div>
            {/* <h6>this.pros.record<h6/> */}
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
            >
                Update
      </Button>
            <CollectionCreateForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
                record={pros.record}
            />
        </div>
    );
};

export default UpdateProductModal;
