const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
                .then(()=>{
                    console.log("Mongo Connection Open");
                })
                .catch(err=>{
                    console.log("Mongo Error Occured");
                    console.log(err)
                })

// const p = new Product({
//     name : "Grapes",
//     price : 200,
//     category : 'fruit'
// });

// p.save().then(p=>{
//     console.log(p);
// })
// .catch(e=>{
//     console.log(e);
// })

const seedProducts = [
    {
        name : "Apple",
        price : 180,
        category : "fruit"
    },
    {
        name : "Potato",
        price : 30,
        category : "vegetable"
    },
    {
        name : "Onion",
        price : 20,
        category : "vegetable"
    },
    {
        name : "Milk",
        price : 45,
        category : "dairy"
    }
]

Product.insertMany(seedProducts).then(p=>{
    console.log(p);
})
.catch(e=>{
    console.log(e);
})


