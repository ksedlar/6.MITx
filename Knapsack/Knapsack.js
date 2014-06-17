function moveElement($elem, amount, axis){
    //finds the initial location of the element
    var startpoint = $elem.position()[axis];
    //computes the point the element will end at
    var endpoint = startpoint + amount;
    //This is basically a fancy way of saying animate(axis: endpoint + "px") in a syntactically correct way
    var css = {};
    css[axis] = endpoint + "px";
    $elem.animate(css);
    
};

function switchLocation(obj){
    // if  (obj.parent == $('#house'))
    console.log(obj);
    console.log(obj.parent());
    console.log($('#house'));
    console.log(obj.parent().attr('id'));
    if (obj.parent().attr('id') == 'house'){
        console.log("yay1111");
        obj.detach();
        $('#sack').append(obj);
    }
    else if (obj.parent().attr('id') == 'sack'){
        console.log("yay1111");
        obj.detach();
        $('#house').append(obj);
    }
    /*
    if (){
        
        obj.attr(place) = "sack";
    }
    else if (obj.attr(place) == "sack"){
        obj.attr(place) = "house";
        moveElement(obj, -325, "left");
    }
    */
};


$(function(){
//    var $items = $('#location *');
    var items = [];
    items = $('.item');
    for (var i = 0; i < items.length; i++){      
        var text = ("$" + $(items[i]).data('value') + ", " + $(items[i]).data('weight') + "kg");
        $(items[i]).append($('<img src=' + $(items[i]).data('name') + '.png>'));
        $(items[i]).append($('<div>' + text +'</div>'));
        console.log(items[i]);
    }
    
    
    $('.item').click(function() {
        console.log("blah");
    
        switchLocation($(this));
    });
});

