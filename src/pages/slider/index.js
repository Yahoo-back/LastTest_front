import './index.less';
import logo from '../../assets/userLogo.jpeg';
import React, { Component } from 'react';
import { Icon, Avatar, message, Input } from 'antd';
import { Link } from 'react-router-dom';
import https from '../../utils/https';
import urls from '../../utils/urls';

const Search = Input.Search;
class SliderRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      keyword: '',
      type: 2, //1 :其他友情链接 2: 是管理员的个人链接 ,‘’ 代表所有链接
      pageNum: 1,
      pageSize: 50,
      list: [],
      newsList: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchNewsTag = this.handleSearchNewsTag.bind(this);
    this.handleChangeSearchKeyword = this.handleChangeSearchKeyword.bind(this);
  }

  componentDidMount() {
    // console.log('location.pathnamesss', this.props.location.pathname);
    this.handleSearch();
    this.handleSearchNewsTag();
  }

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

  handleSearchNewsTag = () => {
    https
      .get(urls.getNewsTagList, {
        params: {
          keyword: this.state.keyword,
          pageNum: this.state.pageNum,
          pageSize: this.state.pageSize
        }
      })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            newsList: res.data.data.list
          });
        } else {
          message.error(res.data.message);
        }
        console.log(this.state.newsList);
      })
      .catch(err => {
        console.log(err);
      });
    // console.log(newsList);
  };

  handleClick(event) {
    this.setState({
      //   [event.target.name]: event.target.value
    });
  }
  render() {
    const list = this.state.list.map((item, i) => (
      <Link className="item" key={item._id} to={`/home?tag_id=${item._id}&tag_name=${item.name}&category_id=`}>
        <span key={item._id}>{item.name}</span>
      </Link>
    ));
    const newsList = this.state.newsList.map((item, i) => (
      <Link className="item" key={item._id} to={`/news?newsTag_id=${item._id}&newsTag_name=${item.name}`}>
        <span key={item._id}>{item.name}</span>
      </Link>
    ));

    return (
      <div className="right">
        <div className="tags">
          <div className="title">菜谱标签</div>
          {list}
        </div>
        <div className="tags">
          <div className="title">新闻标签</div>
          {newsList}
        </div>
      </div>
    );
  }
}

export default SliderRight;
