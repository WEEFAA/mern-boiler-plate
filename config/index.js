
const prod = process.env.NODE_ENV === "production" ? true : false

module.exports = prod ? process.env : require('./dev')