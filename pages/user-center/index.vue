<template>
	<view class="container">
		<view class="user-card">
			<view class="user-center-card__header">
				<t-avatar :image="defaultAvatarUrl" class="user-center-card__header__avatar" />
				<view class="user-center-card__header__name">请登录</view>
			</view>
		</view>
		<view class="content-wrapper">
			<view class="cell-box">
				<t-cell-group theme="card">
				  <t-cell title="单行标题" leftIcon="service" hover arrow />
				  <t-cell title="单行标题" leftIcon="internet" hover arrow />
				  <t-cell title="单行标题" leftIcon="lock-on" hover arrow />
				</t-cell-group>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				defaultAvatarUrl: 'https://cdn-we-retail.ym.tencent.com/miniapp/usercenter/icon-user-center-avatar@2x.png'
			}
		},
		methods: {

		}
	}
</script>

<style>
	@import url('index.css');
</style>