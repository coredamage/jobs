import 'jquery-flot';
import './../../node_modules/jquery-flot/jquery.flot.time.js';
import './../vendors/flot-spline/js/jquery.flot.spline.js';

export class Graph {
  data1: any;
  data2: any;
  dataseries: dataSeries;

  constructor()
  {
    this.data1 = [
          [this.gd(2012, 1, 1), 17],
          [this.gd(2012, 1, 2), 74],
          [this.gd(2012, 1, 3), 6],
          [this.gd(2012, 1, 4), 39],
          [this.gd(2012, 1, 5), 20],
          [this.gd(2012, 1, 6), 85],
          [this.gd(2012, 1, 7), 7]
        ];

    this.data2 = [
          [this.gd(2012, 1, 1), 82],
          [this.gd(2012, 1, 2), 23],
          [this.gd(2012, 1, 3), 66],
          [this.gd(2012, 1, 4), 9],
          [this.gd(2012, 1, 5), 119],
          [this.gd(2012, 1, 6), 6],
          [this.gd(2012, 1, 7), 9]
        ];
    this.dataseries  = {
       data: [this.data1, this.data2]
    };
    //this.dataseries.data = [this.data1,this.data2];

  }

  attached() {
    $.plot($("#canvas_dahs"), this.dataseries.data, {
          series: {
            lines: {
              show: false,
              fill: true
            },
            splines: {
              show: true,
              tension: 0.4,
              lineWidth: 1,
              fill: 0.4
            },
            points: {
              radius: 0,
              show: true
            },
            shadowSize: 2
          },
          grid: {
            verticalLines: true,
            hoverable: true,
            clickable: true,
            tickColor: "#d5d5d5",
            borderWidth: 1,
            color: '#fff'
          },
          colors: ["rgba(38, 185, 154, 0.38)", "rgba(3, 88, 106, 0.38)"],
          xaxis: {
            tickColor: "rgba(51, 51, 51, 0.06)",
            mode: "time",
            tickSize: [1, "day"],
            axisLabel: "Date",
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Verdana, Arial',
            axisLabelPadding: 10
          },
          yaxis: {
            ticks: 8,
            tickColor: "rgba(51, 51, 51, 0.06)",
          },
          tooltip: false});
  }

  gd(year, month, day) {
    return new Date(year, month - 1, day).getTime();
  }




}



 
