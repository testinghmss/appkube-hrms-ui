import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Typography, Button, Progress, Radio } from 'antd';
import axios from 'axios';
const { Title, Paragraph, Text } = Typography;
// import { InProgress, Completed, Unassigned } from '@/Components/projects/Badges/index';
import { InProgress, Completed, Unassigned } from '@/Components/projects/Badges/index';

import api from '@/api/workflow';

const getData = async () => {
    try {
        // const response = await axios.get('https://jp2malu3r8.execute-api.us-east-1.amazonaws.com/dev/projects_overview?');
        const response = await api.get('/projects_overview');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
};

const ProjectsList = () => {

    const [size, setSize] = useState('large');
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getData();
            setData(result);
        };
        fetchData();
    }, []);

    // Check Status and return badge according to the badge
    const checkStatus = (status) => {
        switch (status.toLowerCase()) {
            case 'inprogress':
                return <InProgress />;
            case 'completed':
                return <Completed />;
            case 'unassigned':
                return <Unassigned />;
            // Add more cases if needed
            default:
                return null; // Default case
        }
    };
    const filteredData = () => {

        if (!data || data.length === 0) {
            return [];
        }
        switch (size) {
            case 'In Progress':
                return data.filter((item) => item.status.toLowerCase() === 'inprogress');
            case 'Unassigned':
                return data.filter((item) => item.status.toLowerCase() === 'unassigned');
            case 'Completed':
                return data.filter((item) => item.status.toLowerCase() === 'completed');
            default:
                return data;
        }

    };

    return (
        <>
            <div style={{ background: '#FFF', padding: '25px' }}>

                <Row gutter={16}>
                    <div className="flex flex-row justify-between items-center w-full">
                        <Title level={2}>Project  Lists</Title>
                        <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
                            <Radio.Button value="All Projects">All</Radio.Button>
                            <Radio.Button value="In Progress">Inprogress</Radio.Button>
                            {/* <Radio.Button value="Unassigned">Un Assigned</Radio.Button> */}
                            <Radio.Button value="Completed">Completed</Radio.Button>
                        </Radio.Group>
                    </div>

                </Row>
                <Row gutter={16} className='gap-6 mt-4'>
                    {(filteredData() || []).map((item, index) => (
                        <Col
                            span={6}
                            key={index} // Add a unique key prop
                            style={{
                                boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, 0.2)",
                                borderRadius: "5px",
                            }}
                        >
                            <Card
                                className="w-full flex justify-center"
                                bordered={false}
                                style={{ boxShadow: "none" }}
                            >
                                <Title level={3} className="capitalize">
                                    {item.project_name}
                                </Title>
                                {checkStatus(item.status)}
                                <Title level={5}>Total Usecase {item.total_usecases}</Title>
                                <Paragraph>Due Date {item.due_date}</Paragraph>
                                <Progress
                                    type="circle"
                                    percent={item.completed_tasks_percentage}
                                    strokeWidth={16}
                                    strokeLinecap="square"
                                    strokeColor="#F8D236"
                                    trailColor="#F6EEFF"
                                />
                                <Title level={4} className="mt-2 mx-auto">
                                    Task Completed
                                </Title>
                            </Card>
                        </Col>
                    ))}
                    {!(filteredData() || []).length && <div>Loading...</div>}
                </Row>
            </div>
        </>
    )
};
export default ProjectsList;

