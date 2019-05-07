import './index.less';
import React, { Component } from 'react';
import { Icon, Input, message, Card, Carousel, Collapse, Row, Col, List, Pagination } from 'antd';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import https from '../../utils/https';
import urls from '../../utils/urls';
import banner1 from '../../assets/banner1.jpg';
import banner7 from '../../assets/banner7.jpg';
import banner2 from '../../assets/banner2.jpg';
import banner3 from '../../assets/banner3.jpg';
import banner4 from '../../assets/banner4.jpg';
import bannerbj from '../../assets/bannerbj.jpg';
import LoadingCom from '../loading/loading';
import LoadEndCom from '../loadEnd/loadEnd';
import {
  getScrollTop,
  getDocumentHeight,
  getWindowHeight,
  getQueryStringByName,
  timestampToTime
} from '../../utils/utils';
/*actions*/
import { saveArticlesList } from '../../store/actions/articles';
const Search = Input.Search;
const { Meta } = Card;
@connect(
  state => state.getIn(['articles']),
  { saveArticlesList }
)
class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadEnd: false,
      isLoading: false,
      keyword: decodeURI(getQueryStringByName('keyword')),
      likes: '', // 是否是热门文章
      state: 1, // 文章发布状态 => 0 草稿，1 已发布,'' 代表所有文章
      tag_id: getQueryStringByName('tag_id'),
      tag_name: decodeURI(getQueryStringByName('tag_name')),
      category_id: getQueryStringByName('category_id'),
      pageNum: 1,
      pageSize: 10,
      articlesList: [],
      list: [],
      total: 0,
      count: '',
      current: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeSearchKeyword = this.handleChangeSearchKeyword.bind(this);
    this.getBlog = this.getBlog.bind(this);
  }

  getBlog() {
    let params = {
      keyword: this.state.keyword,
      likes: this.state.likes,
      state: this.state.state,
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize
    };
    this.props.getBlogList(params);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.setState(
        {
          pageNum: 1,
          keyword: decodeURI(getQueryStringByName('keyword')),
          articlesList: [],
          tag_id: getQueryStringByName('tag_id'),
          tag_name: decodeURI(getQueryStringByName('tag_name')),
          category_id: getQueryStringByName('category_id')
        },
        () => {
          this.handleSearch();
        }
      );
    }
  }

  componentDidMount() {
    // this.handleSearch();
    console.log('location.pathname', this.props.location.pathname);
    if (this.props.location.pathname === '/hot') {
      this.setState(
        {
          likes: true
        },
        () => {
          this.handleSearch();
        }
      );
    } else {
      this.handleSearch();
    }
    window.onscroll = () => {
      if (getScrollTop() + getWindowHeight() > getDocumentHeight() - 100) {
        // 如果不是已经没有数据了，都可以继续滚动加载
        if (this.state.isLoadEnd === false && this.state.isLoading === false) {
          this.handleSearch();
        }
      }
    };
  }

  handleSearch = () => {
    this.setState({
      // isLoading: true
    });
    https
      .get(
        urls.getArticleList,
        {
          params: {
            keyword: this.state.keyword,
            likes: this.state.likes,
            state: this.state.state,
            tag_id: this.state.tag_id,
            category_id: this.state.category_id,
            pageNum: this.state.pageNum,
            pageSize: this.state.pageSize,
            current: this.state.current,
            total: this.state.total
          }
        },
        { withCredentials: true }
      )
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            articlesList: res.data.data.list,
            total: res.data.data.count,
            pageNum: this.state.pageNum
            // isLoading: false
          });

          if (this.state.total === this.state.articlesList.length) {
            this.setState({
              isLoadEnd: true
            });
          }
        } else {
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  onChange = (current, pageSize) => {
    this.handleChangePageParam(current, pageSize);
  };
  onShowSizeChange = (current, pageSize) => {
    this.handleChangePageParam(current, pageSize);
  };
  handleChangePageParam(pageNum, pageSize) {
    this.setState(
      {
        pageNum,
        pageSize
      },
      () => {
        this.handleSearch();
      }
    );
  }

  handleChangeSearchKeyword(event) {
    this.setState({
      keyword: event.target.value
    });
  }

  render() {
    const list = this.state.articlesList.map((item, i) => (
      <ReactCSSTransitionGroup
        key={item._id}
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={1000}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
      >
        <li key={item._id} className="have-img" style={{ background: '#cfdfef', marginTop: 30 }}>
          <a className="wrap-img" href="/" target="_blank">
            <img className="img-blur-done" data-src={item.img_url} src={item.img_url} alt="120" />
          </a>
          <div className="content">
            <Link className="title" target="_blank" to={`/menuDetail?article_id=${item._id}`}>
              {item.title}
            </Link>
            <p className="abstract">{item.desc}</p>
            <div className="meta">
              <Link target="_blank" to={`/menuDetail?article_id=${item._id}`}>
                <Icon type="eye" theme="outlined" /> {item.meta.views}
              </Link>{' '}
              <Link target="_blank" to={`/menuDetail?article_id=${item._id}`}>
                <Icon type="message" theme="outlined" /> {item.meta.comments}
              </Link>{' '}
              <Link target="_blank" to={`/menuDetail?article_id=${item._id}`}>
                <Icon type="heart" theme="outlined" /> {item.meta.likes}
              </Link>
              <span className="time">{item.create_time ? timestampToTime(item.create_time) : ''}</span>
            </div>
          </div>
        </li>
      </ReactCSSTransitionGroup>
    ));
    return (
      <div>
        <div className="left">
          <div style={{ display: 'flex', justifyContent: 'right' }}>
            <Search
              placeholder="请输入菜名/主要食材"
              value={this.state.keyword}
              onSearch={this.handleSearch}
              onChange={this.handleChangeSearchKeyword}
              style={{ width: 300 }}
            />
          </div>
          {this.props.location.pathname === '/home' ? (
            <div className="car" style={{ backgroundImage: `url(${banner1})` }}>
              <Carousel effect="fade" autoplay>
                <div className="cari" style={{ backgroundImage: `url(${banner4})` }}>
                  <img className="imgcar" src={banner4} />
                </div>
                <div className="cari" style={{ backgroundImage: `url(${banner7})` }}>
                  <img className="imgcar" src={banner7} />
                </div>
                <div className="cari" style={{ backgroundImage: `url(${banner3})` }}>
                  <img className="imgcar" src={banner3} />
                </div>
                <div className="cari" style={{ backgroundImage: `url(${banner1})` }}>
                  <img className="imgcar" src={banner1} />
                </div>
              </Carousel>
            </div>
          ) : (
            ''
          )}
          {this.state.tag_id ? <h3 className="left-title">{this.state.tag_name} 相关的菜谱：</h3> : ''}
          <ul className="note-list">
            {this.state.total == 0 ? (
              ''
            ) : this.props.location.pathname == '/home' ? (
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 4,
                  xxl: 4
                }}
                dataSource={this.state.articlesList}
                renderItem={item => (
                  <List.Item>
                    <Card
                      style={{ width: 275, height: 340, margin: '10px auto', background: '#eee' }}
                      cover={<img style={{ width: 275, height: 200 }} src={item.img_url} />}
                      actions={[
                        <Link target="_blank" to={`/menuDetail?article_id=${item._id}`}>
                          <Icon type="eye" theme="outlined" /> {item.meta.views}
                        </Link>,
                        <Link target="_blank" to={`/menuDetail?article_id=${item._id}`}>
                          <Icon type="message" theme="outlined" /> {item.meta.comments}
                        </Link>,
                        <Link target="_blank" to={`/menuDetail?article_id=${item._id}`}>
                          <Icon type="heart" theme="outlined" /> {item.meta.likes}
                        </Link>
                      ]}
                    >
                      <Link to={`/menuDetail?article_id=${item._id}`}>
                        <Meta style={{ color: '#607dcc', height: 100 }} title={item.title} description={item.desc} />
                      </Link>
                    </Card>
                  </List.Item>
                )}
              />
            ) : (
              list
            )}
          </ul>
          <Pagination
            className="page"
            defaultCurrent={this.state.pageNum}
            onChange={this.onChange}
            showSizeChanger
            onShowSizeChange={this.onShowSizeChange}
            showTotal={total => `查询结果 ${total} `}
            pageSize={this.state.pageSize}
            total={this.state.total}
            current={this.state.pageNum}
          />
          {this.state.isLoading ? <LoadingCom /> : ''}
          {this.state.isLoadEnd ? <LoadEndCom /> : ''}
        </div>
      </div>
    );
  }
}

export default Articles;
