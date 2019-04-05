import React, { Component } from 'react';
import { Icon, Avatar, message, Input } from 'antd';
import { Link } from 'react-router-dom';
import https from '../../utils/https';
import urls from '../../utils/urls';

const Search = Input.Search;

class About extends Component {
  render() {
    return (
      <div>
        <h2>网站介绍</h2>
      </div>
    );
  }
}

export default About;
