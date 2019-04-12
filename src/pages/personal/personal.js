import React, { Component } from 'react';
import { Icon, Avatar, message, Input, Form, Upload, Select, Button, Alert } from 'antd';
import { Link } from 'react-router-dom';
import https from '../../utils/https';
import urls from '../../utils/urls';
const Search = Input.Search;

const FormItem = Form.Item;
class Personal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      me: '',
      reply_list: [],
      name: '',
      content: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = () => {
    https
      .get(urls.getMessageList, {
        params: {
          keyword: this.state.keyword,
          state: this.state.state,
          pageNum: this.state.pageNum,
          pageSize: this.state.pageSize
        }
      })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            messageList: res.data.data.list[0],
            me: res.data.data.list[0].email,
            content: res.data.data.list[0].content,
            reply_list: res.data.data.list[0].reply_list,
            lista: res.data.data.list[0].reply_list[0].content,
            listb: res.data.data.list[0].reply_list[1].content
          });
          console.log(res.data.data.list[0]);
        } else {
          message.error(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    let userInfo = '';
    if (window.sessionStorage.userInfo) {
      userInfo = JSON.parse(window.sessionStorage.userInfo);
    }
    return (
      <div>
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
            <p>{userInfo.email == this.state.me ? this.state.content : '暂无留言，可在留言栏提交您宝贵的意见哦！'}</p>
          </FormItem>
          <FormItem label="我的回复:">
            <p>{userInfo.email == this.state.me ? this.state.lista : '暂无回复！'}</p>
            <p>{userInfo.email == this.state.me ? this.state.listb : '暂无回复！'}</p>
          </FormItem>
          <Button type="primary">修改个人信息</Button>
        </Form>
      </div>
    );
  }
}

export default Personal;
