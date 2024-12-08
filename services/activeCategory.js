const Category = require("../models/Category");
const Product = require("../models/Product");

const getActiveCategories  = async () => {


    try {

        const categories = await Category.find();
        
        // const activeCategoriesWithProducts = [];

        // for (const category of categories) {
        //     const hasProducts = await Product.exists({ category: category._id, isActive: true });
        //     if (hasProducts) {
        //         activeCategoriesWithProducts.push(category);
        //     }
        // }
        
        // console.log(activeCategoriesWithProducts);
        

        return  await categories ;
    } catch (error) {
        console.error('Error fetching categories with products:', error);
        return error
      
    }   




}

module.exports ={getActiveCategories} 