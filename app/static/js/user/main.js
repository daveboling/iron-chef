'use strict';

$(document).ready(function(){
  var $form = $('form');
  $('.wrapper').on('click', '.x', delRecipe);
  $('.filter').click(filterCategory);
  $('.ingredient').on('click', filterIngredient);

  $form.hide();
  $form.submit(addRecipe);

  //Hide form
  $('#hide').click(function(){
    $('form').hide(1000);
  });


  //Show form
  $('#show').click(function(){
    $('form').show(1000);
  });


  //FILTER BY CATEGORY
  function filterCategory(e){
    var category = $(this).text();
    $('.category:contains(' + category + ')').closest('.recipe').fadeIn();
    $('.category:not(:contains(' + category + '))').closest('.recipe').fadeOut();

    e.preventDefault();
   }


  //FILTER BY INGREDIENTS
  function filterIngredient(e){
    var ingredient = $(this).text();
    $('.ingredient').not(':contains('+ingredient+')').closest('.recipe').hide();
    $('.ingredient :contains(' + ingredient +')').closest('.recipe').show();

    e.preventDefault();
   }


   //ADD RECIPE
   function addRecipe(e){
     var data = $form.serialize(),
     type = $form.attr('method'),
     url  = $form.attr('action');
     $('input, textarea').val('');

     $.ajax({url:url, type:type, data: data, dataType:'html', 
       success:function(html){
         var $recipe = $(html);
         $('.wrapper').append($recipe);
         $($recipe).hide().fadeIn(1000);
       }
     });
     e.preventDefault();
   }
   //DELETE RECIPE
   function delRecipe(){
      var id = $(this).closest('.recipe').attr('data-recipe-id'),
      url = '/recipes/' + id,
      type = 'delete';

      $.ajax({url:url, type:type, dataType:'json',
        success:function(data){
          console.log(data);
          var $r = $('.recipe[data-recipe-id=' + id + ']');
          $r.remove(0);
        }
      });
    }
});


