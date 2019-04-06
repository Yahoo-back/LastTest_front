import './index.less';
import logo from '../../assets/all.png';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Icon, Menu, Row, Col, Button, Drawer, Dropdown, message } from 'antd';
import Register from '../register/register';
import Login from '../login/login';
import { isMobileOrPc } from '../../utils/utils';
import https from '../../utils/https';
import urls from '../../utils/urls';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

// @connect(state => state.getIn(['user']), dispatch => bindActionCreators({ }, dispatch))
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //下拉标签
      loading: false,
      keyword: '',
      type: 2, //1 :其他友情链接 2: 是管理员的个人链接 ,‘’ 代表所有链接
      pageNum: 1,
      pageSize: 50,
      list: [],
      linkList: [],
      filingList: [
        {
          id: 1,
          name: '2018-12-12',
          urlId: '/home'
        },
        {
          id: 2,
          name: '2018-12-12',
          urlId: '/home'
        },
        {
          id: 3,
          name: '2018-12-12',
          urlId: '/home'
        }
      ],
      //导航栏
      isMobile: false,
      visible: false,
      childrenDrawer: false,
      placement: 'top',
      current: null,
      menuCurrent: '',
      login: false,
      register: false,
      nav: '首页',
      navTitle: '首页'
    };
    this.menuClick = this.menuClick.bind(this);
    this.showLoginModal = this.showLoginModal.bind(this);
    this.showRegisterModal = this.showRegisterModal.bind(this);
    this.handleLoginCancel = this.handleLoginCancel.bind(this);
    this.handleRegisterCancel = this.handleRegisterCancel.bind(this);
    this.initMenu = this.initMenu.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
    this.onClose = this.onClose.bind(this);
    //标签方法
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.loadLink = this.loadLink.bind(this);
    this.handleChangeSearchKeyword = this.handleChangeSearchKeyword.bind(this);
  }

  componentDidMount() {
    //标签方法
    this.handleSearch();
    this.loadLink();
    if (isMobileOrPc()) {
      this.setState({
        isMobile: true
      });
    }
    this.initMenu(this.props.pathname);
  }

  //标签
  loadLink = () => {
    https
      .get(urls.getLinkList, {
        params: {
          type: this.state.type,
          keyword: this.state.keyword,
          pageNum: this.state.pageNum,
          pageSize: this.state.pageSize
        }
      })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            linkList: res.data.data.list
          });
        } else {
          message.error(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleChangeSearchKeyword(event) {
    this.setState({
      keyword: event.target.value
    });
  }

  handleSearch = () => {
    https
      .get(urls.getTagList, {
        params: {
          keyword: this.state.keyword,
          pageNum: this.state.pageNum,
          pageSize: this.state.pageSize
        }
      })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            list: res.data.data.list
          });
        } else {
          message.error(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleClick(event) {
    this.setState({
      //   [event.target.name]: event.target.value
    });
  }

  //导航栏
  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  initMenu(name) {
    let key = '1';
    let navTitle = '';
    if (name === '/') {
      key = '1';
      navTitle = '首页';
    } else if (name === '/home') {
      key = '1';
      navTitle = '首页';
    } else if (name === '/hot') {
      key = '2';
      navTitle = '热门菜谱';
    } else if (name === '/news') {
      key = '3';
      navTitle = '健康资讯';
    } else if (name === '/message') {
      key = '4';
      navTitle = '留言';
    } else if (name === '/about') {
      key = '5';
      navTitle = '关于';
    } else if (name === '/articleDetail') {
      key = '6';
      navTitle = '菜谱详情';
    }
    this.setState({
      navTitle,
      menuCurrent: key
    });
  }

  componentWillReceiveProps(nextProps) {
    // console.log('next :', nextProps);
    this.initMenu(nextProps.pathname);
  }

  handleMenu = e => {
    // console.log('click ', e);
    this.setState({
      menuCurrent: e.key
    });
  };

  handleLogout = e => {
    // console.log('click ', e);
    this.setState({
      current: e.key
    });
    window.sessionStorage.userInfo = '';
    this.onClose();
  };

  showLoginModal() {
    this.onClose();
    // [event.target.name]: event.target.value
    this.setState({
      login: true
    });
  }
  showRegisterModal() {
    this.onClose();
    this.setState({
      register: true
    });
  }
  handleLoginCancel() {
    this.setState({
      login: false
    });
  }
  handleRegisterCancel() {
    this.setState({
      register: false
    });
  }
  menuClick({ key }) {
    this.setState({
      nav: key
    });
  }

  showChildrenDrawer = () => {
    this.setState({
      childrenDrawer: true
    });
  };

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false
    });
  };

  render() {
    //标签
    const list = this.state.list.map((item, i) => (
      <Menu.Item>
        <Link key={item._id} to={`/home?tag_id=${item._id}&tag_name=${item.name}&category_id=`}>
          <span key={item._id}>{item.name}</span>
        </Link>
      </Menu.Item>
    ));
    //导航栏
    let userInfo = '';
    if (window.sessionStorage.userInfo) {
      userInfo = JSON.parse(window.sessionStorage.userInfo);
    }
    return (
      <div className="left">
        {this.state.isMobile ? (
          <Header
            className="header"
            style={{
              position: 'fixed',
              zIndex: 1,
              top: 0,
              width: '100%',
              height: '64px',
              float: 'left',
              backgroundColor: 'white',
              borderBottom: '1px solid #eee'
            }}
          >
            <Row className="container">
              <Col style={{ width: '25%', float: 'left', lineHeight: '64px' }}>
                <a href="#">
                  <div>
                    <img src={logo} alt="" style={{ width: 130, height: 50 }} />
                  </div>
                </a>
              </Col>
              <Col style={{ textAlign: 'center', width: '50%', float: 'left' }}>
                <div className="nav-title"> {this.state.navTitle} </div>
              </Col>
              <Col style={{ textAlign: 'right', width: '25%', float: 'left' }}>
                <div>
                  {/* <a className='user-name'>{userInfo.name}</a> */}
                  <Icon
                    type="bars"
                    onClick={this.showDrawer}
                    style={{ fontSize: '40px', marginRight: '10px', marginTop: '10px' }}
                  />
                </div>
              </Col>
            </Row>
          </Header>
        ) : (
          <Header
            className="header "
            style={{
              position: 'fixed',
              zIndex: 1,
              top: 0,
              width: '100%',
              minWidth: '1200px',
              height: '66px',
              float: 'left',
              backgroundColor: 'white',
              borderBottom: '1px solid #eee'
            }}
          >
            <Row className="container">
              <Col style={{ width: '150px', float: 'left' }}>
                <a href="#">
                  <div>
                    <img src={logo} alt="" style={{ width: 130, height: 60 }} />
                  </div>
                </a>
              </Col>
              <Col style={{ width: '780px', float: 'left' }}>
                <Menu
                  theme="light"
                  mode="horizontal"
                  defaultSelectedKeys={['1']}
                  onClick={this.handleMenu}
                  selectedKeys={[this.state.menuCurrent]}
                  style={{ lineHeight: '64px', borderBottom: 'none' }}
                >
                  <SubMenu
                    key="1"
                    title={
                      <Link to="/home">
                        <Icon type="home" theme="outlined" />
                        首页
                      </Link>
                    }
                  >
                    <MenuItemGroup>
                      {list}
                      {console.log(list)}
                    </MenuItemGroup>
                  </SubMenu>

                  <Menu.Item key="2">
                    <Link to="/hot">
                      <Icon type="fire" theme="outlined" />
                      热门菜谱
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to="/news">
                      <Icon type="tags" theme="outlined" />
                      健康资讯
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <Link to="/message">
                      <Icon type="message" theme="outlined" />
                      留言
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="5">
                    <Link to="/about">
                      <Icon type="contacts" theme="outlined" />
                      关于
                    </Link>
                  </Menu.Item>
                </Menu>
              </Col>
              <Col style={{ textAlign: 'right', width: '23y0px', float: 'left' }}>
                {userInfo ? (
                  <Menu
                    onClick={this.handleLogout}
                    style={{ width: 220, lineHeight: '64px', display: 'inline-block' }}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                  >
                    <SubMenu
                      title={
                        <span className="submenu-title-wrapper">
                          <Icon type="user" /> {userInfo.name}
                        </span>
                      }
                    >
                      <MenuItemGroup>
                        <Menu.Item key="logout">退出</Menu.Item>
                        <Menu.Item>
                          <Link to="/personal">个人设置</Link>
                        </Menu.Item>
                      </MenuItemGroup>
                    </SubMenu>
                  </Menu>
                ) : (
                  <div>
                    <Button type="primary" icon="login" style={{ marginRight: '15px' }} onClick={this.showLoginModal}>
                      登 录
                    </Button>
                    <Button
                      type="danger"
                      icon="logout"
                      style={{ marginRight: '15px' }}
                      onClick={this.showRegisterModal}
                    >
                      注 册
                    </Button>
                  </div>
                )}
              </Col>
            </Row>
          </Header>
        )}

        <Drawer
          placement={this.state.placement}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          height={295}
        >
          <div className="drawer">
            <p onClick={this.onClose}>
              <Link to="/home">
                <div onClick={this.showChildrenDrawer}>
                  <Icon type="home" /> 首页
                </div>
              </Link>
            </p>
            <p onClick={this.onClose}>
              <Link to="/hot">
                <Icon type="fire" onClick={this.showLoginModal} /> 热门菜谱
              </Link>
            </p>
            <p onClick={this.onClose}>
              <Link to="/news">
                <Icon type="tags" onClick={this.showLoginModal} /> 健康资讯
              </Link>
            </p>
            <p onClick={this.onClose}>
              <Link to="/message">
                <Icon type="message" onClick={this.showLoginModal} /> 留言
              </Link>
            </p>
            <p onClick={this.onClose}>
              <Link to="/about">
                <Icon type="contacts" onClick={this.showLoginModal} /> 关于
              </Link>
            </p>

            {userInfo ? (
              <div onClick={this.handleLogout}>
                <p>{userInfo.name}</p>
                <p>
                  <Icon type="logout" /> 退出
                  <Link to="/personal">
                    <Icon type="edit" /> 个人设置{' '}
                  </Link>
                </p>
              </div>
            ) : (
              <div>
                <p onClick={this.showLoginModal}>
                  <Icon type="login" /> 登录
                </p>
                <p onClick={this.showRegisterModal}>
                  <Icon type="logout" /> 注册{' '}
                </p>
              </div>
            )}
          </div>
        </Drawer>
        <Login visible={this.state.login} handleCancel={this.handleLoginCancel} />
        <Register visible={this.state.register} handleCancel={this.handleRegisterCancel} />
      </div>
    );
  }
}

export default Nav;
