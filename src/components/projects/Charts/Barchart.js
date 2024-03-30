"use client"
// import api from '@/api';
import api from '@/api/workflow';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, Rectangle } from 'recharts';


const Barchart = () => {
    const data = [
        {
            name: 'Procurement',
            complete: 1025,
            incomplete: 580,
        },
        {
            name: 'HRMS',
            complete: 1145,
            incomplete: 745,
        },
        {
            name: 'App Kube',
            complete: 1243,
            incomplete: 708,
        },
        {
            name: 'EMS',
            complete: 1542,
            incomplete: 1580,
        },
        {
            name: 'Xformation',
            complete: 1243,
            incomplete: 708,
        },
        {
            name: 'SPM',
            complete: 1752,
            incomplete: 1580,
        },
    ];
    return (
        <>
            <ResponsiveContainer width="100%" height={500}>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="complete" fill="#FF85C0" barSize={35} activeBar={<Rectangle fill="#FF85C0" stroke="blue" barSize={10} />} />
                    <Bar dataKey="incomplete" fill="#B37FEB" barSize={35} activeBar={<Rectangle fill="#B37FEB" stroke="purple" barSize={20} />} />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
};

export default Barchart;