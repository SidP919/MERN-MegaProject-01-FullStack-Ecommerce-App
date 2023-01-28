import mongoose from 'mongoose'
import ORDER_SCHEMA_UTILS from './../utils/order.schema.utils'

const orderSchema = mongoose.Schema(
    {
        products:{
            type:[
                {
                    productId:{
                        type:mongoose.Schema.Types.ObjectId,
                        ref:'product',
                        required:true
                    },
                    count:{
                        type: Number,
                        max:[ORDER_SCHEMA_UTILS.COUNT_MAX_LIMIT, `Customer cannot order more than ${ORDER_SCHEMA_UTILS.COUNT_MAX_LIMIT} products in one order!`],
                        required:true,
                    },
                    price:{
                        type: Number,
                        min:[ORDER_SCHEMA_UTILS.PRICE_MIN_LIMIT(), `Customer order price cannot be less than ${ORDER_SCHEMA_UTILS.PRICE_MIN_LIMIT()} rupees!`],
                        max:[ORDER_SCHEMA_UTILS.PRICE_MAX_LIMIT(), `Customer order price cannot be more than ${ORDER_SCHEMA_UTILS.PRICE_MAX_LIMIT()} rupees!`],
                        required:true,
                    },
                }
            ],
            required:true,
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user',
            required:true
        },
        address:{
            type:String,
            required:[true, "Customer Address cannot be empty!"],
            minLength:[ORDER_SCHEMA_UTILS.ADDRESS_MIN_LENGTH,`Address cannot be less than ${ORDER_SCHEMA_UTILS.ADDRESS_MIN_LENGTH} characters in length!`],
            maxLength:[ORDER_SCHEMA_UTILS.ADDRESS_MAX_LENGTH,`Address cannot be less than ${ORDER_SCHEMA_UTILS.ADDRESS_MAX_LENGTH} characters in length!`]
        },
        contactNo:{
            type:Number,
            required:[true,"Customer contact number cannot be empty!"],
            minLength:[10,"Customer phone number is invalid!"],
            maxLength:[16,"Customer phone number is invalid!"],
        },
        coupon:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'coupon',
            default:null
        },
        deliveryFee:{
            type:Number,
            min:[ORDER_SCHEMA_UTILS.DELIVERY_MIN_FEE, `Delivery Fee cannot be less than ${ORDER_SCHEMA_UTILS.DELIVERY_MIN_FEE} rupees!`],
            max:[ORDER_SCHEMA_UTILS.DELIVERY_MAX_FEE, `Delivery Fee cannot be more than ${ORDER_SCHEMA_UTILS.DELIVERY_MAX_FEE} rupees!`],
            default:50,
        },
        amount:{
            type: Number,
            min:[ORDER_SCHEMA_UTILS.AMT_MIN_LIMIT(), `Customer order total amount cannot be less than ${ORDER_SCHEMA_UTILS.AMT_MIN_LIMIT()} rupees!`],
            max:[ORDER_SCHEMA_UTILS.AMT_MAX_LIMIT(), `Customer order total amount cannot be more than ${ORDER_SCHEMA_UTILS.AMT_MAX_LIMIT()} rupees!`],
            required:true,
        },
        transactionId:{
            type:String,
        },
        paymentMethod:{
            type:String,
            enum:Object.values(ORDER_SCHEMA_UTILS.PAYMENT_METHOD),
            default:ORDER_SCHEMA_UTILS.PAYMENT_METHOD.COD,
        },
        status:{
            type:String,
            enum:Object.values(ORDER_SCHEMA_UTILS.STATUS),
            default:ORDER_SCHEMA_UTILS.STATUS.ORDERED,
        },
    },
    {
        timestamps:true,
    }
);

export default mongoose.model("order",orderSchema);