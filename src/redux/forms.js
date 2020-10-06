import { initialFieldState } from "react-redux-form";

export const InitialUserState = {
    name: '',
    mobile: '',
    password: '',
    email: '',
    agree: false,
    country: 'Bangladesh',
    district: {value: 'Dhaka', label: "Dhaka"},
    thana: '',
    region: '',
    postalCode: null,
    homeLocation: ''
};
