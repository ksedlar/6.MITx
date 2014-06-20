var KNAPSACK_CAPACITY = 20;
var NUM_ITEMS = 9;
var maxScore;

//function calculateMaxScore(itemNums, totalWeight, totalValue, highscore){
//    for (var i = 0; i < itemNums.length; i++){
//        var item = itemNums[i];
//        console.log(item);
//        if (totalWeight+item[1] <= KNAPSACK_CAPACITY){
//            totalValue += item[0];
//            if (totalValue > highscore) highscore = totalValue;
//            if (itemNums.length == 0) return highscore;
//            return calculateMaxScore(itemNums.slice(i + 1), totalWeight, totalValue, highscore);
//        }
//    }
//    return highscore;
//}


function formatText (display){
    return ("$" + display.data('value') + ", " + display.data('weight') + "kg");
}

function randomGen(least, greatest){
    return Math.floor((Math.random() * (greatest-least)) + least);
}

function updateStatus (value, weight){
    var sack = $('#knapsackStatus');
    var v = 'value';
    var w = 'weight';
    //update the sack's attributes
    sack.data(v, value);
    sack.data(w, weight);
    //updates the text above sack display to show its new value and weight
    sack.text(formatText(sack));
    //if the sack's value is greater than the previous high score, update the highscore
    var hi = $('#highscore');
    if (sack.data(v) > hi.data(v)){
        hi.data(v, sack.data(v));
        hi.text("High score: $" + hi.data(v));
//        if (hi.data(v) >= maxScore){
//            showAlert("You got the max knapsack value!")
//        }
    }
}

function showAlert (text){
   //only generate an alert if there isn't already an alert animation playing
    if (!($('.alert').is(':animated'))){
        //add alert warning
        $('body').append('<div class="alert">'+ text + '</div>');
        console.log($('#alert').width());
        // cause the warning to fade over the course of 3 seconds
        $('.alert').animate({opacity:0}, {duration: 3000, complete: function() {$('#alert').detach()}});
    }
}


function switchLocation(obj){
    var v = 'value';
    var w = 'weight';
    var sack = $('#knapsackStatus'); 
    if (obj.parent().attr('id') == 'house'){
        var place = $('#sack');
        var multiplier = 1;
        if (sack.data(w) + obj.data(w) > KNAPSACK_CAPACITY) {
            showAlert("Oops! Knapsack capacity exceeded!");
//            showAlert(maxScore);
            return;
        }
    }
    if (obj.parent().attr('id') == 'sack'){
        var place = $('#house');
        var multiplier = -1;

    }
    obj.detach();
    place.append(obj);
    updateStatus(sack.data(v) + multiplier*obj.data(v), sack.data(w) + multiplier*obj.data(w));
}




//function switchLocation(obj, place, m){
////        var KNAPSACK_CAPACITY = 20;
//        var v = 'value';
//        var w = 'weight';
//        var sack = $('#knapsackStatus');
//        //only allows transfer if the knapsack capacity isn't exceeded
//        if (place.attr('id') == ('sack') && sack.data(w) + obj.data(w) > KNAPSACK_CAPACITY){
//                showAlert("Oops! Knapsack capacity exceeded!");
//            
//        }
//        else {
//            //remove item and add it to the to the other location
//            obj.detach();
//            place.append(obj);
//    
//            updateStatus(sack.data(v) + m*obj.data(v), sack.data(w) + m*obj.data(w));
//        }
//};

function load(random){
    $('.location').empty();
    var items = 
        ['<div class="item" data-value="85" data-weight="12" data-name="bear"></div>', 
        '<div class="item" data-value="180" data-weight="20" data-name="bike"></div>',
        '<div class="item" data-value="10" data-weight="3" data-name="book"></div>',
        '<div class="item" data-value="4" data-weight="1" data-name="candy"></div>',
        '<div class="item" data-value="125" data-weight="14" data-name="dollhouse"></div>',
        '<div class="item" data-value="25" data-weight="4" data-name="game"></div>',
        '<div class="item" data-value="70" data-weight="6" data-name="helicopter"></div>',
        '<div class="item" data-value="40" data-weight="5" data-name="legos"></div>',
        '<div class="item" data-value="100" data-weight="4" data-name="videogame"></div>'
    ]
    // iterate through each item div, and add the corresponding image and text to it

    var itemNums = [[], [], [], [], [], [], [], [], []];
    for (var i = 0; i < items.length; i++){
        var x = $(items[i]);
        if (random){
            var ranWeight = randomGen(1, 20);
            var ranVal = 0;
            while (ranVal <= 0){
                var ran = randomGen(-20, 25) + randomGen(-20, 25) + randomGen(-20, 25);
                ranVal = 7*ranWeight + ran;
            }
            x.data('weight', ranWeight);
            x.data('value', ranVal);
            var v = 'value';
            $('#highscore').data(v, 0);
            $('#highscore').text("High score: $" + $('#highscore').data(v));

        }
        $('#house').append(x);

        x.append($('<img src=' + x.data('name') + '.png>'));
        x.append($('<div>' + formatText(x) +'</div>'));
        itemNums[i][0] = x.data('value');
        console.log(itemNums[i][0]);
        itemNums[i][1] = x.data('weight');
    }   
    console.log(itemNums[0]);
    console.log(itemNums);
    console.log(itemNums.length);
//    maxScore = calculateMaxScore(itemNums, 0, 0, 0);
//    console.log(maxScore);
    // displays the initial value and weight of the sack (0)
    updateStatus(0, 0);
    
    // call the switchLocation function if the user clicks on an item
    $('.item').click(function() {
        obj = $(this)
        switchLocation(obj);

        });
}

//interface.events(){
//    
//}


$(function(){ 
    load(false);    
    $('#restart').click(function() {
        load(false);
    });
    $('#randomize').click(function() {
        load(true);
    });


});

