import mongoose from "mongoose"

const Schema = mongoose.Schema

const productSchema = new Schema({
    id: { type: Number, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true }
})

const Product = mongoose.model("Product", productSchema, 'products')

export default Product