<template>
	<t-tab-bar :value="active" bindchange="onChange" :split="false">
		<t-tab-bar-item v-for="(index,item) list" v-bind:key="index">
			<view class="custom-tab-bar-wrapper">
				<t-icon prefix="wr" :name="item.icon" size="48rpx" />
				<view class="text">{{ item.text }}</view>
			</view>
		</t-tab-bar-item>
	</t-tab-bar>


</template>

<script>
	import TabMenu from './data';
	export default {
		data() {
			return {
				active: 0,
				list: TabMenu,
			}
		},
		methods: {
			onChange(event) {
				this.setData({
					active: event.detail.value
				});
				wx.switchTab({
					url: this.data.list[event.detail.value].url.startsWith('/') ?
						this.data.list[event.detail.value].url : `/${this.data.list[event.detail.value].url}`,
				});
			},
			init() {
				const page = getCurrentPages().pop();
				const route = page ? page.route.split('?')[0] : '';
				const active = this.data.list.findIndex(
					(item) =>
					(item.url.startsWith('/') ? item.url.substr(1) : item.url) ===
					`${route}`,
				);
				this.setData({
					active
				});
			},
		}
	}
</script>

<style>
	.custom-tab-bar-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.custom-tab-bar-wrapper .text {
		font-size: 20rpx;
	}
</style>