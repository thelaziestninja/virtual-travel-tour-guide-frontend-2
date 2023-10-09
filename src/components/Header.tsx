import React from 'react';
import { Button, Layout } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import SearchBar from './SearchBar';
import { Destination } from '../utils/types';

const { Header } = Layout;

type AppHeaderProps = {
  destinations: Destination[];
  onHomeClick: () => void;
  onSearch: (value: string) => void;
  query: string;
};

const AppHeader: React.FC<AppHeaderProps> = ({ destinations,onHomeClick, onSearch, query }) => {
  const navigateHome = () => {
    onHomeClick();
  };

  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: 'none',
        background: 'transparent',
        padding: '0 50px',
      }}
    >
      <div style={{ flex: 'none' }}>
        <Button type="primary" icon={<HomeOutlined />} onClick={navigateHome}>
          Home
        </Button>
      </div>
      <div style={{ flex: 'none' }}>
        <SearchBar destinations={destinations} onSearch={onSearch} value={query} />
      </div>
    </Header>
  );
};

export default AppHeader;