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


chartOptions = {
    chart: {
        plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
    },
    title: {
        text: 'Browser market shares at a specific website, 2010'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    formatter: function() {
                    return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
                }
            }
        }
    },
    series: [{
        type: 'pie',
        name: 'Browser share'
    }]
}

app.directive('chart',function(){
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            chartData: "=chartId"
        },
        transclude:true,
        replace: true,

        link: function (scope, element, attrs) {
            var chartsDefaults = {
                chart: {
                    renderTo: element[0],
                    type: attrs.type || null,
                    height: attrs.height,
                    width: attrs.width
                },
                colors: [attrs.color]
            };
            var chart;
            //Update when charts data changes
            scope.$watch(function() { return scope.chartData; }, function(value) {
                if(!value) return;
                var deepCopy = true;
                var newSettings = {};
                $.extend(deepCopy, newSettings, chartsDefaults, scope.chartData);
                if (!chart) {
                    chart = new Highcharts.Chart(newSettings);

                } else {
                    for (var i = 0; i < chart.series.length; i++) {
                        chart.series[i].setData(scope.chartData.series[i].data)
                    }
                }
            }, true);
        }
    };
})

function get_series_data(Data, api_data, cluster, data_field){
    var all_flights = api_data.res[cluster];
    var series_data = [];
    var yearcount = 0;
    for (var r_year in all_flights){
        var i= 0;
        for (var read_days in all_flights[r_year]){
            var this_series_data = Data.get_graph_series(all_flights[r_year][read_days], 'x', 'week', data_field);
            series_data.push({data: this_series_data,
                name: r_year+" "+read_days,
                color: colorsArray[i++],
                dashStyle: yearcount==0?'dash':'line',
                visible: read_days=='0 Reading Days'
            });
        }
        yearcount++;
    }
    return series_data;
}

var plot_data_for = function(Data, ChartOptions, $scope){

    cluster = $scope.chosen_option.flight_option.api_name;
    data_field = $scope.chosen_option.kpi_option.api_name;
    api_data =  $scope.r_api_data;

    series_data = get_series_data(Data, api_data, cluster, data_field);
    var chart_data = ChartOptions;
    chart_data.series = series_data;
    delete chart_data.yAxis.minTickInterval;
    $scope.ct_graph = angular.copy(chart_data);

    current_week = getWeekNumber(new Date());
//        var current_week = 12;
    var table_first_week = current_week-3
    var table_last_week = current_week+5
    $scope.table_relevant_weeks = _.range(table_first_week, table_last_week)


    var table_data = [];
    var j = 0
    for (var a_series in series_data){
        var i = series_data[a_series];
        if(j > 4){
            table_data.push(
                {name: i.name.slice(5, i.name.length), // Slicing the year from name,
                    value: i.data.slice(table_first_week-1,table_last_week)
                });
        }
        j++
    }
    $scope.table_data = table_data;
    console.log(chart_data)
};



app.controller('MainController', function($scope){
    var data= [
        ['Firefox',   45.0],
        ['IE',       26.8],
        {
            name: 'Chrome',
            y: 12.8,
            sliced: true,
            selected: true
        },
        ['Safari',    8.5],
        ['Opera',     6.2],
        ['Others',   0.7]
    ]

    var browser_chart = chartOptions
    browser_chart.series[0].data = data
    $scope.piechart = browser_chart
})

