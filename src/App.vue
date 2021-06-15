<template lang="pug">
#app
	router-view
</template>

<script>
// 移动端修复点击延迟
import FastClick from 'fastclick';
export default {
  name: 'App',
  mounted() {
    this.fastclick()
    // this.rem()
  },
  methods: {
    fastclick() {
      if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
          FastClick.attach(document.body);

          FastClick.prototype.focus = function(targetElement) {
            var deviceIsWindowsPhone = navigator.userAgent.indexOf('Windows Phone') >= 0;
            var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;
            var length;
            // 兼容处理:在iOS7中，有一些元素（如date、datetime、month等）在setSelectionRange会出现TypeError
            // 这是因为这些元素并没有selectionStart和selectionEnd的整型数字属性，所以一旦引用就会报错，因此排除这些属性才使用setSelectionRange方法
            if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month' && targetElement.type !== 'email') {
              length = targetElement.value.length;
              targetElement.setSelectionRange(length, length);
              /* 修复bug ios 11.3不弹出键盘，这里加上聚焦代码，让其强制聚焦弹出键盘 */
              targetElement.focus();
            } else {
              targetElement.focus();
            }
          };
        }, false);
      }
    },
    rem() {
      this.autoRem()

      let t = null
      window.addEventListener(
        'resize',
        function() {
          clearTimeout(t)
          t = setTimeout(this.autoRem, 100)
        },
        false
      )
      window.addEventListener(
        'pageshow',
        function(e) {
          if (e.persisted) {
            clearTimeout(t)
            t = setTimeout(this.autoRem, 100)
          }
        },
        false
      )
    },
    autoRem() {
      const doc = document.documentElement
      const w = doc.clientWidth
      const scale = w / 750
      doc.style.fontSize = 10 * scale + 'px'
    }
  }
}
</script>
