import { 
  DashboardOutlined, UserOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [
  {
    key: 'menu',
    path: `${APP_PREFIX_PATH}/menu`,
    title: 'menu',
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [{
      key: 'home',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'home',
      icon: DashboardOutlined,
      breadcrumb: false,
      submenu: []
    }, {
      key: 'clients',
      path: `${APP_PREFIX_PATH}/clients`,
      title: 'clients',
      icon: UserOutlined,
      breadcrumb: false ,
      submenu: [{
        key: 'clients-list',
        path: `${APP_PREFIX_PATH}/clients-list`,
        title: 'clients-list',
        icon: '',
        breadcrumb: false ,
        submenu: []
      }]
    }]
  }]

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
