'use client';

import { Bar } from 'react-chartjs-2';
import Chart, { registerables, BarElement, CategoryScale, LinearScale } from 'chart.js/auto';

export default function ChartCom() {
    Chart.register(...registerables, BarElement, CategoryScale, LinearScale);

    const data = {
        labels : ['salmon', 'orange', 'green'],
        datasets : [
            {
                label : "차트",
                data : [40, 50, 25],
                backgroundColor : [
                    'rgba(250, 128, 114, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(89, 142, 255, 0.2)'
                ],
                borderColor : [
                    'rgb(250, 128, 114)',
                    'rgb(255, 159, 64)',
                    'rgb(89, 142, 255)'                    
                ],
                borderWidth : 1
            }
        ]
    }
    const options = {        
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
    return (
        <>
            <Bar data={data} options={options}></Bar>
        </>
    )
}