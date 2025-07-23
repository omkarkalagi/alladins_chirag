import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Portfolio = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  
  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [{
            label: 'Portfolio Value (₹)',
            data: [850000, 920000, 980000, 1050000, 1100000, 1170000, 1254870],
            borderColor: '#405DE6',
            backgroundColor: 'rgba(64, 93, 230, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                callback: function(value) {
                  return '₹' + (value / 1000).toLocaleString() + 'K';
                }
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      });
    }
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title"><i className="fas fa-wallet"></i> Portfolio</div>
        <div className="since">Today</div>
      </div>
      <div className="card-body">
        <div className="chart-container">
          <canvas ref={chartRef} id="portfolioChart"></canvas>
        </div>
        
        <div className="portfolio-stats">
          <div className="stat-card">
            <h3>Total Value</h3>
            <div className="value">₹1,254,870</div>
          </div>
          <div className="stat-card">
            <h3>Today's Gain</h3>
            <div className="value positive">+₹24,650</div>
          </div>
          <div className="stat-card">
            <h3>Overall Return</h3>
            <div className="value positive">+18.45%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;