var app = angular.module('demo', [])

app.directive('enteralert', function (){
    return function(scope, element, attrs){
        element.bind("mouseenter", function(){
            return alert("Mouse entered!");
        })
    }
})
app.directive('leavealert', function (){
    return function(scope, element, attrs){
        element.bind("mouseleave", function(){
            return alert("Mouse left!");
        })
    }
})
