export const generateOtp = () => {
    return Math.floor(Math.random() * 9000) + 1000// 1000 to 9999
}