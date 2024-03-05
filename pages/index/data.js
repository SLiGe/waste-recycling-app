export default {
	navigates: [{
			name: '公司简介',
			img: '/static/company_desc.png'
		}, {
			name: '一键下单',
			img: '/static/one_key_order.png'
		}, {
			name: '积分商城',
			img: '/static/gifts.png'
		}, {
			name: '便民服务',
			img: '/static/service.png'
		}

	],
	categories: [{
		name: '纸类',
		code: 'zhilei',
		subList: ['纸壳统货', '黄纸板', '宣传页', '书本纸', '报纸'],
		img: '/static/box80_40.png'
	}, {
		name: '塑料类',
		code: 'suliao',
		subList: ['塑料瓶', '废塑料', '塑料管', '泡沫'],
		img: '/static/plastic80_40.png'
	}, {
		name: '金属类',
		code: 'jinshu',
		subList: ['铁罐', '铝罐', '铝合金'],
		img: '/static/metal80_40.png'
	}, {
		name: '家电类',
		code: 'jiadian',
		subList: ['电视机', '冰箱', '空调', '洗衣机', '其他'],
		img: '/static/tv80_40.png'
	}],
}