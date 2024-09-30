import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const ChartD3 = () => {
  const chartRef = useRef(null);

  const drawChart = (data) => {
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    d3.select(chartRef.current).selectAll("*").remove(); // Clear previous chart

    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value(d => d.budget);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const arcs = svg.selectAll("arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

    arcs.append("path")
      .attr("d", arc)
      .style("fill", (d) => color(d.data.title));

    arcs.append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("dy", ".35em")
      .text((d) => d.data.title);
  };

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/budget');
        drawChart(response.data.myBudget);
      } catch (error) {
        console.error('Error fetching budget data:', error);
      }
    };

    fetchBudgetData();
  }, []);

  return <div ref={chartRef}></div>;
};

export default ChartD3;
