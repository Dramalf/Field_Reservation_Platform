import Header from './components/Header';
import './App.less'
import "./App.css"
import FieldContent from './components/Content'
import { Layout } from 'antd';
import { isLogined } from './utils/auth'
import { Redirect } from 'react-router';

const { Footer } = Layout;
function App(props) {
  return (
    isLogined() ?
      <div>
        <Layout className="layout">
          <Header />
          <Layout className="site-layout-background" style={{ padding: '0 0' }}>
            <FieldContent />
          </Layout>
          <Footer style={{ textAlign: 'center' }}>华科操场预定平台 ©2021 Created by Jerry-Ma</Footer>
        </Layout>
      </div> : <Redirect to="/login" />
  );
}

export default App;
