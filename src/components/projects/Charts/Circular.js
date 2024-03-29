import { Progress, Space } from 'antd';
const CircularProgress = () => (
    <Space wrap>
      <Progress type="dashboard" percent={75} format={(percent) => '${percent}%'}
      strokeWidth={13} size={120}
      />
    </Space>
);
export default CircularProgress;