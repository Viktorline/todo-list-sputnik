import { Menu } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.header`
  padding: 0;
`;

const StyledMenu = styled(Menu as React.ComponentType<any>)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  background-color: #f8f8f8;
  user-select: none;

  .ant-menu-item {
    color: #747474;
    &:hover {
      color: #1890ff;
    }
  }

  .ant-menu-item-active {
    color: #8caee0 !important;
    &::after {
      border-bottom: 2px solid #8caee0 !important;
    }
  }

  .ant-menu-item-selected {
    color: #5c89ce !important;
    &::after {
      border-bottom: 2px solid #5c89ce !important;
    }
  }
`;

export { Wrapper, StyledMenu };
