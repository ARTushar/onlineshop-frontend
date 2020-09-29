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
    deliveryNotes: '',
    paymentMethod: ''
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
    deliveryNotes: InitialUserState.deliveryNotes,
    paymentMethod: InitialUserState.paymentMethod
}
