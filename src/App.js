import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import "./App.css"
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Yangiliklar from './pages/Yangiliklar';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class App extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
         
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
         <BrowserRouter>
            <Menu.Item style={{paddingLeft:'20px'}} key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item style={{paddingLeft:'20px'}} key="2" icon={<DesktopOutlined />}>
            <Link style={{textDecoration:'none'}} to="/yangiliklar">Yangiliklar</Link> 
            </Menu.Item>
           
           
            </BrowserRouter>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb>
            <br/>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, height:'530px', overflowY:"auto" }}>
            <BrowserRouter>
            <Switch>
              <Route path="/yangiliklar"> 
<Yangiliklar/>
              </Route>
            </Switch>
            </BrowserRouter> 
            <Footer style={{ textAlign: 'center' }}>Bu proekt IT Tower firmasi tomonidan tayyorlandi</Footer>

            </div>
           
          </Content>
        </Layout>
      </Layout>
    )
  }
}
