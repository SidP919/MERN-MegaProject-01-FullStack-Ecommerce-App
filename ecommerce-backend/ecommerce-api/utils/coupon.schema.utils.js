const COUPON_SCHEMA_UTILS = Object.freeze({
    CODE_MAX_LENGTH:30,
    CODE_MIN_LENGTH:4,
    VALIDITY_MIN_TIMELIMIT:Date.now()+62*60*1000,
    VALIDITY_MAX_TIMELIMIT:Date.now() + 90 * 24 * 60 * 60 * 1000,
    DISCOUNT_MAX_LIMIT:60,
})

export default COUPON_SCHEMA_UTILS;