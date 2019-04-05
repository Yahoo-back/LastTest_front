import React from 'react';
import Loadable from 'react-loadable';

let config = [
  {
    name: '/',
    path: '/',
    exact: true,
    component: Loadable({
      loader: () => import('../pages/articles/articles.js'),
      loading: () => <div />
    })
  },
  {
    name: 'home',
    path: '/home',
    exact: true,
    component: Loadable({
      loader: () => import('../pages/articles/articles.js'),
      loading: () => <div />
    })
  },
  {
    name: 'hot',
    path: '/hot',
    exact: true,
    component: Loadable({
      loader: () => import('../pages/articles/articles.js'),
      loading: () => <div />
    })
  },
  {
    name: 'news',
    path: '/news',
    exact: true,
    component: Loadable({
      loader: () => import('../pages/timeLine/timeLine.js'),
      loading: () => <div />
    })
  },
  {
    name: 'message',
    path: '/message',
    exact: true,
    component: Loadable({
      loader: () => import('../pages/message/message.js'),
      loading: () => <div />
    })
  },
  {
    name: 'about',
    path: '/about',
    exact: true,
    component: Loadable({
      loader: () => import('../pages/about/about.js'),
      loading: () => <div />
    })
  },
  {
    name: 'articleDetail',
    path: '/articleDetail',
    exact: true,
    component: Loadable({
      loader: () => import('../pages/article/article.js'),
      loading: () => <div />
    })
  }
];

export default config;
