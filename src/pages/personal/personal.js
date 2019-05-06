import React, { Component } from 'react';
import { Icon, Avatar, message, Input, Form, Upload, Select, Button, Alert } from 'antd';
import { Link } from 'react-router-dom';
import https from '../../utils/https';
import urls from '../../utils/urls';
const Search = Input.Search;

const FormItem = Form.Item;
const u = JSON.parse(window.sessionStorage.userInfo);

class Personal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      state: 1,
      pageNum: 1,
      pageSize: 10,
      name: '',
      content: '',
      messageDetail: {
        avatar: '',
        content: '',
        create_time: '',
        email: '',
        introduce: '',
        name: '',
        phone: '',
        state: 0,
        update_time: '',
        user_id: '',
        _id: '',
        reply_list: []
      }
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    let userInfo = '';
    if (window.sessionStorage.userInfo) {
      userInfo = JSON.parse(window.sessionStorage.userInfo);
    }
    this.handleSearch(userInfo.email);
  }

  handleSearch(email) {
    https.get(
      urls.getMessageList,
      {
        params: {
          keyword: this.state.keyword,
          state: this.state.state,
          pageNum: this.state.pageNum,
          pageSize: this.state.pageSize
        }
      },
      { withCredentials: true }
    );
    https
      .post(
        urls.getMessageDetail,
        {
          email: email
        },
        { withCredentials: true }
      )
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            messageDetail: res.data.data
          });
        } else {
          message.error(res.data.message);
        }
        console.log(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    let userInfo = '';
    if (window.sessionStorage.userInfo) {
      userInfo = JSON.parse(window.sessionStorage.userInfo);
    }

    const reply_list = this.state.messageDetail.reply_list.map((item, i) => <span key={item.id}>{item.content}</span>);
    return (
      <div style={{width: '80%', height: '100%',marginLeft: '10%'}}>
       {userInfo == '' ? <Alert message="登录后才可查看个人信息！" banner /> : ''}
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          <FormItem label="邮箱">
            <Input defaultValue={userInfo.email} />
          </FormItem>
          <FormItem label="用户名">
            <Input defaultValue={userInfo.name} />
          </FormItem>
          <FormItem label="手机号">
            <Input defaultValue={userInfo.phone} />
          </FormItem>
          <FormItem label="简介">
            <Input.TextArea placeholder="个人简介" rows={4} defaultValue={userInfo.introduce} />
          </FormItem>
          <FormItem label="最新的留言:">
            <p>
              {userInfo.email == this.state.messageDetail.email
                ? this.state.messageDetail.content == ''
                  ? '暂无留言，可在留言栏提交您宝贵的意见哦！'
                  : this.state.messageDetail.content
                : ''}
            </p>
          </FormItem>
          <FormItem label="我的回复:">
            <p>
              {userInfo.email == this.state.messageDetail.email
                ? reply_list == ''
                  ? '管理员尚未处理您的留言！'
                  : reply_list
                : ''}
            </p>
          </FormItem>
          
          <Button type="primary">修改个人信息</Button>
          </Form>
      </div>
    );
  }
}

export default Personal;
