// Override Safari, Chrome and IE11 decision to ignore autocomplete: off
// on form you wish to skip autocomplete, change all password fields to type=private
// requires jQuery

$(function() {
    $('input[type="private"]').focus(function(e){
      $(this).prop('type', 'password');
    });
    $('input[type="private"]').parents('form').submit(function(){
      $(this).find('input[type="password"]').hide().prop('type', 'private');
    });
  });