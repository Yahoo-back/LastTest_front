import './index.less';
import React, { Component } from 'react';
import { Icon, message, Input } from 'antd';
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
      ]
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.loadLink = this.loadLink.bind(this);
    this.handleChangeSearchKeyword = this.handleChangeSearchKeyword.bind(this);
  }

  componentDidMount() {
    this.handleSearch();
    this.loadLink();
  }
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
  render() {
    // const list = this.state.list.map((item, i) => (
    // 	<span key={item._id} className="item">
    // 		{item.name}
    // 	</span>
    // ));
    const list = this.state.list.map((item, i) => (
      <Link className="item" key={item._id} to={`/home?tag_id=${item._id}&tag_name=${item.name}&category_id=`}>
        <span key={item._id}>{item.name}</span>
      </Link>
    ));
    // const filingList = this.state.filingList.map((item, i) => (
    // 	<Link to={item.urlId} key={item.id}>
    // 		<div className="item">{item.name}</div>
    // 	</Link>
    // ));
    const linkChildren = this.state.linkList.map(item => (
      <a key={item._id} target="_blank" href={item.url}>
        <Icon key={item._id} type={item.icon} theme="outlined" style={{ fontSize: '20px', marginRight: '10px' }} />
      </a>
    ));

    return (
      <div className="right">
        <div className="right-content" />}
        <div className="tags">
          <div className="title">标签云</div>
          {list}
        </div>
      </div>
    );
  }
}

export default SliderRight;
