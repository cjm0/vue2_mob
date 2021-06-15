import Vue from 'vue'
import { formatDate } from '@assets/utils/index.js'

// 日期过滤器
Vue.filter('date', (s) => {
  if (!s) return ''
  return formatDate(new Date(s), 'yyyy-MM-dd')
})

