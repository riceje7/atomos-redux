$(document).ready(function(){
	
  $('').click(function(){
		
    var elem = $(this).closest('.item');
		
    $.confirm({
      'title'		: '',
      'message'	: '',
      'buttons'	: {
        'Yes'	: {
          'class'	: 'blue',
          'action': function(){
            elem.slideUp();
          }
        },
        'No'	: {
          'class'	: 'gray',
          'action': function(){}	// Nothing to do in this case. You can as well omit the action property.
        }
      }
    });
		
  });
	
});