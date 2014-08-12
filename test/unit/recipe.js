/* global describe, it, before, beforeEach */
'use strict';

var expect = require('chai').expect,
    db = 'iron-test',
    dbConnect = require('../../app/lib/mongodb'),
    cp = require('child_process'),
    Recipe = require('../../app/models/recipe');



describe('Recipe', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new recipe', function(){
      var bbq = new Recipe({name: 'BBQ Chicken', photo: 'bbq.jpg', ingredients:['water', 'chicken', 'bbq'], directions:['cook', 'bake', 'eat']});
      expect(bbq.name).to.equal('BBQ Chicken');
      expect(bbq.photo).to.equal('bbq.jpg');
      expect(bbq.ingredients.length).to.equal(3);
      expect(bbq.directions.length).to.equal(3);
    });
  });


  describe('.findAll', function(){
    it('should display all recipes in the databse', function(done){
      Recipe.findAll(function(recipes){
        expect(recipes.length).to.equal(3);
        done();
      });
    });
  });








});
