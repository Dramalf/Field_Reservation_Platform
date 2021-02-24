import './App.less';
import Header from './components/Header';
import './App.less'
import FieldContent from './components/Content'
import { Layout } from 'antd';
const { Footer } = Layout;

function App() {
  return (
    <div>
      <Layout className="layout">

        <Header />
        <Layout className="site-layout-background" style={{ padding: '0 0' }}>
          <FieldContent />
        </Layout>
        <Footer style={{ textAlign: 'center' }}>华科操场预定网站 ©2021 Created by Jerry-Ma</Footer>
      </Layout>
    </div>

  );
}

export default App;
