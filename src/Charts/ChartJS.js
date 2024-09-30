import React, { useEffect } from 'react';
import Chart from 'chart.js/auto'; // Adjust the import based on your version of Chart.js
import axios from 'axios';

const ChartJS = () => {
  useEffect(() => {
    const ctx = document.getElementById('myChart').getContext('2d');

    const createChart = (dataSource) => {
      if (window.myPieChart) {
        window.myPieChart.destroy(); // Clear the previous chart if it exists
      }

      window.myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: dataSource.labels,
          datasets: [{
            label: 'Budget',
            data: dataSource.datasets[0].data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 205, 86, 1)'
            ],
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'My Budget',
            }
          }
        }
      });
    };

    const getBudget = () => {
      axios.get('http://localhost:3000/budget')
        .then((res) => {
          const dataSource = {
            datasets: [{
              data: res.data.myBudget.map(item => item.budget),
            }],
            labels: res.data.myBudget.map(item => item.title),
          };
          createChart(dataSource);
        })
        .catch((error) => {
          console.error('Error fetching budget data:', error);
        });
    };

    getBudget();

  }, []);

  return <canvas id="myChart" width="400" height="400"></canvas>;
};

export default ChartJS;
