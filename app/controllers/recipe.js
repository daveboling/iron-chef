'use strict';


var Recipe = require('../models/recipe');


exports.index = function(req, res){
  Recipe.findAll(function(recipes){
    res.render('recipes/index', {recipes: recipes});
  });
};


exports.create = function(req, res){
  var recipe = new Recipe(req.body);
  Recipe.create(recipe, function(err, recipe){
    //This is referred to as a partial
    res.render('recipes/recipe', {recipe: recipe});
  });
};

exports.del = function(req, res){
  Recipe.remove(req.params.id, function(){
    res.send({id: req.params.id});
  });
};
