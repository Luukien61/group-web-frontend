const EmailRegexCheck = ({email} : {email: string}) => {
    const emailRegex =/[\w.]+@[\w.]+\.\w{2,3}$/
    return emailRegex.test(email)
};
export default EmailRegexCheck;