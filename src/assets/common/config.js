// Browser environment
const inBrowser = typeof window !== 'undefined'
const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase()
const UA = inBrowser && window.navigator.userAgent.toLowerCase()

let env = '' // local dev prod 本地开发环境、测试环境

if (location.hostname.includes('fe.pkucare')) { // 正式环境
  env = 'prod'
} else if (location.hostname.includes('fetest.pkucare')) { // 测试环境
  env = 'dev'
} else { // 本地开发环境
  env = 'local'
}

window.$config = {
  env,
  code: process.env.VUE_APP_CODE, // 机构码 ''
  system: {
    isIE: UA && /msie|trident/.test(UA),
    isWeixin: UA.indexOf('micromessenger') > -1,
    isAndroid: (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android'),
    isIphoneX: /iphone/gi.test(navigator.userAgent) && (screen.height === 812 && screen.width === 375)
  }
}
