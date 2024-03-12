import * as Yup from 'yup';


const signinSchema = Yup.object({
    loginId:Yup.string().required("Required"),
    password: Yup.string().min(6).required("Please enter your password"),
})

const signupSchema = Yup.object({
    firstname:Yup.string().email().required("Please enter your email"),
    loginId:Yup.string().email().required("Please enter your email"),
    
    password: Yup.string().min(6).required("Please enter your password"),
    confirm_pwd:Yup.string().email().required().oneOf([Yup.ref("password"),null],"password must match"),
})
export {signinSchema,signupSchema}
// export default function validation(data) {
//     const errors = {}
//     let email_pattern = /^[^\s@]+@[^\s@]+\.[^\@]{2,6}$/;
//     let password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
//     let number_pattern = /^(\+\d{1,3}[- ]?)?\d{10}$/
    
//     var inputValue = data.loginId.trim()
//     if (data.loginId === "") {
//         errors.loginId = "Email is required"
//     } else if (!email_pattern.test(inputValue)) {
//         errors.loginId = "Please enter valid email"
//     }

//     if (data.password === "") {
//         errors.password = "Password is required"
//     }
//     return errors

// }
