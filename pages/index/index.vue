<template>
	<view class="container">
		<t-swiper :current="current" :autoplay="autoplay" :duration="duration" :interval="interval"
			:navigation=" { type: 'dots' } " :list="swiperList">
		</t-swiper>

		<view class="ad-border">
			<view class="ad-content">
				<t-row gutter="16" class="navigate-row">
					<t-col span="6" v-for="item in navigateList" v-bind:key="item.name">
						<view class="navigate-item">
							<img :src="item.img" class="navigate-img" :alt="item.name" />
							<view class="navigate-label">
								{{item.name}}
							</view>
						</view>
					</t-col>
				</t-row>
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
	</view>
</template>

<script>
	import indexData from './data.js'
	export default {
		data() {
			return {
				title: 'Hello',
				navigateList: indexData.navigates,
				categoryList: indexData.categories,
				imgInfo: {
					banner: 'https://zhikeqiang.com/appimg/banner.jpg',
					gg: 'https://zhikeqiang.com/appimg/gg2.png',
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
				autoplay: true,
				duration: 500,
				interval: 5000,
				swiperList: ["https://zhikeqiang.com/appimg/banner.jpg"],
				screenPhoto: {
					current: 0,
					autoplay: false,
					duration: 500,
					interval: 5000,
				},

			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	@import url("index.css");
</style>