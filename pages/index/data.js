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
		code: 'paper',
		subList: ['纸壳统货', '黄纸板', '宣传页', '书本纸', '报纸'],
		img: '/static/carton.png'
	}, {
		name: '塑料类',
		code: 'plastic',
		subList: ['塑料瓶', '废塑料', '塑料管', '泡沫'],
		img: '/static/plastic.png'
	}, {
		name: '废旧衣服类',
		code: 'clothes',
		subList: ['衣服', '鞋子'],
		img: '/static/clothes.png'
	}, {
		name: '其他类',
		code: 'metal',
		subList: ['废铜', '废铁', '废铝', '淘汰家电', '其他'],
		img: '/static/fridge.png'
	}],
}