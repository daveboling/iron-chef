'use strict';

var Mongo = require('mongodb');

function Recipe(o){
  this.name = (o.name === '') ? 'Chicken' : o.name;
  this.photo = (o.photo === '') ? 'http://seecolombia.travel/blog/wp-content/uploads/2013/02/chicken-bus-e1360602224633.jpeg' : o.photo;
  this.ingredients =  (o.ingredients.length) ? o.ingredients.split(',') : ['Stuff',' More stuff'];
  this.directions = (o.directions === '') ? 'Eat as is' : o.directions;
  this.date = new Date();
  this.category = o.category;
}

Object.defineProperty(Recipe, 'collection', {
  get: function(){
    return global.mongodb.collection('recipes');
  }
});


Recipe.findAll = function(cb){
  Recipe.collection.find().sort({date: -1}).toArray(function(err, recipes){
    cb(recipes);
  });
};

Recipe.create = function(recipe, cb){
  Recipe.collection.save(recipe, function(err, recipe){
    cb(err, recipe);
  });
};

Recipe.remove = function(query, cb){
  var id = Mongo.ObjectID(query);
  Recipe.collection.remove({_id: id}, cb);

};




module.exports = Recipe;
