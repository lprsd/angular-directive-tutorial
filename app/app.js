var app = angular.module('demo', [])

app.directive('chart', function (){
    return {
        restrict: 'E',
        template: "<div>charts go here</div>"
    }
})