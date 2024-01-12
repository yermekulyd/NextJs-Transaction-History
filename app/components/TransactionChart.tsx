import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type TransactionChartData = {
    labels: string[];
    datasets: {
        data: number[];
        backgroundColor: string[];
        borderColor: string[];
        borderWidth: number;
    }[];
};

type TransactionChartProps = {
    chartData: TransactionChartData;
};

const TransactionChart: React.FC<TransactionChartProps> = ({ chartData }) => {
    return <Doughnut data={chartData} />;
};

export default TransactionChart;
