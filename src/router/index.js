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
      loader: () => import('../pages/news/news.js'),
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
    name: 'personal',
    path: '/personal',
    exact: true,
    component: Loadable({
      loader: () => import('../pages/personal/personal.js'),
      loading: () => <div />
    })
  },
  {
    name: 'menuDetail',
    path: '/menuDetail',
    exact: true,
    component: Loadable({
      loader: () => import('../pages/article/article.js'),
      loading: () => <div />
    })
  },
  {
    name: 'newsDetail',
    path: '/newsDetail',
    exact: true,
    component: Loadable({
      loader: () => import('../pages/newsDetail/newsDetail.js'),
      loading: () => <div />
    })
  }
];

export default config;
