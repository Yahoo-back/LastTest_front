import React, { Component } from 'react';
import { Icon, Avatar, message, Input, Form, Upload, Select, Button } from 'antd';
import { Link } from 'react-router-dom';
import https from '../../utils/https';
import urls from '../../utils/urls';
const Search = Input.Search;

const FormItem = Form.Item;
class Personal extends Component {
  constructor() {
    super();
  }
  render() {
    let userInfo = '';
    if (window.sessionStorage.userInfo) {
      userInfo = JSON.parse(window.sessionStorage.userInfo);
      console.log(userInfo);
      console.log(window.sessionStorage);
    }
    return (
      <div>
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
          <Button type="primary">修改个人信息</Button>
        </Form>
      </div>
    );
  }
}

export default Personal;
