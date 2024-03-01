<template>
	<view class="container">
		<t-swiper :current="current" :autoplay="autoplay" :duration="duration" :interval="interval"
			:navigation=" { type: 'dots' } " :list="swiperList">
		</t-swiper>

		<view class="ad-border">
			<view class="ad-content">
				<t-grid class="block">
					<t-grid-item text="公司简介" image="/static/company_desc.png" />
					<t-grid-item text="一键下单" image="/static/one_key_order.png" />
					<t-grid-item text="积分商城" image="/static/gifts.png" />
					<t-grid-item text="便民服务" image="/static/service.png" />
				</t-grid>
			</view>
		</view>
		<view class="cate-list">
			<view class="cate-card" v-for="(cate,index) in categoryList" v-bind:key="index">
				<view class="cate-title">
					{{cate.name}}
				</view>
				<view class="cate-sublist">
					{{cate.subList.join(' | ')}}
				</view>
				<view class="cate-ico">
					<img :src="cate.img" class="cate-img" alt="" />
				</view>
			</view>
		</view>
		<view class="ad-bottom">
			<img :src="imgInfo.gg" class="gg" alt="" />
		</view>
		<view class="photo-swiper">
			<view class="photo-swiper-title">
				经典回顾
			</view>
			<view class="card-theme">
				<t-swiper class="scale-card-theme" height="150" :current="screenPhoto.current"
					:autoplay="screenPhoto.autoplay" :duration="screenPhoto.duration" :interval="screenPhoto.interval"
					:navigation=" { type: 'dots' } " :list="imgInfo.hgList" :image-props=" { shape: 'round' } "
					previousMargin="20px" nextMargin="20px" t-class-nav="card-theme-nav"
					t-class-prev-image="scale-candidate" t-class-next-image="scale-candidate" />
			</view>
		</view>
		<t-tab-bar :value="currMenu" default-value="label_1" bindchange="onMenuChange" theme="tag" :split="false">
			<t-tab-bar-item v-for="(item,index) in menuList" v-bind:key="index" :value="item.value" :icon="item.icon">
				{{item.label}}
			</t-tab-bar-item>
		</t-tab-bar>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				categoryList: [{
					name: '纸类',
					subList: ['纸壳统货', '黄纸板', '宣传页', '书本纸', '报纸'],
					img: '/static/carton.png'
				}, {
					name: '塑料类',
					subList: ['塑料瓶', '废塑料', '塑料管', '泡沫'],
					img: '/static/plastic.png'
				}, {
					name: '废旧衣服类',
					subList: ['衣服', '鞋子'],
					img: '/static/clothes.png'
				}, {
					name: '其他类',
					subList: ['废铜', '废铁', '废铝', '淘汰家电', '其他'],
					img: '/static/fridge.png'
				}],
				imgInfo: {
					banner: 'https://zhikeqiang.com/appimg/banner.jpg',
					gg: 'https://zhikeqiang.com/appimg/gg2.png',
					gg2: 'https://zhikeqiang.com/appimg/dt.png',
					hgList: [
						'https://zhikeqiang.com/appimg/huigu_1.jpg',
						'https://zhikeqiang.com/appimg/huigu_2.jpg',
						'https://zhikeqiang.com/appimg/huigu_3.jpg',
						'https://zhikeqiang.com/appimg/huigu_4.jpg',
						'https://zhikeqiang.com/appimg/huigu_5.jpg',
						'https://zhikeqiang.com/appimg/huigu_6.jpg',
						'https://zhikeqiang.com/appimg/huigu_7.jpg'
					]
				},
				current: 0,
				autoplay: false,
				duration: 500,
				interval: 5000,
				swiperList: ["https://zhikeqiang.com/appimg/banner.jpg"],
				screenPhoto: {
					current: 0,
					autoplay: false,
					duration: 500,
					interval: 5000,
				},
				currMenu: 'label_1',
				menuList: [{
						value: 'label_1',
						label: '首页',
						icon: 'home'
					},
					{
						value: 'label_2',
						label: '应用',
						icon: 'app'
					},
					{
						value: 'label_3',
						label: '聊天',
						icon: 'chat'
					},
					{
						value: 'label_4',
						label: '我的',
						icon: 'user'
					},
				],
			}
		},
		onLoad() {

		},
		methods: {
			onMenuChange(e) {
				console.log(e)
				this.setData({
					value: e.detail.value,
				});
			}
		}
	}
</script>

<style>
	.card-theme {
		--td-swiper-radius: 0;
		--td-swiper-item-padding: 0 12rpx;
		--td-swiper-nav-dot-color: #e7e7e7;
		--td-swiper-nav-dot-active-color: #0052d9;
		padding-bottom: 18px;
		padding-left: 18px;
		padding-right: 18px;
	}

	.card-theme .card-theme-nav {
		bottom: -18px;
	}

	.t-class-nav {
		bottom: -18px;
	}

	.scale-candidate {
		height: 126px !important;
	}

	.t-class-prev-image {
		height: 126px !important;
	}

	.t-class-next-image {
		height: 126px !important;
	}

	.container {
		height: 100%;
		margin: 0;
		background-color: #F3F3F3;
	}

	.cate-list {
		width: 90vw;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.gg {
		width: 100%;
		height: 220rpx;
	}

	.ad-bottom {
		width: 90vw;
		margin: 0 auto;
		margin-bottom: 32rpx;
	}

	.cate-card {
		width: 48%;
		height: 180rpx;
		background-color: #FFFFFF;
		margin-bottom: 32rpx;
		box-shadow: 3px 3px 8px 0 rgba(0, 0, 0, 0.2);
	}

	.cate-title {
		font-size: 15px;
		font-weight: bold;
		margin-left: 18rpx;
	}

	.cate-sublist {
		margin-top: 10rpx;
		font-size: 12px;
		margin-left: 15rpx;
	}

	.cate-ico {}

	.cate-img {
		width: 64rpx;
		height: 64rpx;
		float: right;
	}

	.ad-border {
		margin-top: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.ad-content {
		border-radius: 16rpx 16rpx 0 0;
		width: 90vw;
		margin: 0 auto;
	}

	.block {
		display: block;
		height: 180rpx;
		margin-bottom: 32rpx;
	}

	.photo-swiper-title {
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 16rpx;
		padding-top: 20rpx;
		margin-left: 10rpx;
	}

	.photo-swiper {
		width: 90vw;
		margin: 0 auto;
		border-radius: 16rpx 16rpx 0 0;
		background-color: #FFFFFF;
	}
</style>