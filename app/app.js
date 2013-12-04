var app = angular.module('demo', [])

app.directive('chart', function (){
    return {
        restrict: 'A',
        link: function(){
            alert("Hey! I'm from the directive");
        }
    }
})
app.directive('chart2', function (){
    return {
        restrict: 'A',
        link: function(){
            alert("Other chart directive2");
        }
    }
})