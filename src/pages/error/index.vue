<style lang="less">
	.error-index {
    text-align: center;
    .text{
      margin-bottom: 20px;
      font-size: 16px;
    }
    .btn {
			width: 100px;
			height: 30px;
		}
	}
</style>

<template>
  <div class="error-index">
    <van-empty>
      <p class="text">页面不存在，请检查路径~</p>
      <van-button class="btn" round type="info" @click="goHome">去首页</van-button>
    </van-empty>
  </div>
</template>

<script>
	export default {
		name: 'error',
		data() {
			return {
			}
		},
		methods: {
      goHome() {
        this.$router.push('/')
      }
    }
	}
</script>
