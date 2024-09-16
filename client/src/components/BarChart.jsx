import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Container, Row, Col, Card } from 'react-bootstrap';

const BarChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/purchases')
      .then(response => response.json())
      .then(data => {
        const chartData = data.map(purchase => ({
          vender: purchase.vender,
          total: purchase.total,
        }));
        setData(chartData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const formatTooltipValue = (value) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <section id="vendor-spending" className="vendorspending">
    <div>
    <div className="chart-divider"></div>
      <h2>Vendor Spending</h2>
      <div className="bar-chart-wrapper">
      <BarChart
        width={1200}
        height={500}
        data={data}
        margin={{ top: 30, right: 30, bottom: 5, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="vender" />
        <YAxis />
        <Tooltip formatter={formatTooltipValue} />
        <Bar dataKey="total" fill="#f9d234" />
      </BarChart>
    </div>
    </div>
    </section>
  );
};

export default BarChartComponent;