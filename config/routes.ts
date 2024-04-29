export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { icon: 'smile', name: '登录', path: '/user/login', component: './User/Login' },
      { component: './404' },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  { name: '封面管理', icon: 'picture', path: '/cover', component: './CoverManage' },
  { name: '作者管理', icon: 'user', path: '/creators', component: './CreatorList' },
  { name: '分类管理', icon: 'group', path: '/depts', component: './DeptList' },
  { name: '作品管理', icon: 'solution', path: '/works', component: './WorkList' },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
