import React, { useRef, useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function AttendanceReportGraph({ graphData }) {
  const chart = useRef(null);

  useLayoutEffect(() => {
    let chart = am4core.create("chartdiv", am4charts.PieChart3D);

    chart.logo.disabled = true;

    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.padding(30, 30, 10, 30);

    chart.legend = new am4charts.Legend();

    chart.data = graphData;

    chart.innerRadius = 100;

    var series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "value";
    series.dataFields.category = "category";

    chart.current = chart;

    return () => {
      chart.dispose();
    };
  }, [graphData]);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
}

export default AttendanceReportGraph;
