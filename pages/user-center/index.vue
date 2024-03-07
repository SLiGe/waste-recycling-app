<template>
	<view class="container">
		<view class="user-card">
			<view class="user-center-card__header">
				<t-avatar size="large" :image="defaultAvatarUrl" class="user-center-card__header__avatar" />
				<view class="user-center-card__header__name">请登录</view>
			</view>
		</view>
		<view class="content-wrapper">
			<view class="cell-box">
				<t-cell-group theme="card">
					<t-cell title="我的订单" @click="toOrderList()" hover arrow>
						<view class="left-icon" slot="left-icon">
							<t-icon name="view-list"  class="left-icon"/>
						</view>
					</t-cell>
					<t-cell title="我的资料" @click="toInfo()" hover arrow>
						<view class="left-icon" slot="left-icon">
							<t-icon name="creditcard"  class="left-icon"/>
						</view>
					</t-cell>
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
			toOrderList() {
				uni.navigateTo({
					url: '/pages/order/order'
				})
			},
			toInfo() {
				uni.navigateTo({
					url: '/pages/user-center/info'
				})
			}
		}
	}
</script>

<style>
	@import url('index.css');
</style>