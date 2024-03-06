import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input;


const SearchProduct=()=>{

    const suffix = (
        <AudioOutlined
          style={{
            fontSize: 16,
            color: '#1677ff',
          }}
        />
      );

return (

<>


<Search
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
    />



</>





);





}
export default SearchProduct