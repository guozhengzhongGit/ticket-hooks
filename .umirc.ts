import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index', title: "首页" },
    { path: '/query', component: '@/pages/query', title: "查询" },
    { path: '/ticket', component: '@/pages/ticket', title: "买票" },
    { path: '/order', component: '@/pages/order', title: "订单" },
  ],
  targets: {
    chrome: 80, firefox: 70, safari: 13, edge: false, ios: 12
  },
  dva: {
    immer: true,
    hmr: true,
  },
});
