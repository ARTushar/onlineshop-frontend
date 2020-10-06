import { initialFieldState } from 'react-redux-form';

export const InitialUserState = {
	name: '',
	mobile: '',
	password: '',
	confirmPassword: '',
	agree: false,
	country: 'Bangladesh',
	district: { value: 'Dhaka', label: 'Dhaka' },
	thana: '',
	region: '',
	postalCode: null,
	homeLocation: '',
	paymentMethod: '',
};

export const InitialOrderState = {
	name: InitialUserState.name,
	mobile: InitialUserState.mobile,
	country: InitialUserState.country,
	district: InitialUserState.district,
	thana: InitialUserState.thana,
	region: InitialUserState.region,
	postalCode: InitialUserState.postalCode,
	homeLocation: InitialUserState.homeLocation,
	deliveryNotes: '',
	paymentMethod: InitialUserState.paymentMethod,
};
export const InitialProductFormState = {
	image: [],
	sku: '',
	title: '',
	price: '',
	discount: 0,
	quantity: '',
	category: '',
	subcategory: '',
	features: [],
	specifications: [],
};
