import { observer } from "mobx-react";
import React from "react";
import { CartStoreContext } from "../../stores/cart.store";
import { Layout, Menu, Breadcrumb, PageHeader, Button, Descriptions, Collapse } from 'antd';
import PosPage from '../Pos/PosPage';
import "antd/dist/antd.css";
import '../../assets/style.css';
import Clock from 'react-live-clock';
import { CommonStoreContext } from '../../../../common/common.store';
const { Header, Content, Footer } = Layout;
const { Panel } = Collapse;




const HomePage = () => {
    const commonStore = React.useContext(CommonStoreContext);
    const cartStore = React.useContext(CartStoreContext);
    React.useEffect(() => {
        cartStore.getCashierInfo();
    }, []);
    const handleEndSessionClick = async () => {
        await cartStore.endSession();
    }

    const handleStartSessionClick = async () => {
        await cartStore.startSession();
    }

    return (
        <>
            <div style={{ background: "linear-gradient(90deg, #fab91a 0, #ffd424 100%)" }} className="site-page-header-ghost-wrapper">
                <PageHeader
                    ghost={false}
                    // onBack={() => window.history.back()}
                    title={<h5 style={{ 'color': '#8c8c8c' }}>Salesclerk:</h5>}
                    subTitle={<h5 style={{ 'color': '#ffc53d' }}>{cartStore.salescleckFullName}</h5>}
                    extra={[
                        <Button key="3">Help?</Button>,
                        <Button key="2">View past</Button>,
                        !cartStore.session && <Button key="1" loading={cartStore.loading} onClick={async () => await handleStartSessionClick()} type="primary">
                            Start Session
                        </Button>,
                        cartStore.session && <Button key="4" loading={cartStore.loading} onClick={async () => await handleEndSessionClick()} type="primary" danger>
                            End Session
                        </Button>,
                        <Button key="5" type="primary">
                            Log out
                        </Button>,
                    ]}
                >
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header={<strong style={{ color: '#8c8c8c' }}>Detail info</strong>} key="1">
                            <Descriptions size="small" column={3}>
                                <Descriptions.Item label="Store Manager:">Lili Qu</Descriptions.Item>
                                <Descriptions.Item label="Session Id:">
                                    <a>{cartStore.session}</a>
                                </Descriptions.Item>
                                <Descriptions.Item label="Session start:">{new Date(cartStore.sessionStart).toLocaleString()}</Descriptions.Item>
                                <Descriptions.Item label="Current time:"><Clock format={commonStore.hourMinusFormat} ticking={true} /></Descriptions.Item>
                                <Descriptions.Item label="Store:">
                                    TN Store, A123 St., W.10, D.1, Abc City
                                </Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                </PageHeader>
            </div >
            {cartStore.session && <Layout style={{ background: "linear-gradient(90deg, #fab91a 0, #ffd424 100%)" }} className="layout">
                <Content style={{ padding: '0 24px' }}>

                    <div className="site-layout-content"><PosPage></PosPage></div>
                </Content>
                <Footer style={{ textAlign: 'center', background: "linear-gradient(90deg, #fab91a 0, #ffd424 100%)" }}>Point of Sale ©2021 Created by Tu and Ngan</Footer>
            </Layout>}
        </>
    );
};

export default observer(HomePage);
