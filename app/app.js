var app = angular.module('demo', [])

app.directive('chart', function (){
    return {
        restrict: 'A',
        template: "<div>charts go here</div>",
        link: function(){
            alert("Hey! I'm from the directive");
        }
    }
})