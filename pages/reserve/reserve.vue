<template>
	<view class="container">
		<view class="form">
			<view class="form-header">
				填写预约表单
			</view>
			<view class="prompt">
				<view class="prompt-text">
					注意：只接受总重量在10公斤以上的物品；下单后骑手会在两天内上门处理，如有特殊情况，可在"我的"-"我的订单"里面直接联系骑手。
				</view>
			</view>
			<view class="form-item">
				<view class="form-label">
					<img src="/static/reserve/box.png" class="prefix-icon" />
					<view class="form-label-text">
						物品类别:
					</view>
				</view>
				<view class="form-right">
					<view class="category-item" v-for="item in selectedItem.subList" v-bind:key="item.code">
						{{selectedItem.categoryName}} - {{item.name}}
					</view>
				</view>
			</view>
			<!-- 年月日时分 -->
			<t-date-time-picker title="选择日期和时间" :visible="reserveDateTimeVisible" mode="minute" :value="reserveDateTime"
				format="YYYY-MM-DD HH:mm" 
				v-on:change="confirmReserveDateTimePicker"
				v-on:cancel="hideReserveDateTimePicker" />

			<view class="form-item" @click="showReserveDateTimePicker">
				<view class="form-label">
					<img src="/static/reserve/date.png" class="prefix-icon" />
					<view class="form-label-text">
						预约时间:
					</view>
				</view>
				<view class="form-right">
					<view class="form-input" >
						{{reserveDateTime}}
					</view>
				</view>
			</view>
			<view class="form-item">
				<view class="form-label">
					<img src="/static/reserve/user.png" class="prefix-icon" />
					<view class="form-label-text">
						您的姓名:
					</view>
				</view>
				<view class="form-right">
					<input class="form-input" />
				</view>
			</view>
			<view class="form-item">
				<view class="form-label">
					<img src="/static/reserve/phone.png" class="prefix-icon" />
					<view class="form-label-text">
						您的电话:
					</view>
				</view>
				<view class="form-right">
					<input class="form-input" />
				</view>
			</view>
			<view class="form-item">
				<view class="form-label">
					<img src="/static/reserve/house.png" class="prefix-icon" />
					<view class="form-label-text">
						您的地址:
					</view>
				</view>
				<view class="form-right">
					<view class="location">
						<t-icon name="location" />
						<view class="location-label">
							定位
						</view>
					</view>
				</view>
			</view>
			<view class="location-form">
				<view class="location-text">
					广东省广州市
				</view>
				<view class="location-form-item">
					<view class="form-label">
						详细地址:
					</view>
					<input type="text" placeholder="请输入您的详细地址" class="form-input" />
				</view>
				<view class="location-prompt">
					请认真填写您的地址、小区名称、楼栋单元，否则骑手难以到达您的准确位置。
				</view>
			</view>
			<view class="form-item">
				<view class="form-label">
					<img src="/static/reserve/house.png" class="prefix-icon" />
					<view class="form-label-text">
						入户确认:
					</view>
				</view>
				<view class="form-right">
					<checkbox-group>
						<label>
							<checkbox value="cb" checked="true" />我同意允许骑手入户
						</label>
					</checkbox-group>
				</view>
			</view>
			<view class="check-prompt">
				<view class="location-prompt">
					为安全起见，请您将物品放置楼下或户外;若需要骑手入户整理，请勾选同意骑手入户。
				</view>
			</view>
			<view class="submit">
				<view class="submit-button">
					提交预约上门
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reserveDateTimeVisible: false,
				reserveDateTime: '2024-03-04 14:13',
				selectedItem: {
					categoryName: '纸类',
					subList: [{
							name: '纸壳统货',
							img: '/static/carton.png',
							code: 'zkth',
							selected: false
						},
						{
							name: '黄纸板',
							img: '/static/carton.png',
							code: 'hzb',
							selected: false
						},
						{
							name: '宣传页',
							code: 'xcy',
							img: '/static/carton.png',
							selected: false
						},
						{
							name: '书本纸',
							code: 'sbz',
							img: '/static/carton.png',
							selected: false
						},
						{
							name: '报纸',
							code: 'bz',
							img: '/static/carton.png',
							selected: false
						},
						{
							name: '其他纸类',
							code: 'other',
							img: '/static/carton.png',
							selected: false
						}
					]
				},
			}
		},
		onLoad(option) {
			this.selectedItem = JSON.parse(option.param)
			console.log(this.selectedItem)
		},
		methods: {
			showReserveDateTimePicker() {
				this.reserveDateTimeVisible = true
			},
			hideReserveDateTimePicker() {
				this.reserveDateTimeVisible = false
			},
			confirmReserveDateTimePicker(e) {
				console.log(value)
				const {
					value
				} = e?.detail;
				console.log(value)
				this.reserveDateTime = value
				this.hideReserveDateTimePicker()
			}
		}
	}
</script>

<style>
	@import url("reserve.css");
</style>