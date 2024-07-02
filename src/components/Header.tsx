import { Menu } from 'antd';
import { useTaskStore } from '../store/useTaskStore';
import { filterTypes } from '../content/constants';
import { FilterType } from '../store/types';
import { styled } from 'styled-components';

const Wrapper = styled.header`
  padding: 0;
`;

const StyledMenu = styled(Menu)`
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

function Header() {
  const { setFilter, fetchTasksByIds, fetchTasks } = useTaskStore();

  const handleClick = (e: { key: string }) => {
    const filter = e.key as FilterType;

    setFilter(filter);
    if (filter === 'favorite') {
      const favoriteIds = JSON.parse(
        localStorage.getItem('favoriteIds') || '[]'
      );
      fetchTasksByIds(favoriteIds);
    } else {
      const params =
        filter === 'all' ? {} : { filters: { status: { $eq: filter } } };
      fetchTasks(params);
    }
  };

  return (
    <Wrapper>
      <StyledMenu
        disabledOverflow
        onClick={handleClick}
        mode='horizontal'
        items={filterTypes.map((type) => ({
          ...type,
          tabIndex: 0,
        }))}
        defaultSelectedKeys={['all']}
      />
    </Wrapper>
  );
}

export default Header;
