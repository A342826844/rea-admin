import {
  Dashboard,
  ArticleList,
  ArticleEdit,
  ArticleAdd,
  UserList,
  Login,
  Register,
  PictureAdd,
  PictureList,
  NotFound,
  UserNew,
  PowerAdmin,
  PowerAddAdmin,
  PowerDisplay,
  MessageAll,
  MessageUnread,
  Settings
} from '@/pages'
import { UserComment } from '../pages';

const routes = {
  menus: [
    {
      path: '/dashboard',
      component: Dashboard,
      title: '仪表盘',
      exact: true,
      htmeIcon: 'user',
      roles: [0, 1, 2],
      children: false
    },
    {
      title: '文章',
      path: '/article',
      exact: false,
      children: [{
        path: '/article/list',
        component: ArticleList,
        title: '文章列表',
        exact: true,
        roles: [0, 1, 2],
        ismeun: true
      }, 
      {
        path: '/article/add',
        component: ArticleAdd,
        title: '添加文章',
        exact: true,
        roles: [0, 1],
        ismeun: true
      }, 
      {
        path: '/article/edit/:id',
        component: ArticleEdit,
        title: '文章编辑',
        exact: true,
        roles: [0, 1],
        ismeun: false
      }]
    },
    {
      title: '图片',
      path: '/picture',
      exact: false,
      children: [{
        path: '/picture/list',
        component: PictureList,
        title: '图片',
        exact: true,
        roles: [0, 1, 2],
        ismeun: true
      }, 
      {
        path: '/picture/add',
        component: PictureAdd,
        title: '添加上传图片',
        exact: true,
        roles: [0, 1],
        ismeun: true
      }]
    },
    {
      path: '/user',
      title: '用户',
      exact: false,
      children: [{
        path: '/user/new',
        component: UserNew ,
        title: '新增用户',
        exact: true,
        roles: [0, 1, 2],
        ismeun: true
      }, 
      {
        path: '/user/list',
        component: UserList,
        title: '用户列表',
        exact: true,
        roles: [0, 1, 2],
        ismeun: true
      },
      {
        path: '/user/message',
        component:UserComment,
        title: '用户留言',
        exact: true,
        roles: [0, 1, 2],
        ismeun: true
      }]
    },
    {
      path: '/power',
      component: UserList,
      title: '权限',
      exact: false,
      children: [{
        path: '/power/admin',
        component: PowerAdmin,
        title: '管理员',
        exact: true,
        roles: [0, 1],
        ismeun: true
      }, 
      {
        path: '/power/addAdmin',
        component: PowerAddAdmin,
        title: '添加管理员',
        exact: true,
        roles: [0, 1],
        ismeun: true
      },
      {
        path: '/power/display',
        component: PowerDisplay,
        title: '权限展示',
        exact: true,
        roles: [0, 1],
        ismeun: true
      }]
    },
    {
      path: '/message',
      component: UserList,
      title: '消息',
      exact: false,
      children: [{
        path: '/message/all',
        component: MessageAll,
        title: '全部消息',
        exact: true,
        roles: [0, 1, 2],
        ismeun: true
      }, 
      {
        path: '/message/unread',
        component: MessageUnread,
        title: '未读消息',
        exact: true,
        roles: [0, 1, 2],
        ismeun: true
      }]
    },
    {
      path: '/settings',
      component: Settings,
      title: '设置',
      exact: true,
      children: false
    }
  ],
  orters: [
    {
      path: '/login',
      component: Login,
      title: '登录',
      exact: true
    },
    {
      path: '/register',
      component: Register,
      title: '注册',
      exact: true
    },
    {
      path: '/404',
      component: NotFound,
      title: '404',
      exact: true
    },
    
  ]
}

export default routes