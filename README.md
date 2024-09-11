# vue2 移动端项目

1. vue2、vue-cli3 脚手架、vant 移动组件库、微信jsdk jweixin-1.6.0

2. ajax 请求 proxy 代理跨域

3. 基础配置放在 .env .env.development .env.production 三个文件中

4. flex 布局，不使用 rem，fastclick 插件处理 300ms 延迟问题

5. 自定义 eslint 配置规则

## 快速开始

```bash
yarn install

yarn serve 本地开发

yarn build 打包上线

yarn lint

yarn test:e2e

yarn test:unit
```

## 代码说明

1. 全局变量
- $axios RESTful 请求
- $config 全局公共变量
- $cookie 全局 cookie 操作方法

2. 本地缓存 localStorage

3. vant 按需引入，如大量使用可考虑全局引入，看情况是否使用 rem，看情况是否使用 grql

4. 微信环境引入了微信 jsdk，如果不需要可去掉

## 项目内容

### 首页 pages/index

## 插件版本

- vue ^2.6.11
- vue-router ^3.2.0
- vuex ^3.4.0
- axios ^0.19.2
- vue-cli3
- webpack4
- vant ^2.9.2
- eslint ^6.7.2
- node >= 12.17.0

## 参考文档

[vue](https://cn.vuejs.org/)

[vue-cli3](https://cli.vuejs.org/zh/)

[vant](https://youzan.github.io/vant/#/zh-CN/)