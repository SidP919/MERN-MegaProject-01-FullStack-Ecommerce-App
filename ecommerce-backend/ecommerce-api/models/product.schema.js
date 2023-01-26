import mongoose from "mongoose";
import PRODUCT_SCHEMA_UTILS from "../utils/product.schema.utils";

const productSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true,"Product name is empty!"],
            maxLength:[PRODUCT_SCHEMA_UTILS.NAME_MAX_LENGTH,`Character length of name of your product is more than the allowed maximum length i.e. ${PRODUCT_SCHEMA_UTILS.NAME_MAX_LENGTH} characters!`],
            minLength:[PRODUCT_SCHEMA_UTILS.NAME_MIN_LENGTH,`Character length of name of your product is less than the allowed minimum length i.e. ${PRODUCT_SCHEMA_UTILS.NAME_MIN_LENGTH} characters!`],
            unique:true,
            trim: true,
        },
        photos:[
            {
                secure_url:{
                    type:String,
                    required:true,
                }
            }
        ],
        description:{
            type: String,
            required: [true,"Product description is empty!"],
            maxLength:[PRODUCT_SCHEMA_UTILS.DESC_MAX_LENGTH,`Character length of description of your product is above the allowed maximum length i.e. ${PRODUCT_SCHEMA_UTILS.DESC_MAX_LENGTH} characters!`],
            trim: true,
        },
        stock:{
            type:Number,
            default:0
        },
        price:{
            type:Number,
            required:[true,"Product price is null!"],
            min:[PRODUCT_SCHEMA_UTILS.PRICE_MIN_VALUE,`Your Product Price is less than the allowed minimum price i.e. ${PRODUCT_SCHEMA_UTILS.PRICE_MIN_VALUE} rupees.`],
            max:[PRODUCT_SCHEMA_UTILS.PRICE_MAX_VALUE,`Your Product Price is more than the allowed maximum price i.e. ${PRODUCT_SCHEMA_UTILS.PRICE_MAX_VALUE} rupees.`],
            maxLength:[PRODUCT_SCHEMA_UTILS.PRICE_MAX_LENGTH,`Your Product Price has more than the allowed number of digits in it i.e. ${PRODUCT_SCHEMA_UTILS.PRICE_MAX_LENGTH} digits.`],
        },
        salesCount:{
            type: Number,
            default:0
        },
        collectionId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "collection"
        }
    },{
        timestamps:true,
    }
);

export default mongoose.model("product",productSchema);