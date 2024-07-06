import { Pagination, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface PaginationTabProps {
  totalPages: number;
  page: number;
  pageSize: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  handleLimitChange: (event: SelectChangeEvent<number>) => void;
}
export default function PaginationTab({
  totalPages,
  page,
  pageSize,
  handlePageChange,
  handleLimitChange,
}: PaginationTabProps) {
  return (
    <>
      <div className='flex items-center justify-center mt-6'>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          variant='outlined'
          shape='rounded'
          color='primary'
          className='pagination-custom'
        />
      </div>
      <div className='flex items-center justify-center mt-4 space-x-4'>
        <label htmlFor='limit' className='mr-2 text-sm font-medium'>
          Elementos por página:
        </label>
        <Select
          id='limit'
          value={pageSize}
          onChange={handleLimitChange}
          variant='outlined'
          className='select-custom'
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={16}>16</MenuItem>
          <MenuItem value={32}>32</MenuItem>
        </Select>
      </div>
    </>
  );
}
