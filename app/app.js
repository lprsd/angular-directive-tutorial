var app = angular.module('demo', [])

app.directive('chart', function (){
    return {
        restrict: 'E',
        template: "<div>charts go here</div>"
    }
})

app.directive('mydirective', function(){
    return {
        restrict:'A',
        template: "My first directive",
        link: function(scope, element, attrs){
            element.bind('mouseenter',function(){
                alert("I'm working!");
            });
        },
    }
})

app.directive('highlighton', function(){
    return {
        link:    function(scope, element, atts)
        {
            element.bind('mouseenter',function(){
                element.addClass('jumbotron');
            });
        }
//        template:"Highlight On"
    }
})

app.directive('highlightoff', function(){
    return {
        link:    function(scope, element, atts)
        {
            element.bind('mouseleave',function(){
                element.removeClass('jumbotron');
            });
        },
        template:"<div>Highlight Off    <div ng-transclude></div></div>",
        transclude: true
    }
})

app.directive('formatting', function(){
    return {
        scope: {
            addbreak: function(element, attrs){

            },

            makeitalic: function(elemnt, attrs){

            }
        }
    }
})

app.directive('italicize', function(){
    return{
        required: 'formatting',
        link: function(scope, element, attrs){

        }
    }
})

app.directive('model', function(){
    return {

    }
})