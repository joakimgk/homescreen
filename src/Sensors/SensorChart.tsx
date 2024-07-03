import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import { useData } from '../services/sensorService';
import { getStatus } from './Sensor';
import { Event } from "../../types/supabaseTypes";
import styled from 'styled-components';
import dayjs from 'dayjs';

const Container = styled.div`
  height: 100%;
  display: flex;
`;
export const SensorChart = ({ clientId }: { clientId: string }) => {
    const date48HoursAgo = dayjs().add(-2, 'day').format('YYYY-MM-DD');

    const { data: activity } = useData<Event[]>('event', 'client_id=eq.' + clientId
        + '&created_at=gte.' + date48HoursAgo
        + '&order=created_at.desc');

    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (chartRef.current && activity) {
            let dataPoints = activity.map(a => {
                const status = getStatus(a);
                return {
                    x: a.created_at,
                    y: +status.toString()
                };
            }) as Chart.ChartPoint[];
            if (dataPoints && dataPoints.length > 0) {
                const lastItem = {
                    ...dataPoints[0],
                    x: dayjs().format('YYYY-MM-DDTHH:mm:ss')
                };
                dataPoints = [lastItem, ...dataPoints];
            }

            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        datasets: [{
                            data: dataPoints,
                            steppedLine: 'after',
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 2
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [
                                {
                                    type: 'time',
                                    time: {
                                        unit: 'hour', // Adjust as necessary
                                        tooltipFormat: 'll HH:mm',
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Time',
                                    },
                                },
                            ],
                            yAxes: [
                                {
                                    ticks: {
                                        min: 0,
                                        max: 2,
                                        stepSize: 1,
                                        beginAtZero: true,
                                    },
                                },
                            ],
                        },
                        legend: {
                            display: false
                        }
                    },
                });
            }
        }
    }, [activity]);

    return (
        <Container>
            <canvas ref={chartRef} style={{ height: '100%', width: '100%' }} />
        </Container>
    );
};
