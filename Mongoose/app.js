const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/moviesApp')
                .then(()=>{
                    console.log("MongoDB Connection Established");
                })
                .catch(()=>{
                    console.log("Error")
                });

const movieSchema = new mongoose.Schema({
    title : String,
    year : Number,
    score : Number,
    rating : String,
    onWatch : {
        type : Boolean
    },
    categories : [String]
    
})

movieSchema.methods.greet = function() {
    console.log("Hello Hi There!!")
}

movieSchema.methods.toggleOnWatch = function() {
    this.onWatch = !this.onWatch
    return this.save();
}

movieSchema.methods.addCategory = function(newCat) {
    this.categories.push(newCat);
    return this.save();
}

const Movie = mongoose.model("Movie",movieSchema);

const findMovie = async()=> {
    const foundMovie = await Movie.findOne({title : "Amadeus"});
    console.log(foundMovie);
    await foundMovie.toggleOnWatch();
    await foundMovie.addCategory("OnlineAvail");
    // foundMovie.greet();
}

findMovie();

// const amadeus = new Movie({title:"Amadeus",year:2009,score:9.2,rating:"A"})

// amadeus.save().then(() => console.log('Amadeus Movie Saved in Database'));
