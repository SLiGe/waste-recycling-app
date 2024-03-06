import {
	areaData
} from '../config/index';

export const addressParse = (provinceName, cityName, countryName) => {
	return new Promise((resolve, reject) => {
		try {
			const province = areaData.find((v) => v.label === provinceName);
			const {
				value: provinceCode
			} = province;
			const city = province.children.find((v) => v.label === cityName);
			const {
				value: cityCode
			} = city;
			const country = city.children.find((v) => v.label === countryName);
			const {
				value: districtCode
			} = country;
			resolve({
				provinceCode,
				cityCode,
				districtCode,
			});
		} catch (error) {
			reject('地址解析失败');
		}
	});
};

export function parseAddressToRegion(res) {
	var regex = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/;
	var REGION_PROVINCE = [];
	var addressBean = {
		REGION_PROVINCE: null,
		REGION_COUNTRY: null,
		REGION_CITY: null,
		ADDRESS: null
	};

	function regexAddressBean(address, addressBean) {
		regex = /^(.*?[市州]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;
		var addxress = regex.exec(address);
		addressBean.REGION_CITY = addxress[1];
		addressBean.REGION_COUNTRY = addxress[2];
		addressBean.ADDRESS = addxress[3] + "(" + res.name + ")";
		console.log(addxress);
	}
	if (!(REGION_PROVINCE = regex.exec(res.address))) {
		regex = /^(.*?(省|自治区))(.*?)$/;
		REGION_PROVINCE = regex.exec(res.address);
		addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
		regexAddressBean(REGION_PROVINCE[3], addressBean);
	} else {
		addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
		regexAddressBean(res.address, addressBean);
	}
	return addressBean
}