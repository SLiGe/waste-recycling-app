<template>
	<view class="page-container">
		<view class="address-detail">
			<view class="divider-line" />
			<t-location v-on:change="getWeixinAddress"></t-location>

			<view class="divider-line" />
			<view class="form-address">
				<view class="form-item">
					<view class="form-label">
						<view class="form-label-text">
							联系人
						</view>
					</view>
					<view class="form-right">
						<input class="form-input" placeholder="您的姓名" />
					</view>
				</view>
				<view class="form-item">
					<view class="form-label">
						<view class="form-label-text">
							手机号
						</view>
					</view>
					<view class="form-right">
						<input class="form-input" placeholder="联系您的手机号" />
					</view>
				</view>
				<view class="form-item">
					<view class="form-label">
						<view class="form-label-text">
							地区
						</view>
					</view>
					<view class="form-right">
						<input class="form-input" disabled="disabled" @click="onPickArea()" placeholder="省/市/区"
							:value="areaValue" />
						<t-icon size="24px" name="location" @click="onSearchAddress()" />
					</view>
				</view>
				<view class="form-item">
					<view class="form-label">
						<view class="form-label-text">
							详细地址
						</view>
					</view>
					<view class="form-right">
						<input class="form-input" placeholder="门牌号等(如10栋1001号)" />
					</view>
				</view>
			</view>
			<view class="submit">
				<t-button class="btn-submit-address" shape="round" block :disabled="!submitActive"> 保存 </t-button>
			</view>
		</view>
		<t-cascader data-item="address" data-type="1" :visible="areaPickerVisible" theme="tab" :options="areaDataList"
			:value="userInfo.districtCode" title="选择地区" v-on:change="onInputValue"></t-cascader>
	</view>

</template>

<script>
	import {
		areaData
	} from '../../config/index.js';
	const innerPhoneReg = '^1(?:3\\d|4[4-9]|5[0-35-9]|6[67]|7[0-8]|8\\d|9\\d)\\d{8}$';
	const innerNameReg = '^[a-zA-Z\\d\\u4e00-\\u9fa5]+$';
	import {
		showToast
	} from '../../wxcomponents/toast/index.js'
	export default {
		data() {
			return {
				submitActive: true,
				areaPickerVisible: false,
				areaDataList: areaData,
				areaValue: '',
				userInfo: {
					name: '',
					phone: '',
					cityCode: '',
					cityName: '',
					countryCode: '',
					countryName: '',
					detailAddress: '',
					districtCode: '',
					districtName: '',
				},
				verifyTips: ''
			}
		},
		methods: {
			builtInSearch({
				code,
				name
			}) {
				return new Promise((resolve, reject) => {
					wx.getSetting({
						success: (res) => {
							if (res.authSetting[code] === false) {
								wx.showModal({
									title: `获取${name}失败`,
									content: `获取${name}失败，请在【右上角】-小程序【设置】项中，将【${name}】开启。`,
									confirmText: '去设置',
									confirmColor: '#FA550F',
									cancelColor: '取消',
									success(res) {
										if (res.confirm) {
											wx.openSetting({
												success(settinRes) {
													if (settinRes.authSetting[code] ===
														true) {
														resolve();
													} else {
														console.warn('用户未打开权限', name,
															code);
														reject();
													}
												},
											});
										} else {
											reject();
										}
									},
									fail() {
										reject();
									},
								});
							} else {
								resolve();
							}
						},
						fail() {
							reject();
						},
					});
				});
			},

			onSearchAddress() {
				this.builtInSearch({
					code: 'scope.userLocation',
					name: '地址位置'
				}).then(() => {
					wx.chooseLocation({
						success: (res) => {
							if (res.name) {
								this.triggerEvent('addressParse', {
									address: res.address,
									name: res.name,
									latitude: res.latitude,
									longitude: res.longitude,
								});
							} else {
								showToast({
									context: this,
									selector: '#t-toast',
									message: '地点为空，请重新选择',
									icon: '',
									duration: 1000,
								});
							}
						},
						fail: function(res) {
							console.warn(`wx.chooseLocation fail: ${JSON.stringify(res)}`);
							if (res.errMsg !== 'chooseLocation:fail cancel') {
								showToast({
									context: this,
									selector: '#t-toast',
									message: '地点错误，请重新选择',
									icon: '',
									duration: 1000,
								});
							}
						},
					});
				});
			},
			getWeixinAddress(e) {
				const weixinAddress = e.detail;
				this.userInfo = {
					...this.userInfo,
					...weixinAddress
				}
			},
			onPickArea() {
				this.areaPickerVisible = true
			},
			onVerifyInputLegal() {
				const {
					name,
					phone,
					detailAddress,
					districtName
				} = this.userInfo;
				const nameRegExp = new RegExp(innerNameReg);
				const phoneRegExp = new RegExp(innerPhoneReg);
				if (!name || !name.trim()) {
					return {
						isLegal: false,
						tips: '请填写收货人',
					};
				}
				if (!nameRegExp.test(name)) {
					return {
						isLegal: false,
						tips: '收货人仅支持输入中文、英文（区分大小写）、数字',
					};
				}
				if (!phone || !phone.trim()) {
					return {
						isLegal: false,
						tips: '请填写手机号',
					};
				}
				if (!phoneRegExp.test(phone)) {
					return {
						isLegal: false,
						tips: '请填写正确的手机号',
					};
				}
				if (!districtName || !districtName.trim()) {
					return {
						isLegal: false,
						tips: '请选择省市区信息',
					};
				}
				if (!detailAddress || !detailAddress.trim()) {
					return {
						isLegal: false,
						tips: '请完善详细地址',
					};
				}
				if (detailAddress && detailAddress.trim().length > 50) {
					return {
						isLegal: false,
						tips: '详细地址不能超过50个字符',
					};
				}
				return {
					isLegal: true,
					tips: '添加成功',
				};
			},
			onInputValue(e) {
				const {
					item
				} = e.currentTarget.dataset;
				console.log(e)
				if (item === 'address') {
					const {
						selectedOptions = []
					} = e.detail;
					this.userInfo.provinceCode = selectedOptions[0].value
					this.userInfo.provinceName = selectedOptions[0].label
					this.userInfo.cityName = selectedOptions[1].label
					this.userInfo.cityCode = selectedOptions[1].value
					this.userInfo.districtCode = selectedOptions[2].value
					this.userInfo.districtName = selectedOptions[2].label
					this.areaPickerVisible = false
					const {
						isLegal,
						tips
					} = this.onVerifyInputLegal();
					this.submitActive = isLegal
					this.verifyTips = tips;
					this.areaValue = (this.userInfo.provinceName ? this.userInfo.provinceName + '/' : '') + (this.userInfo
						.cityName ?
						this.userInfo.cityName + '/' : '') + this.userInfo.districtName
				} else {
					const {
						value = ''
					} = e.detail;
					this.$data.userInfo[item] = value
					const {
						isLegal,
						tips
					} = this.onVerifyInputLegal();
					this.submitActive = isLegal
					this.$data.verifyTips = tips;
				}
			}
		}
	}
</script>

<style>
	@import url('info.css');
</style>