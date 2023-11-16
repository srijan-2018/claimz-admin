import React, { useRef, useLayoutEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function EmpGroupWiseDiversityReportGraph({graphData}) {
  const chart = useRef(null);

  useLayoutEffect(() => {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.paddingRight = 20;
    chart.logo.disabled = true;

    chart.data = graphData;

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "designation_name";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "COUNT(designation.designation_name)";
    series.dataFields.categoryX = "designation_name";
    series.clustered = false;
    series.columns.template.width = am4core.percent(50);
    series.tooltipText = "{categoryX} : [bold]{valueY}[/]";

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.disabled = true;
    chart.cursor.lineY.disabled = true;

    categoryAxis.renderer.grid.template.disabled = true;
    valueAxis.renderer.grid.template.disabled = true;

    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = -50;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 10;
    categoryAxis.renderer.labels.template.fontSize = 8;

    chart.current = chart;

    return () => {
      chart.dispose();
    };
  }, [graphData]);

  return (
    <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
  );
}
  

export default EmpGroupWiseDiversityReportGraph