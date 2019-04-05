import './index.less';
import React, { Component } from 'react';
import { Icon, Input, message } from 'antd';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import https from '../../utils/https';
import urls from '../../utils/urls';
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
// import { saveArticlesList } from '../../store/actions/articles';
const Search = Input.Search;
// @connect(
//   state => state.getIn(['articles']),
//   { saveArticlesList }
// )
class TimeLineCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadEnd: false,
      isLoading: false,
      keyword: '',
      likes: '', // 是否是热门文章
      state: 1, // 文章发布状态 => 0 草稿，1 已发布,'' 代表所有文章
      newsTag_id: getQueryStringByName('tag_id'),
      newsTag_name: decodeURI(getQueryStringByName('tag_name')),
      // category_id: getQueryStringByName('category_id'),
      pageNum: 1,
      pageSize: 10,
      newsList: [],
      list: [],
      total: 0,
      count: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeSearchKeyword = this.handleChangeSearchKeyword.bind(this);
    // this.getBlog = this.getBlog.bind(this);
  }

  // getBlog() {
  //   let params = {
  //     keyword: this.state.keyword,
  //     likes: this.state.likes,
  //     state: this.state.state,
  //     pageNum: this.state.pageNum,
  //     pageSize: this.state.pageSize
  //   };
  //   this.props.getBlogList(params);
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.setState(
        {
          pageNum: 1,
          keyword: getQueryStringByName('keyword'),
          newsList: [],
          newsTag_id: getQueryStringByName('newsTag_id'),
          newsTag_name: decodeURI(getQueryStringByName('newsTag_name'))
          // category_id: getQueryStringByName('category_id')
        },
        () => {
          this.handleSearch();
        }
      );
    }
  }

  componentDidMount() {
    this.handleSearch();
    // console.log('location.pathname', this.props.location.pathname);
    // if (this.props.location.pathname === '/hot') {
    //   this.setState(
    //     {
    //       likes: true
    //     },
    //     () => {
    //       this.handleSearch();
    //     }
    //   );
    // } else {
    //   this.handleSearch();
    // }
    window.onscroll = () => {
      if (getScrollTop() + getWindowHeight() > getDocumentHeight() - 100) {
        // 如果不是已经没有数据了，都可以继续滚动加载
        if (this.state.isLoadEnd === false && this.state.isLoading === false) {
          this.handleSearch();
        }
      }
    };
  }

  handleSearch() {
    this.setState({
      isLoading: true
    });
    https
      .get(
        urls.getNewsList,
        {
          params: {
            keyword: this.state.keyword,
            likes: this.state.likes,
            state: this.state.state,
            newsTag_id: this.state.newsTag_id,
            // category_id: this.state.category_id,
            pageNum: this.state.pageNum,
            pageSize: this.state.pageSize
          }
        },
        { withCredentials: true }
      )
      .then(res => {
        // console.log(res);
        let num = this.state.pageNum;
        if (res.status === 200 && res.data.code === 0) {
          this.setState(preState => ({
            newsList: [...preState.newsList, ...res.data.data.list],
            total: res.data.data.count,
            pageNum: ++num,
            isLoading: false
          }));
          if (this.state.total === this.state.newsList.length) {
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
  }

  handleChangeSearchKeyword(event) {
    this.setState({
      keyword: event.target.value
    });
  }

  render() {
    // console.log('blog articlesList:', this.props.articlesList);
    const list = this.state.newsList.map((item, i) => (
      <ReactCSSTransitionGroup
        key={item._id}
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={1000}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
      >
        <li key={item._id} className="have-img">
          <a className="wrap-img" href="/" target="_blank">
            <img className="img-blur-done" data-src={item.img_url} src={item.img_url} alt="120" />
          </a>
          <div className="content">
            <Link className="title" target="_blank" to={`/articleDetail?article_id=${item._id}`}>
              {item.title}
            </Link>
            <p className="abstract">{item.desc}</p>
            <div className="meta">
              <Link target="_blank" to={`/articleDetail?article_id=${item._id}`}>
                <Icon type="eye" theme="outlined" /> {item.meta.views}
              </Link>{' '}
              <Link target="_blank" to={`/articleDetail?article_id=${item._id}`}>
                <Icon type="message" theme="outlined" /> {item.meta.comments}
              </Link>{' '}
              <Link target="_blank" to={`/articleDetail?article_id=${item._id}`}>
                <Icon type="heart" theme="outlined" /> {item.meta.likes}
              </Link>
              <span className="time">{item.create_time ? timestampToTime(item.create_time) : ''}</span>
            </div>
          </div>
        </li>
      </ReactCSSTransitionGroup>
    ));
    return (
      <div className="left">
        <Search
          placeholder="请输入与健康相关内容"
          value={this.state.keyword}
          onSearch={this.handleSearch}
          onChange={this.handleChangeSearchKeyword}
          style={{ width: 260 }}
        />
        {this.state.newsTag_id ? <h3 className="left-title">{this.state.newsTag_name} 相关的新闻：</h3> : ''}
        <ul className="note-list">{this.state.total == 0 ? '' : list}</ul>
        {this.state.isLoading ? <LoadingCom /> : ''}
        {this.state.isLoadEnd ? <LoadEndCom /> : ''}
      </div>
    );
  }
}

export default TimeLineCustom;

// import './index.less';
// import React, { Component } from 'react';
// import { Timeline, Icon, message } from 'antd';
// import https from '../../utils/https';
// import urls from '../../utils/urls';
// import LoadingCom from '../loading/loading';
// import LoadEndCom from '../loadEnd/loadEnd';
// import { getScrollTop, getDocumentHeight, getWindowHeight, timestampToTime } from '../../utils/utils';

// class TimeLineCustom extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			isLoading: false,
// 			isLoadEnd: false,
// 			keyword: '',
// 			pageNum: 1,
// 			pageSize: 10,
// 			total: 0,
// 			list: [],
// 		};
// 		this.handleSearch = this.handleSearch.bind(this);
// 	}

// 	componentDidMount() {
// 		this.handleSearch();
// 		window.onscroll = () => {
// 			if (getScrollTop() + getWindowHeight() > getDocumentHeight() - 100) {
// 				// 如果还有数据，都可以继续滚动加载
// 				if (this.state.isLoadEnd === false && this.state.isLoading === false) {
// 					this.handleSearch();
// 				}
// 			}
// 		};
// 	}

// 	handleSearch = () => {
// 		this.setState({
// 			isLoading: true,
// 		});
// 		https
// 			.get(urls.getTimeAxisList, {
// 				params: {
// 					keyword: this.state.keyword,
// 					pageNum: this.state.pageNum,
// 					pageSize: this.state.pageSize,
// 				},
// 			})
// 			.then(res => {
// 				let num = this.state.pageNum;
// 				if (res.status === 200 && res.data.code === 0) {
// 					this.setState({
// 						list: this.state.list.concat(res.data.data.list),
// 						total: res.data.data.count,
// 						pageNum: ++num,
// 						isLoading: false,
// 					});
// 					if (this.state.total === this.state.list.length) {
// 						this.setState({
// 							isLoadEnd: true,
// 						});
// 					}
// 				} else {
// 					message.error(res.data.message);
// 				}
// 			})
// 			.catch(err => {
// 				console.log(err);
// 			});
// 	};

// 	render() {
// 		// state 状态 1 是已经完成 ，2 是正在进行，3 是没完成
// 		const list = this.state.list.map((item, i) => (
// 			<Timeline.Item
// 				key={item._id}
// 				color={item.state === 1 ? 'green' : item.state === 3 ? 'red' : ''}
// 				dot={item.state === 2 ? <Icon type="clock-circle-o" style={{ fontSize: '16px' }} /> : ''}
// 			>
// 				<h3>{item.title}</h3>
// 				<p>{item.content}</p>
// 				<p>
// 					<span>{item.start_time ? timestampToTime(item.start_time, false) : ''}--</span>
// 					<span> {item.end_time ? timestampToTime(item.end_time, false) : ''}</span>
// 				</p>
// 			</Timeline.Item>
// 		));

// 		return (
// 			<div className="time-line">
// 				<Timeline mode="alternate">{list}</Timeline>
// 				{this.state.isLoading ? <LoadingCom /> : ''}
// 				{this.state.isLoadEnd ? <LoadEndCom /> : ''}
// 			</div>
// 		);
// 	}
// }

// export default TimeLineCustom;
