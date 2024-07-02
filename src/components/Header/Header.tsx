import { useTaskStore } from '../../store/useTaskStore';
import { filterTypes } from '../../constants/constants';
import { FilterType } from '../../models';
import { StyledMenu, Wrapper } from './Header.styles';
import {
  FILTER_ALL_EN,
  FILTER_FAVORITE_EN,
  LOCAL_STORAGE_FOLDER,
} from '../../constants/texts';

function Header() {
  const { setFilter, fetchTasksByIds, fetchTasks } = useTaskStore();

  const handleClick = (e: { key: string }) => {
    const filter = e.key as FilterType;

    setFilter(filter);
    if (filter === FILTER_FAVORITE_EN) {
      const favoriteIds = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_FOLDER) || '[]'
      );
      fetchTasksByIds(favoriteIds);
    } else {
      const params =
        filter === FILTER_ALL_EN
          ? {}
          : { filters: { status: { $eq: filter } } };
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
        defaultSelectedKeys={[FILTER_ALL_EN]}
      />
    </Wrapper>
  );
}

export default Header;
