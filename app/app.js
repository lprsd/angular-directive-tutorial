var app = angular.module('demo', [])

app.directive('highlighton', function (){
    return function(scope, element, attrs){
        element.bind("mouseenter", function(){
            element.addClass("jumbotron");
        })
    }
})
app.directive('highlightoff', function (){
    return function(scope, element, attrs){
        element.bind("mouseleave", function(){
            element.removeClass('jumbotron');
        })
    }
})
