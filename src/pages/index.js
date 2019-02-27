// 分片打包
import Loadable from 'react-loadable'

const loading = () => {
  return null
}

export const Login = Loadable({
  loader: () => import ('./login'),
  loading
}) 
export const Register = Loadable({
  loader: () => import ('./register'),
  loading
}) 
export const Dashboard = Loadable({
  loader: () => import ('./dashboard'),
  loading
}) 
export const ArticleList = Loadable({
  loader: () => import ('./article/list'),
  loading
}) 
export const ArticleAdd = Loadable({
  loader: () => import ('./article/add'),
  loading
}) 
export const ArticleEdit = Loadable({
  loader: () => import ('./article/edit'),
  loading
}) 
export const PictureAdd = Loadable({
  loader: () => import ('./picture/add'),
  loading
}) 
export const PictureList = Loadable({
  loader: () => import ('./picture/list'),
  loading
}) 
export const UserList = Loadable({
  loader: () => import ('./user/list'),
  loading
}) 
export const UserComment = Loadable({
  loader: () => import ('./user/comment'),
  loading
}) 
export const UserNew = Loadable({
  loader: () => import ('./user/newUser'),
  loading
}) 
export const PowerAdmin = Loadable({
  loader: () => import ('./power/admin'),
  loading
}) 
export const PowerAddAdmin = Loadable({
  loader: () => import ('./power/addAdmin'),
  loading
}) 
export const PowerDisplay = Loadable({
  loader: () => import ('./power/display'),
  loading
}) 
export const MessageAll = Loadable({
  loader: () => import ('./message/all'),
  loading
}) 
export const MessageUnread = Loadable({
  loader: () => import ('./message/unread'),
  loading
}) 
export const NotFound = Loadable({
  loader: () => import ('./notFound'),
  loading
}) 
export const Settings = Loadable({
  loader: () => import ('./settings'),
  loading
}) 
