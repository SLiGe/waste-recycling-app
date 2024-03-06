<template>
	<view class="page-container">
		<view class="tab-bar">
			<view class="tab-bar__placeholder" />
			<t-tabs 
				v-on:change="onTabChange" :value="status" style="position: fixed; top: 0; left: 0; z-index: 100">
				<t-tab-panel v-for="item in tabs" v-bind:key="item.status" :label="item.text" :value="item.key" />
			</t-tabs>
		</view>
		<view class="order-card" v-for="order in orderList" v-bind:key="order.orderNumber">
			<view class="header header-class">
				<view class="order-number">
					订单号&nbsp;{{order.orderNumber}}
				</view>
				<view class="order-status">
					{{order.status}}
				</view>
			</view>
			<view class="goods-info">
				<t-image class="wr-goods-card__thumb-com" :src="order.img" />
				<view class="goods-content">
					<view class="wr-goods-card__title">
						{{order.name}}
					</view>
					<view class="wr-goods-card__specs__desc-text">
						{{order.subList.join('/')}}
					</view>
				</view>
				<view class="right-footer">
					预约时间:{{order.reserveTime}}
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabBarActive:'tab-bar__active',
				tabs: [{
						key: -1,
						text: '全部'
					},
					{
						key: 1,
						text: '已上门'
					},
					{
						key: 2,
						text: '未上门'
					},
				],
				status: -1,
				orderList: [{
					orderNumber: '354021736133427225',
					name: '金属',
					subList: ['铁管', '铝罐', '铁', '铁皮'],
					reserveTime: '2024-03-05 15:43',
					status: '待上门',
					img: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-2a.png?imageMogr2/thumbnail/70x70'
				}, {
					orderNumber: '132381537407645696',
					name: '塑料',
					subList: ['水管', '铝罐', '铁', '铁皮'],
					reserveTime: '2024-03-05 15:43',
					status: '已上门',
					img: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png'
				}, {
					orderNumber: '132381537407645697',
					name: '塑料',
					subList: ['水管', '铝罐', '铁', '铁皮'],
					reserveTime: '2024-03-05 15:43',
					status: '已上门',
					img: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png'
				}, {
					orderNumber: '132381537407645698',
					name: '塑料',
					subList: ['水管', '铝罐', '铁', '铁皮'],
					reserveTime: '2024-03-05 15:43',
					status: '已上门',
					img: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png'
				}, {
					orderNumber: '132381537407645699',
					name: '塑料',
					subList: ['水管', '铝罐', '铁', '铁皮'],
					reserveTime: '2024-03-05 15:43',
					status: '已上门',
					img: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-09a.png'
				}],
				imgUrl: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-2a.png?imageMogr2/thumbnail/70x70'
			}
		},
		onPageScroll(e) {
			console.log('正在滚动',e)
		},
		methods: {
			onTabChange(e) {
				console.log(e)
				this.$data.status = e.detail.value
			}
		}
	}
</script>

<style>
	@import url('order.css');
</style>