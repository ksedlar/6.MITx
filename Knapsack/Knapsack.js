function switchLocation(){
        
};

$(function(){
//    var $items = $('#location *');
    var items = [];
    items = $('.item');
    for (i = 0; i < items.length; i++){      
        var text = ("$" + $(items[i]).data('value') + ", " + $(items[i]).data('weight') + "kg");
        $(items[i]).append($('<img src=' + $(items[i]).data('name') + '.png>'));
        $(items[i]).append($('<div>' + text +'</div>'));
    }
});

