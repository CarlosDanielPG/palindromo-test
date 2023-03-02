import Product from "../database/schemas/Product"
import { validTypesSearch } from "../utils/constants"

const list = async (params) => {
    const perPage = params?.per_page ?? 10
    const page = params?.page ?? 1
    const search = params?.search
    const type = params?.type
    if (search && type && search.length > 3 && validTypesSearch.includes(type)) {
        if (type === 'id') {
            const product = await Product.findOne({ id: search })
            return product ? { total: 1, data: [product], last_page: 1 } : { total: 0, data: [], last_page: 0 }
        } else {
            const palindrome = search === search.split("").reverse().join("")
            const count = await Product.where({ [type]: { $regex: new RegExp(search) }}).count()
            let products = await Product.where({ [type]: { $regex: new RegExp(search) }})
                                .skip(perPage * page)
                                .limit(perPage)
            products = products.map((product) =>  ({
                ...product._doc,
                original_price: product.price,
                discount: palindrome ? product.price * 0.5 : 0,
                price: palindrome ? product.price * 0.5 : product.price
            }))
            return {
                total: count,
                data: products,
                last_page: Math.ceil(count / perPage)
            }
        }
    } else {
        const count = await Product.find().count()
        const products = await Product.find()
                            .limit(perPage)
                            .skip(perPage * page)
        return {
            total: count,
            data: products,
            last_page: Math.ceil(count / perPage)
        }
    }
}

export { list }