import mongoose from 'mongoose'
import COUPON_SCHEMA_UTILS from '../utils/coupon.schema.utils'

const couponSchema = mongoose.Schema(
    {
        code:{
            type:String,
            required:[true,`Coupon code cannot be empty!`],
            unique:[true, `Coupon with same code already exists!`],
            maxLength:[COUPON_SCHEMA_UTILS.CODE_MAX_LENGTH,`Character length of Code of your Coupon is more than the allowed maximum length of characters i.e. ${COUPON_SCHEMA_UTILS.CODE_MAX_LENGTH}`],
            minLength:[COUPON_SCHEMA_UTILS.CODE_MIN_LENGTH,`Character length of Code of your Coupon is less than the allowed minimum length of characters i.e. ${COUPON_SCHEMA_UTILS.CODE_MIN_LENGTH}`],
        },
        discount:{
            type:Number,
            default:1,
        },
        validity:{
            type:Date,
            default:new Date(COUPON_SCHEMA_UTILS.VALIDITY_MIN_TIMELIMIT),
            validate: {
                validator: function (value) {
                return (
                    value && // check that there is a date object
                    value.getTime() >= (COUPON_SCHEMA_UTILS.VALIDITY_MIN_TIMELIMIT - 10*1000) &&
                    value.getTime() <= COUPON_SCHEMA_UTILS.VALIDITY_MAX_TIMELIMIT
                );
                },
                message:"Code validity must be at least 1 hour and not more than 90 days.",
            }
        },
        active:{
            type:Boolean,
            default:true,
        }
    },
    {
        timestamps:true,
    }
);

export default mongoose.model("coupon",couponSchema);