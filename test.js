var SHA256 = require("crypto-js/sha256");
const createSignature = (apiKey,secret) => {
    let timestamp = Date.now();
    timestamp = timestamp.toString().slice(0,-3) //remove last 3 digits
    const token = apiKey+secret+timestamp;
    const digitalSignature = SHA256(token)
    return digitalSignature;
}   
const addHours = (date, hours) => {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + hours);
    return newDate;
  }
const formattedDate = (period=0) => {
    let dt = new Date()
    const date_obj = addHours(dt,period)
    let day = ("0" + date_obj.getDate()).slice(-2);
    let month = ("0" + (date_obj.getMonth() + 1)).slice(-2);
    let year = date_obj.getFullYear();
    let hours = (date_obj.getHours()<10?'0':'')+date_obj.getHours(); 
    let minutes = (date_obj.getMinutes()<10?'0':'') + date_obj.getMinutes();
    const date = year + "-" + month + "-" + day //TEMP for testing
    return date
} 

// forms url request including the info needed
const formatUrl = (apikey,endpoint,signed,facilityIds) => {
    const start = formattedDate(0);
    const end = formattedDate(2); //2 hr time periods
    const url = `${process.env.BASE_URL}${endpoint}?date_from=${start}&date_to=${end}&facility_ids=${facilityIds}&api_key=${apikey}&sig=`
    return url+signed
}

exports.createSignature = createSignature
exports.formatUrl = formatUrl