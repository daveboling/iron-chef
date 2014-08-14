(function(){
  'use strict';

  $(document).ready(function(){
    //Working variables
    //-------------------------
    var $form = $('form');


    //Events
    //---------------------------------------------------------------------

    $('#recipes').on('click', '.x', delRecipe); //Delete recipe
    $('.filter').click(filterCategory); //Filter by category
    $('#recipes').on('click', '.ingredient', filterIngredient); //Filter by ingredient
    $('#hide').click(hideForm); //Hide form
    $('#show').click(showForm); //Show form
    $form.hide(); //Start form hidden
    $form.submit(addRecipe); //Hijacked submit button
  });






  //Private Functions
  //----------------------------------------------------
  //----------------------------------------------------



  //Show forms
  function hideForm(){
    $('form').hide(1000);
  }



  //Hide Forms
  function showForm(){
    $('form').show(1000);
  }



  //FILTER BY CATEGORY
  function filterCategory(e){
    var category = $(this).text();
    $('.category:contains(' + category + ')').closest('.recipe').show();
    $('.category:not(:contains(' + category + '))').closest('.recipe').hide();
    e.preventDefault();
  }



  //FILTER BY INGREDIENTS
  function filterIngredient(e){
    var ingredient = $(this).text();
    $('.ingredient').not(':contains(' + ingredient + ')').closest('.recipe').hide();
    $('.ingredient :contains(' + ingredient + ')').closest('.recipe').show();
    e.preventDefault();
  }



  //ADD RECIPE
  function addRecipe(e){
    var data = $('form').serialize(),
        type = $('form').attr('method'),
        url = $('form').attr('action');
    $('input, textarea').val('');
    $.ajax({
      url: url,
      type: type,
      data: data,
      dataType: 'html',
      success: function(html){
        var $recipe = $(html);
        $('#recipes').prepend($recipe);
        $recipe.hide().fadeIn(2000);
      }
    });
    e.preventDefault();
  }



  //DELETE RECIPE
  function delRecipe(){
    var id = $(this).closest('.recipe').attr('data-recipe-id'),
      url = '/recipes/' + id,
      type = 'delete';
    $.ajax({
      url: url,
      type: type,
      dataType: 'json',
      success: function(data){
        console.log(data);
        var $r = $('.recipe[data-recipe-id=' + id + ']');
        $r.remove(0);
      }
    });
  }



})();
