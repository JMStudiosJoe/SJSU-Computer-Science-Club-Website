admissions@telegraphacademy.com

name: Oindril Dutta
email: duttaoindril@gmail.com
phone: (408)-658-8961

var myArray = [1, 2, 3, 4];

var myObj = {
    "name": "Oindril Dutta",
    "email": "duttaoindril@gmail.com",
    "phone": "(408)-658-8961"
}

function print(item) {
    console.log(item);
}

var each = function(collection, callback) {
    if (Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            callback(collection[i]);
        }
    } else {
        for (var key in collection) {
            callback(collection[key]);
        }
    }
};

/*
for (var key in myObj) {
    console.log(key);
}
//name
//email
//phone


Array.isArray(myArray); //true
Array.isArray(myObj); //false

each(myArray, print);
//1
//2
//3
//4

each(myObj, print);
//'Oindril Dutta'
//'duttaoindril@gmail.com'
//'(408)-658-8961'
*/

var map = function(collection, transformerFunc) {
    //your code here to make map work
    var newCollection;
    //each(collection, transformerFunc);
    return newCollection;
};

/*
map(myArray, function(item) {
    return item *2;
});
//[2,4,6,8]


map(myObj, function(item) {
    return item + 1;
});
//["Oindril Dutta1","duttaoindril@gmail.com1","(408)-658-89611"];

*/