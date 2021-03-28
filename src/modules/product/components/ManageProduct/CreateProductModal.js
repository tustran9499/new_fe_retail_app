import React, { useState } from "react";
// import { Button, Modal, Form, Input, Radio } from "antd";
// import { insertUsersApi } from "../../api/user";
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
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const roles = [
    {
        value: "admin",
        label: "admin",
    },
    {
        value: "normal-user",
        label: "normal-user",
    },
    {
        value: "contact-point",
        label: "contact-point",
    },
    {
        value: "dc-member",
        label: "dc-member",
    },
];
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

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };

    return (
        <Modal
            visible={visible}
            title="Create a new collection"
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
                    ProductName: "new product",
                    CategoryId: 1,
                    QuantityPerUnit: "1kg per item",
                    UnitPrice: 1,
                    UnitsInStock: 1,
                    ReorderLevel: 1,
                    Discontinued: false,
                    prefix: "86",
                }}
                scrollToFirstError
            >
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

const CreateProductModal = () => {
    const productStore = React.useContext(ProductStoreContext);
    const [visible, setVisible] = useState(false);

    const onCreate = async (values) => {
        console.log("Received values of form: ", values);
        // insertUsersApi(values);
        await productStore.createProducts(values);
        setVisible(false);
    };

    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
            >
                Create New Product
      </Button>
            <CollectionCreateForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </div>
    );
};

export default CreateProductModal;
