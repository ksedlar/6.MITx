var calculator = (function () {
    // make a patterned array of strings, then evaluate the result
    function calculate(text){      
        var pattern = /\d+|\+|\-|\*|\/|\(|\)/g;
        var tokens = text.match(pattern);
        try {
            var val = evaluate(tokens);
            if (tokens.length != 0){
                throw "ill-formed expression";
            }
            return String(val);
        }
        catch(err){
            return err;
        }
    }
    
    function setup(div){
        var input = $('<input></input>', {type: 'text', size: 50});
        var output = $('<div></div>');
        var button = $('<button>Calculate</button>');
        $(div).append(input,button,output);
        
        button.on('click', function (event) {
            output.text(calculate(input.val()));
        });
    }
//remove the first element of the array and convert it to a number
    function read_operand(tokens) {
        var num = tokens[0];
        tokens.shift();
        var parsedNum = parseInt(num);
        if (isNaN(parsedNum)) {
            throw "number expected";
        }
        else {
            return parsedNum;
        }
    }
// iterate through the array of strings, evaluating a group of three (a number, operator, and number) to combine them into a single number, then repeating as necessary
    function evaluate(tokens){
        if (tokens.length == 0){
            throw "missing operand";
        }
        else {
            var value = read_operand(tokens);
            while (tokens.length > 0){
                var operator = tokens[0];
                tokens.shift();
                if (operator != "+" && operator != "-" && operator != "*" && operator != "/"){
                    throw "unrecognized operator";
                }
                else if (tokens.length == 0){
                    throw "missing operand";
                }
                else {
                    var temp = read_operand(tokens);
                    value = eval(value + operator + temp);
                }
            }
            return value;
                    
        }
    }
    
    return {
        calculate: calculate,
        setup: setup,
        read_operand: read_operand,
        evaluation: evaluate
    };
})();
$(document).ready(function () {
    $('.calc').each(function () {
        calculator.setup(this);
    });
});