import React, { Component } from 'react';
import { Icon, Collapse, Card, Row, Col } from 'antd';

const Panel = Collapse.Panel;
const text1 = `
  Young菜谱网主要适合年轻人，上班族群体
`;
const text2 = `
  鉴于现在大学生，上班族等年轻人群体是外卖的最大订购者，因为时间、不会制作等各种因素的限制很多年轻人都不会选择
  自己做饭。外卖，快餐，饭馆等成为了他们解决自己饮食问题的首要选择。然而外卖的卫生健康问题却层出不穷，而Young菜谱网站
  旨在推送一些方便快捷适合年轻群体制作的菜谱网站。上班族可以用较少的时间，简单的操作制作一些健康美味的饭菜来犒劳自己。
`;
const text3 = `
  首页：用户可在网站首页搜索浏览一些自己喜欢的菜谱
  热门：根据用户的浏览量及喜欢数，热门模块会按用户的喜欢程度进行排序，可使用户浏览到人们更喜欢的菜谱。
  健康资讯：用户在闲暇之余可浏览网站内关于一些饮食健康，运动等健康资讯。
  留言：用户登录后可填写相关信息向网站后台管理员提供自己宝贵的意见，共同促进Young菜谱网的发展，做一个更适合年轻人的菜谱网。
  个人中心：用户登录后可查看自己的个人信息。

`;

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden'
};
class About extends Component {
  render() {
    return (
      <div style={{ padding: 20, width: '96%',  margin: '0 auto' }}>
        <h2>Young菜谱网--提供给年轻人一个学习简单营养食谱的平台</h2>
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 8 }}>
            <Card
              style={{ width: 300, marginTop: 15 }}
              cover={
                <img
                  style={{ height: 200 }}
                  alt="主要面向群体"
                  src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1690930552,87348677&fm=26&gp=0.jpg"
                />
              }
            >
              <Collapse
                bordered={false}
                expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
              >
                <Panel header="主要面向群体" key="1" style={customPanelStyle}>
                  <p>{text1}</p>
                </Panel>
              </Collapse>
            </Card>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 8 }}>
            <Card
              style={{ width: 300, marginTop: 15 }}
              cover={
                <img
                  style={{ height: 200 }}
                  alt="网站主旨"
                  src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1915597304,939810161&fm=26&gp=0.jpg"
                />
              }
            >
              <Collapse
                bordered={false}
                expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
              >
                <Panel header="网站主旨" key="2" style={customPanelStyle}>
                  <p>{text2}</p>
                </Panel>
              </Collapse>
            </Card>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 8 }}>
            <Card
              style={{ width: 300, marginTop: 15 }}
              cover={
                <img
                  style={{ height: 200 }}
                  alt="网站内容介绍"
                  src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1382751755,505568252&fm=26&gp=0.jpg"
                />
              }
            >
              <Collapse
                bordered={false}
                expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
              >
                <Panel header="网站内容介绍" key="3" style={customPanelStyle}>
                  <p>{text3}</p>
                </Panel>
              </Collapse>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default About;
