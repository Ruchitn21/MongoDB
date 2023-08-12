const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/personApp')
                .then(()=>{
                    console.log("MongoDB Connection Established");
                })
                .catch(()=>{
                    console.log("Error")
                });

const personSchema = new mongoose.Schema({
    first : String,
    last : String
})

personSchema.virtual("fullname").get(function() {
    return `${this.first} ${this.last}`
})

const Person = mongoose.model("person",personSchema);

const p1= new Person({
    first : "Ruchit",
    last : "Nigam"
})

p1.save().then((data)=>{
    console.log(data);
})
.catch(err=>{
    console.log("Error")
})

console.log(p1.fullname);
