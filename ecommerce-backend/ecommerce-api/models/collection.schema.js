import mongoose from 'mongoose'
import COLLECTION_SCHEMA_UTILS from '../utils/collection.schema.utils';

const Schema = mongoose.Schema;

const collectionSchema = new Schema(
    {
        name:{
            type: String,
            required: [true,"Collection name is empty!"],
            maxLength:[COLLECTION_SCHEMA_UTILS.NAME_MAX_LENGTH,`Character length of name of your collection is more than the allowed maximum length i.e. ${COLLECTION_SCHEMA_UTILS.NAME_MAX_LENGTH} characters!`],
            unique:true,
            trim: true,
        }
    },{
        timestamps:true,
    }
);

module.exports = mongoose.model('collection', collectionSchema );