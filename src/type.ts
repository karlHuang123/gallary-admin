export interface PagedResponse<T> {
  statusCode: number;
  msg: string;
  // 数据部分
  items: T[];
  total: number; // 总条数
  pageNum: number; // 页码 （从1开始）
  pageSize: number; // 一页几条
  pageTotal: number; // 一共几页
}

export interface Response<T> {
  statusCode: number;
  msg: string;
  // 数据部分
  data: T;
}
