import { initialFieldState } from "react-redux-form";

export const InitialUserState = {
    name: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    agree: false,
    country: 'Bangladesh',
    district: {value: 'Dhaka', label: "Dhaka"},
    thana: '',
    region: '',
    postalCode: null,
    homeLocation: '',
    paymentMethod: ''
};

export const InitialProductFormState = {
	code: '',
	title: '',
    price: 0,
    discount: 0,
    quantity: 0,
    category: '',
    subcategory: '',
    features: [],
    specifications: [],
};
