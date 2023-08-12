const express= require("express")
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Product = require("./models/product")

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
                .then(()=>{
                    console.log("Mongo Connection Open");
                })
                .catch(err=>{
                    console.log("Mongo Error Occured");
                    console.log(err)
                })

const app = express();

app.set('views',path.join(__dirname,'views'));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));

app.get("/products",async (req,res)=>{
    const products = await Product.find({});
    console.log(products);
    res.render("products/index",{products})
})

const categories = ["fruit","vegetable","dairy"];

app.get("/products/new",(req,res)=>{
    res.render("products/new",{categories})
})

app.post("/products", async (req,res)=>{
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
    // console.log(req.body)
    // res.send("Making your product")
})

app.get("/products/:id/edit",async (req,res)=>{
    const { id } = req.params
    const editProduct = await Product.findById(id)
    res.render("products/edit",{editProduct})
})

app.put("/products/:id",async (req,res)=>{
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id,req.body,{runValidators:true})
    // console.log(updatedProduct)
    res.redirect(`/products/${updatedProduct._id}`)
    // console.log(req.body)
    // res.send("PUT Request Recieved")
})

app.get("/products/:id",async (req,res)=>{
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    console.log(foundProduct);
    res.render("products/details",{foundProduct})

})


app.listen(3000,()=>{
    console.log("Server started at port 3000")
})
