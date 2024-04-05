import React, { useState, useEffect } from 'react';
import { Avatar, Card, Col, Row, Typography, Tooltip, Button, Divider, Flex, Radio } from 'antd';
import { AntDesignOutlined, UserOutlined, } from '@ant-design/icons';
import axios from 'axios';

import api from '@/api/workflow';

const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;
const getData = async () => {
    try {
        const response = await api.get('/projects_resource_overview');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
};

const Resources = () => {
    const [size, setSize] = useState('large');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/projects_resource_overview');
                console.log(response.data);
                setData(response.data);
                setFilteredData(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filterData = async () => {
            try {
                if (size === 'All Projects') {
                    const response = await api.get('/projects_resource_overview');
                    setFilteredData(response.data);
                } else {
                    const response = await api.get(`/projects_resource_overview?status=${size.toLowerCase()}`);
                    setFilteredData(response.data);
                }
            } catch (error) {
                console.error('Error fetching filtered data: ', error);
            }
        };

        filterData();
    }, [size]);

    return (
        <>
            <div style={{ background: '#FFF', padding: '20px' }}>
                <Row gutter={16}>
                    <div className="flex flex-row justify-between items-center w-full">
                        <Title level={2}>Project Resources Lists</Title>
                        <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
                            <Radio.Button value="All Projects">All</Radio.Button>
                            <Radio.Button value="In Progress">Inprogress</Radio.Button>
                            <Radio.Button value="Completed">Completed</Radio.Button>
                        </Radio.Group>
                    </div>
                </Row>
                <Row gutter={16} className='gap-6 mt-6'>

                    {filteredData.map((item, index) => (
                        <Col key={index} span={5} style={{ boxShadow: "0px 0px 5px 1px rgba(0 , 0, 0, 0.2)", borderRadius: '5px' }}>
                            <Card className='w-full flex justify-center'
                                bordered={false}
                                style={{
                                    boxShadow: 'none'
                                }}
                                

                            > <Title level={3}>{item.project_name}</Title>
                                <Meta
                                    avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                                    title={item.manager_name}
                                    description="Project Manager"
                                />
                                <Title level={5}>Current Task <span className=' ml-2'>{item.current_task}</span></Title>
                                <Paragraph>Created Date {item.due_date}12/09/2023</Paragraph>
                                <Paragraph>Due Date 12/09/2023</Paragraph>
                                <Paragraph>Total Task <strong>{item.total_tasks}</strong></Paragraph>
                                <Avatar.Group
                                    maxCount={4}
                                    size="large"
                                    maxStyle={{
                                        color: '#f56a00',
                                        backgroundColor: '#fde3cf',
                                    }}
                                >
                                    <Avatar src={item.project_resources} />
                                    <Tooltip title="Ant User" placement="top">
                                        <Avatar
                                            style={{
                                                backgroundColor: '#87d068',
                                            }}
                                            icon={<UserOutlined />}
                                        />
                                    </Tooltip>
                                   
                                </Avatar.Group>
                            </Card>
                        </Col>
                    ))}

                </Row>
            </div>,
        </>
    )
}

export default Resources
