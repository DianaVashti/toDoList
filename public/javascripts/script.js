$(document).ready( function() {
  $(document).on('click', '.name', function (){
    var todoID = $(this).attr('id')
    var name = $('#'+todoID).text();
    $('#'+todoID).html('');
    $('<input></input>')
      .attr({
        'type' : 'text',
        'class' : 'focus',
        // 'name' : 'fname',
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
    var name = $('#'+focusID).val();
    $.ajax({
      type:'post',
      url: 'edit/name/?name=' + name +'&id=' + DB_ID,
      success: function(){
        $('.focus '+stringID).text(name);
      }
    });
  });

  $(document).on('click', '.description', function (){
    var todoID = $(this).attr('id')
    var desc = $('#'+todoID).text();
    $('#'+todoID).html('');
    $('<input></input>')
      .attr({
        'type' : 'text',
        'class' : 'focusD',
        // 'name' : 'fdesc',
        'id' : 'input'+todoID,
        'size' : '100',
        'value' : desc
      })
      .appendTo('#'+todoID);
    $('#input'+todoID).focus();
  });

  $(document).on('blur', '.focusD', function() {
    var focusID = $(this).attr('id')
    var stringID = '#'+focusID
    var DB_ID = stringID.replace(/\D/g,'')
    var desc = $('#'+focusID).val()
    $.ajax({
      type:'post',
      url: 'edit/desc/?desc=' + desc +'&id=' + DB_ID,
      success: function(){
        $('.focusD '+stringID).text(desc);
      }
    })

  });
});
