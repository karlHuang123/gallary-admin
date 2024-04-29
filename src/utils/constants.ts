import { PaginationProps } from 'antd';

export interface Result<T> {
  total: number;
  list: T[];
}

export const DEFAULT_PAGINATION: PaginationProps = {
  showTotal: (total) => `共 ${total} 条`,
  showSizeChanger: true,
  showQuickJumper: true,
  // pageSizeOptions: ['10', '20', '50', '100'],
  pageSizeOptions: ['3', '5', '8', '10'],
};
