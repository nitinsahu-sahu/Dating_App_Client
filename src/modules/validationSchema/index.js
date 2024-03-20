import * as Yup from 'yup';


const signinSchema = Yup.object({
    loginId:Yup.string().required("Required"),
    password: Yup.string().min(6).required("Please enter your password"),
})

const signupSchema = Yup.object({
    fullname:Yup.string().min(2).required("Fullame is required"),
    email:Yup.string().email().required("Please enter your email"),
    dob:Yup.string().required("Date of birth is required"),
    password: Yup.string().min(6).required("Please enter your password"),
    confirmpassword:Yup.string().required().oneOf([Yup.ref("password"),null],"password must match"),
    intent:Yup.string().required("Please select intent type."),
    showme:Yup.string().required("Please select showme type."),
    selectgender:Yup.string().required("Required")
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
