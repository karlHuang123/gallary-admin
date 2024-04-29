import { Settings as LayoutSettings } from '@ant-design/pro-components';

export const publicPath = '/admin/';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  title: 'Gallery Admin',
  navTheme: 'light',
  primaryColor: '#ff5e4d',
  layout: 'mix',
  footerRender: false,
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  pwa: false,
  logo: `${publicPath}skd-logo.png`,
  splitMenus: false,
  menu: {
    type: 'group',
  },
};
export default Settings;
