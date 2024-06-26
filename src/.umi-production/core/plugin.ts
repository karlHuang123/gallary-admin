// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import * as Plugin_0 from '/Users/karl.huangboehringer-ingelheim.com/Documents/project/skd-gallery-admin/src/app.tsx';
import * as Plugin_1 from '/Users/karl.huangboehringer-ingelheim.com/Documents/project/skd-gallery-admin/src/.umi-production/plugin-access/runtime.tsx';
import * as Plugin_2 from '/Users/karl.huangboehringer-ingelheim.com/Documents/project/skd-gallery-admin/src/.umi-production/plugin-initialState/runtime.tsx';
import * as Plugin_3 from '/Users/karl.huangboehringer-ingelheim.com/Documents/project/skd-gallery-admin/src/.umi-production/plugin-layout/runtime.tsx';
import * as Plugin_4 from '/Users/karl.huangboehringer-ingelheim.com/Documents/project/skd-gallery-admin/src/.umi-production/plugin-model/runtime.tsx';
import { PluginManager } from 'umi';

function __defaultExport (obj) {
  if (obj.default) {
    return typeof obj.default === 'function' ? obj.default() :  obj.default
  }
  return obj;
}
export function getPlugins() {
  return [
    {
      apply: __defaultExport(Plugin_0),
      path: process.env.NODE_ENV === 'production' ? void 0 : '/Users/karl.huangboehringer-ingelheim.com/Documents/project/skd-gallery-admin/src/app.tsx',
    },
    {
      apply: Plugin_1,
      path: process.env.NODE_ENV === 'production' ? void 0 : '/Users/karl.huangboehringer-ingelheim.com/Documents/project/skd-gallery-admin/src/.umi-production/plugin-access/runtime.tsx',
    },
    {
      apply: Plugin_2,
      path: process.env.NODE_ENV === 'production' ? void 0 : '/Users/karl.huangboehringer-ingelheim.com/Documents/project/skd-gallery-admin/src/.umi-production/plugin-initialState/runtime.tsx',
    },
    {
      apply: Plugin_3,
      path: process.env.NODE_ENV === 'production' ? void 0 : '/Users/karl.huangboehringer-ingelheim.com/Documents/project/skd-gallery-admin/src/.umi-production/plugin-layout/runtime.tsx',
    },
    {
      apply: Plugin_4,
      path: process.env.NODE_ENV === 'production' ? void 0 : '/Users/karl.huangboehringer-ingelheim.com/Documents/project/skd-gallery-admin/src/.umi-production/plugin-model/runtime.tsx',
    },
  ];
}

export function getValidKeys() {
  return ['patchRoutes','patchClientRoutes','modifyContextOpts','modifyClientRenderOpts','rootContainer','innerProvider','i18nProvider','accessProvider','dataflowProvider','outerProvider','render','onRouteChange','antd','getInitialState','layout','qiankun','request',];
}

let pluginManager = null;

// 确保 webpack 模式 import.meta.hot 代码被 tree shaking 掉
const isDev = process.env.NODE_ENV === 'development';

export function createPluginManager() {
  pluginManager = PluginManager.create({
    plugins: getPlugins(),
    validKeys: getValidKeys(),
  });

  // fix https://github.com/umijs/umi/issues/10047
  // https://vitejs.dev/guide/api-hmr.html#hot-data 通过 hot data 持久化 pluginManager 解决 vite 热更时 getPluginManager 获取到 null 的情况
  if (isDev && import.meta.hot) {
    import.meta.hot.data.pluginManager = pluginManager
  }
  return pluginManager;
}

export function getPluginManager() {
  // vite 热更模式优先从 hot data 中获取 pluginManager
  if (isDev && import.meta.hot) {
    return import.meta.hot.data.pluginManager || pluginManager
  }
  return pluginManager;
}
