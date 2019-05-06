import './index.less';
import './mobile.less';
import React, { Component } from 'react';
import SliderRight from '../pages/slider/index';
import Nav from '../pages/nav/nav';
import { Layout, BackTop } from 'antd';
import { isMobileOrPc } from '../utils/utils';
const { Content, Footer, Sider } = Layout;

class Layouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isMobile: false,
      isShowSlider: false
    };
    // console.log(this.props);
    // console.log('pathName:', this.props.location.pathname);
  }
  componentDidMount() {}
  render() {
    let isShowSlider = false;
    let pathName = this.props.location.pathname;
    //控制界面布局右边标签云显示
    if (
      pathName !== '/message' &&
      pathName !== '/personal' &&
      pathName !== '/about' &&
      pathName !== '/' &&
      pathName !== '/home' &&
      !isMobileOrPc()
    ) {
      isShowSlider = true;
    }
    return (
      <div className="Layouts">
        <Nav pathname={this.props.location.pathname} />
        <Layout className="layout">
          <Content>
            <Layout style={{ padding: '24px 0', background: '#cfdfef' , height: '100%'}}>
              <Content style={{ padding: '0 24px 0 0', minHeight: 280 }}>{this.props.children}</Content>
              {!isShowSlider ? (
                ''
              ) : (
                <Sider width={350} style={{ background: '#cfdfef' }}>
                  <SliderRight />
                </Sider>
              )}
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center', width: '100%', height:'100%',background: '#cfdfef' }}>Young菜谱网站 ©2018 Created By A Young</Footer>
        </Layout>
        <BackTop />
      </div>
    );
  }
}

export default Layouts;
