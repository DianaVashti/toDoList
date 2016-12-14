$(document).ready( function() {
  $(document).on('click', '.name', function (){
    var todoID = $(this).attr('id')
    var name = $('#'+todoID).text();
    $('#'+todoID).html('');
    $('<input></input>')
      .attr({
        'type' : 'text',
        'class' : 'focus',
        'name' : 'fname',
        'id' : 'input'+todoID,
        'size' : '24',
        'value' : name
      })
      .appendTo('#'+todoID);
    $('#input'+todoID).focus();
  });

  $(document).on('blur', '.focus', function() {
    var focusID = $(this).attr('id')
    var stringID = '#'+focusID
    var DB_ID = stringID.replace(/\D/g,'');
    console.log('.focus '+stringID)
    console.log(DB_ID);
    var name = $('#'+focusID).val();
    $.ajax({
      type:'post',
      url: 'edit/name/?name=' + name +'&id=' + DB_ID,
      success: function(){
        $('.focus '+stringID).text(name);
      }
    });
  });
});
