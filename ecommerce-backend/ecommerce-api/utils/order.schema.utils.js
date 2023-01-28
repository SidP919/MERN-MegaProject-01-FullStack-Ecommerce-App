import PRODUCT_SCHEMA_UTILS from "./product.schema.utils";
import COUPON_SCHEMA_UTILS from "./coupon.schema.utils";

const ORDER_SCHEMA_UTILS = Object.freeze({
    COUNT_MAX_LIMIT:10,
    PRICE_MIN_LIMIT: function(){
        return this.COUNT_MAX_LIMIT * PRODUCT_SCHEMA_UTILS.PRICE_MIN_VALUE;    
    },
    PRICE_MAX_LIMIT: function(){
        return this.COUNT_MAX_LIMIT * PRODUCT_SCHEMA_UTILS.PRICE_MAX_VALUE;    
    },
    DELIVERY_MIN_FEE:50,
    DELIVERY_MAX_FEE:1000,
    ADDRESS_MIN_LENGTH:20,
    ADDRESS_MAX_LENGTH:100,
    AMT_MIN_LIMIT: function(){
        return  this.PRICE_MIN_LIMIT() + 
                this.DELIVERY_MIN_FEE - 
                ((COUPON_SCHEMA_UTILS.DISCOUNT_MAX_LIMIT/100)*this.PRICE_MIN_LIMIT)
    },
    AMT_MAX_LIMIT: function(){
        return  this.PRICE_MAX_LIMIT() + this.DELIVERY_MAX_FEE
    },
    STATUS:{
        ORDERED:'ORDERED',
        CONFIRMED:'CONFIRMED',
        PACKED:'PACKED',
        SHIPPED:'SHIPPED',
        OUT_FOR_DELIVERY:'OUT-FOR-DELIVERY',
        DELIVERED:'DELIVERED',
        CANCELLED:'CANCELLED',
    },
    PAYMENT_METHOD:{
        COD:'CASH-ON-DELIVERY',
        // UPI:'UPI',
        // CC:'CREDIT-CARD',
        // DC:'DEBIT-CARD'
    }
})

export default ORDER_SCHEMA_UTILS;