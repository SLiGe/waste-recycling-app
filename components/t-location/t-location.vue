<template>
	<view class="wx-address address-detail-wx-location" @click="getWxLocation()">
		<view class="wx-address-custom">
			<t-icon class="weixin" color="#0ABF5B" name="logo-wechat-stroke" size="48rpx" />
			<text>通过微信获取地址</text>
		</view>
		<t-icon class="address-detail-wx-arrow" name="chevron-right" color="#bbb" size="32rpx" />
	</view>
	<t-toast id="t-toast" />
</template>

<script>
	import {
		showToast
	} from '../../wxcomponents/toast/index.js'
	import {
		getPermission,
	} from '../../utils/getPermission.js'
	import {
		phoneRegCheck,
	} from '../../utils/util.js'
	import {
		addressParse,
	} from '../../utils/addressParse.js'
	import {
		resolveAddress,
		rejectAddress
	} from '../../utils/address.js'
	export default {
		name: 't-location',
		data() {
			return {

			}
		},
		props: {
			title: {
				type: String,
			},
			navigateUrl: {
				type: String,
			},
			navigateEvent: {
				type: String,
			},
			isCustomStyle: {
				type: Boolean,
				value: false,
			},
			isDisabledBtn: {
				type: Boolean,
				value: false,
			},
			isOrderSure: {
				type: Boolean,
				value: false,
			},
		},
		methods: {
			getWxLocation() {
				if (this.isDisabledBtn) return;
				getPermission({
					code: 'scope.address',
					name: '通讯地址'
				}).then(() => {
					wx.chooseAddress({
						success: async (options) => {
							const {
								provinceName,
								cityName,
								countyName,
								detailInfo,
								userName,
								telNumber
							} = options;

							if (!phoneRegCheck(telNumber)) {

								showToast({
									context: this,
									selector: '#t-toast',
									message: '请填写正确的手机号',
								});
								return;
							}

							const target = {
								name: userName,
								phone: telNumber,
								countryName: '中国',
								countryCode: 'chn',
								detailAddress: detailInfo,
								provinceName: provinceName,
								cityName: cityName,
								districtName: countyName,
								isDefault: false,
								isOrderSure: this.isOrderSure,
							};

							try {
								const {
									provinceCode,
									cityCode,
									districtCode
								} = await addressParse(provinceName, cityName, countyName);

								const params = Object.assign(target, {
									provinceCode,
									cityCode,
									districtCode,
								});
								if (this.isOrderSure) {
									this.onHandleSubmit(params);
								} else if (this.navigateUrl != '') {
									const {
										navigateEvent
									} = this;
									this.emit('navigate');
									wx.navigateTo({
										url: this.navigateUrl,
										success: function(res) {
											res.eventChannel.emit(navigateEvent, params);
										},
									});
								} else {
									this.emit('change', params);
								}
							} catch (error) {
								wx.showToast({
									title: '地址解析出错，请稍后再试',
									icon: 'none'
								});
							}
						},
						fail(err) {
							console.warn('未选择微信收货地址', err);
						},
					});
				});
			},
		}
	}
</script>

<style>
	.wx-address .weixin {
		display: inline-block;
		font-size: 48rpx !important;
		margin-right: 20rpx;
		font-weight: normal;
	}

	.wx-address .cell {
		padding: 32rpx 30rpx;
		border-radius: 8rpx;
	}

	.wx-address .cell__title {
		font-size: 30rpx;
		color: #333333;
	}

	.wx-address-custom {
		display: flex;
		align-items: center;
		font-size: 32rpx;
	}
</style>