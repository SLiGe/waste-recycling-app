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
					<view style="color: red;">
						*
					</view>
					<t-icon name="list" class="prefix-icon" />
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
			<t-date-time-picker title="选择日期和时间" :visible="reserveDateTimeVisible" mode="minute"
				:value="reserveInfo.reserveDateTime" format="YYYY-MM-DD HH:mm"
				v-on:change="confirmReserveDateTimePicker" :start="startDateTime" :end="endDateTime"
				v-on:cancel="hideReserveDateTimePicker" />

			<view class="form-item">
				<view class="form-label">
					<view style="color: red;">
						*
					</view>
					<t-icon name="calendar" class="prefix-icon" />
					<view class="form-label-text">
						预约时间:
					</view>
				</view>
				<view class="form-right">
					<input type="text" disabled="disabled" :value="reserveInfo.reserveDateTime" placeholder="请选择预约时间"
						class="form-input"  @click="showReserveDateTimePicker"/>
				</view>
			</view>
			<view class="form-item">
				<view class="form-label">
					<view style="color: red;">
						*
					</view>
					<t-icon name="user-circle" class="prefix-icon" />
					<view class="form-label-text">
						您的姓名:
					</view>
				</view>
				<view class="form-right">
					<input class="form-input" :value="reserveInfo.name" placeholder="请输入您的姓名" />
				</view>
			</view>
			<view class="form-item">
				<view class="form-label">
					<view style="color: red;">
						*
					</view>
					<t-icon name="mobile" class="prefix-icon" />
					<view class="form-label-text">
						您的电话:
					</view>
				</view>
				<view class="form-right">
					<input class="form-input" :value="reserveInfo.phone" placeholder="请输入您的电话" />
				</view>
			</view>
			<view class="form-item">
				<view class="form-label">
					<view style="color: red;">
						*
					</view>
					<t-icon name="houses" class="prefix-icon" />
					<view class="form-label-text">
						您的地址:
					</view>
				</view>
				<view class="form-right">
					<view class="location" @click="onSearchAddress()">
						<t-icon name="location" />
						<view class="location-label">
							定位
						</view>
					</view>
				</view>
			</view>
			<view class="location-form">
				<view class="location-text">
					{{areaValue}}
				</view>
				<view class="location-form-item">
					<view class="form-label">
						详细地址:
					</view>
					<!-- <input type="text" :value="reserveInfo.detailAddress" placeholder="请输入您的详细地址" class="form-input" /> -->
					<textarea class="form-input" style="width: 420rpx;" :value="reserveInfo.detailAddress"
						placeholder="门牌号等(如10栋1001号)" auto-height />
				</view>
				<view class="location-prompt">
					请认真填写您的地址、小区名称、楼栋单元，否则骑手难以到达您的准确位置。
				</view>
			</view>
			<view class="form-item">
				<view class="form-label">
					<t-icon name="book" class="prefix-icon" />
					<view class="form-label-text">
						备注:
					</view>
				</view>
				<view class="form-right">
					<input class="form-input" :value="reserveInfo.remark" placeholder="备注信息" />
				</view>
			</view>
			<view class="form-item">
				<view class="form-label">
					<t-icon name="houses" class="prefix-icon" />
					<view class="form-label-text">
						入户确认:
					</view>
				</view>
				<view class="form-right">
					<checkbox-group>
						<label>
							<checkbox value="cb" :checked="reserveInfo.agreeLogin" />我同意允许骑手入户
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
				<view class="submit-button" @click="submit()">
					提交预约上门
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		addressParse,
		parseAddressToRegion
	} from '../../utils/addressParse.js'
	import {
		buildAddressSearch
	} from '../../utils/address.js'
	import {
		phoneRegCheck
	} from '../../utils/util.js'
	import dayjs from 'dayjs'

	export default {
		data() {
			return {
				reserveDateTimeVisible: false,
				selectedItem: {
					categoryName: '纸类',
					subList: []
				},
				areaValue: '',
				reserveInfo: {
					agreeLogin: true
				},
				startDateTime: '',
				endDateTime: ''
			}
		},
		onLoad(option) {
			this.selectedItem = JSON.parse(option.param)
			console.log(this.selectedItem)
			this.startDateTime = dayjs().format('YYYY-MM-DD HH:mm')
			this.endDateTime = dayjs().add(7, 'day').format('YYYY-MM-DD HH:mm')
			console.log(this.endDateTime)
		},
		methods: {
			submit() {
				const verifyInfo = this.verifyInfo()
				if (!verifyInfo.isLegal) {
					wx.showToast({
						icon: 'none',
						title: verifyInfo.tips,
						duration: 1000
					})
					return
				}
			},
			verifyInfo() {
				const {
					name,
					phone,
					detailAddress
				} = this.reserveInfo
				if (!name) {
					return {
						isLegal: false,
						tips: '请填写联系人姓名',
					}
				}
				if (!phone || !phoneRegCheck(phone)) {
					return {
						isLegal: false,
						tips: '请填写正确的手机号',
					}
				}
				if (!detailAddress) {
					return {
						isLegal: false,
						tips: '请填写详细地址',
					}
				}
			},
			onSearchAddress() {
				buildAddressSearch({
					code: 'scope.userLocation',
					name: '地址位置'
				}).then(() => {
					wx.chooseLocation({
						success: (res) => {
							if (res.name) {
								var addressBean = parseAddressToRegion(res)
								addressParse(addressBean.REGION_PROVINCE, addressBean.REGION_CITY,
									addressBean
									.REGION_COUNTRY).then(res => {
									this.reserveInfo.cityCode = res.cityCode
									this.reserveInfo.cityName = addressBean.REGION_CITY
									this.reserveInfo.districtCode = res.districtCode
									this.reserveInfo.districtName = addressBean.REGION_COUNTRY
									this.reserveInfo.provinceCode = res.provinceCode
									this.reserveInfo.provinceName = addressBean.REGION_PROVINCE
									this.reserveInfo.detailAddress = addressBean.ADDRESS
									console.log(res)
									console.log(this.reserveInfo)
									this.areaValue = (this.reserveInfo.provinceName ? this
											.reserveInfo.provinceName + '/' : '') + (this
											.reserveInfo
											.cityName ?
											this.reserveInfo.cityName + '/' : '') + this
										.reserveInfo
										.districtName
								})
							} else {
								wx.showToast({
									title: '地点为空，请重新选择',
									icon: 'none',
									duration: 1000
								})
							}
						},
						fail: function(res) {
							console.warn(`wx.chooseLocation fail: ${JSON.stringify(res)}`);
							if (res.errMsg !== 'chooseLocation:fail cancel') {
								wx.showToast({
									title: '地点错误，请重新选择',
									icon: 'none',
									duration: 1000
								})
							}
						},
					});
				});
			},

			showReserveDateTimePicker() {
				this.reserveDateTimeVisible = true
			},
			hideReserveDateTimePicker() {
				this.reserveDateTimeVisible = false
			},
			confirmReserveDateTimePicker(e) {
				const {
					value
				} = e?.detail;
				console.log(value)
				this.reserveInfo.reserveDateTime = value
				this.hideReserveDateTimePicker()
			}
		}
	}
</script>

<style>
	@import url("reserve.css");
</style>