var app = angular.module('demo', [])

app.directive('chart', function (){
    return function(scope, element, attrs){
        element.bind("mouseenter", function(){
            return alert("Mouse entered!");
        })
    }
})
app.directive('chart2', function (){
    return function(scope, element, attrs){
        element.bind("mouseleave", function(){
            return alert("Mouse left!");
        })
    }
})
