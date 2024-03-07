let addressPromise = [];

/** 获取一个地址选择Promise */
export const getAddressPromise = () => {
	let resolver;
	let rejecter;
	const nextPromise = new Promise((resolve, reject) => {
		resolver = resolve;
		rejecter = reject;
	});

	addressPromise.push({
		resolver,
		rejecter
	});

	return nextPromise;
};

/** 用户选择了一个地址 */
export const resolveAddress = (address) => {
	const allAddress = [...addressPromise];
	addressPromise = [];

	allAddress.forEach(({
		resolver
	}) => resolver(address));
};

/** 用户没有选择任何地址只是返回上一页了 */
export const rejectAddress = () => {
	const allAddress = [...addressPromise];
	addressPromise = [];

	allAddress.forEach(({
		rejecter
	}) => rejecter(new Error('cancel')));
};

export const buildAddressSearch = ({
	code,
	name
}) => {
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
}

module.exports = {
	buildAddressSearch,
};