<template>
	<view class="container">
		<view class="header">
			<!-- 地址栏 -->
			<view class="address-content">
				<view class="address-value">
					<t-icon name="location" color="#84CCC9" size="48rpx" data-name="location" />
					<view class="address">
						地址: {{address}}
					</view>
				</view>
				<view class="modify-button">
					修改
					<t-icon name="chevron-right-s" color="#84CCC9" size="48rpx" data-name="chevron-right-s" />
				</view>
			</view>
			<view class="category-list">
				<t-row gutter="16">
					<t-col span="6" v-for="item in categoryList" v-bind:key="item.code">
						<view class="category-border" @click="changeCategory(item.code)"
							:class="currType === item.code?'category-selected':''">
							<image class="category-img" :src="item.img"></image>
							<view class="category-name" :class="currType === item.code?'category-name-selected':''">
								{{item.name}}
							</view>
						</view>
					</t-col>
				</t-row>
			</view>
		</view>
		<view class="category-sub-list">
			<view class="category-sub-list-title">
				<t-icon name="tree-list" color="#84CCC9" size="48rpx" data-name="tree-list" />
				<view class="category-sub-list-title-label">{{currTypeName}}</view>
			</view>
			<t-row gutter="16">
				<t-col span="8" v-for="item in currSubList" v-bind:key="item.name">
					<view class="category-sub-border" :class="item.selected ? 'category-selected':''"
						@click="clickSubItem(item.code)">
						<img :src="item.img" class="category-sub-img" alt="" />
						<view class="category-sub-label-right">
							<view class="category-sub-name" :class="item.selected ? 'category-name-selected':''">
								{{item.name}}
							</view>
							<view class="category-sub-remark"
								:class="item.selected ? 'category-sub-remark-selected':''">
								实物为准
							</view>
						</view>
					</view>
				</t-col>
			</t-row>
		</view>
		<view class="footer">
			<view class="footer-left">
				<view class="category-cart">
					<t-icon name="cart-add" size="36" color="#FFFFFF" data-name="cart-add"></t-icon>
				</view>
				<view class="selected-category-count">
					已选择类型: {{selectedCategoryCount}}
				</view>
			</view>
			<view class="order-button" @click="clickOrder">
				一键下单
			</view>
		</view>
	</view>
	<t-message id="t-message" />
</template>

<script>
	import indexData from './data.js'
	import Message from '../../wxcomponents/message/index.js'
	export default {
		data() {
			return {
				currType: 'paper',
				currTypeName: '纸类',
				address: '北京市大兴区',
				categoryList: indexData.categoryList,
				currSubList: [],
				selectedCategoryCount: 0,
			}
		},
		mounted() {
			let item = this.categoryList.find(item => item.code === this.currType)
			this.$data.currSubList = item.subList
		},
		methods: {
			changeCategory(code) {
				let item = this.categoryList.find(item => item.code === code)
				this.$data.currType = code
				this.currTypeName = item.name
				this.$data.currSubList = item.subList
			},
			clickSubItem(code) {
				let category = this.categoryList.find(item => item.code === this.currType)
				let subItem = category.subList.find(item => item.code === code)
				subItem.selected = !subItem.selected
				this.calcSelectedSubItem()
			},
			calcSelectedSubItem() {
				let category = this.categoryList.find(item => item.code === this.currType)
				this.selectedCategoryCount = category.subList.filter(item => item.selected).length
			},
			clickOrder() {
				if (this.selectedCategoryCount < 1) {
					Message.error({
					        context: this,
					        offset: [20, 32],
					        duration: 5000,
					        content: '这是一条错误提示通知',
					      });
				}
			}
		}
	}
</script>

<style>
	@import url('index.css');
</style>