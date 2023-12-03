import { rankItem } from '@tanstack/match-sorter-utils';
import type { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import {
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { t } from 'i18next';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AllSession } from '../../../pages/allSessions';
import { Header } from '../../atoms/Header';
import { Loading } from '../Loading/Loading';
import DateRange from '../../molecules/DateRange/DateRange';
import Excel from '../../molecules/Excell/Excell';
import FilterTable from '../../molecules/FilterTable/FilterTable';
import Print from '../../molecules/Print/Print';
import SelectCompleteProfile from '../../molecules/Select/SelectCompleteProfile';
import SelectCountryFilter from '../../molecules/Select/SelectCountryFilter';
import SelectGenderFilter from '../../molecules/Select/SelectGenderFilter';
import SelectInterviewStatus from '../../molecules/Select/SelectInterviewStatus';
import SelectSpecialization from '../../molecules/Select/SelectSpecializationFilter';
import SelectStatus from '../../molecules/Select/SelectStatus';
import SelectStatusZoom from '../../molecules/Select/SelectStatusZoom';
import { AllStudents } from '../../templates/Student/AllStudents';

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<AllStudents>[];
  showNavigation?: boolean;
  showGlobalFilter?: boolean;
  filterFn?: FilterFn<T>;
  setStatus?: Dispatch<SetStateAction<string>>;
  setDateFilter?: Dispatch<SetStateAction<SetStateAction<string>>>;
  setSpecializationFilter?: Dispatch<SetStateAction<string>>;
  setProfileCompleteFilter?: Dispatch<SetStateAction<string>>;
  setStatusFilter?: Dispatch<SetStateAction<string>>;
  setStatusZoomFilter?: Dispatch<SetStateAction<string>>;
  setInterViewStatus?: Dispatch<SetStateAction<string>>;
  setCountry?: Dispatch<SetStateAction<string>>;
  isSuccess?: boolean;
  StatusStudent?: boolean;
  country?: boolean;
  setPagePagination: Dispatch<SetStateAction<number>>;
  isLoading?: boolean;
  isFetching?: boolean;
  Specialization?: boolean;
  type?: boolean;
  ProfileComplete?: boolean;
  Status?: boolean;
  StatusZoom?: boolean;
  interViewStatus?: boolean;
  setWord: Dispatch<SetStateAction<string>>;
  setTypeFilter?: Dispatch<SetStateAction<string>>;
  totalItemsData?: string;
}

export const Table = <T extends object>({
  data,
  columns,
  isSuccess,
  Status,
  interViewStatus,
  StatusZoom,
  StatusStudent,
  setStatusFilter,
  setSpecializationFilter,
  setProfileCompleteFilter,
  setStatusZoomFilter,
  setInterViewStatus,
  Specialization,
  totalItemsData,
  isLoading,
  ProfileComplete,
  setCountry,
  country,
  setPagePagination,
  setTypeFilter,
  type,
  setWord,
  isFetching,
  setStatus,
  setDateFilter,
  showNavigation,
}: ReactTableProps<T>) => {
  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({
      itemRank,
    });

    // Return if the item should be filtered in/out
    return itemRank.passed;
  };

  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [currentPageData, setCurrentPageData] = useState<T[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable(
    {
      data,
      columns,
      filterFns: {
        fuzzy: fuzzyFilter,
      },
      state: {
        globalFilter,
        sorting,
      },
      onSortingChange: setSorting,

      onColumnFiltersChange: setColumnFilters,
      onGlobalFilterChange: setGlobalFilter,
      globalFilterFn: fuzzyFilter,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),

      getPaginationRowModel: getPaginationRowModel(),
    },
    //@ts-ignore
    (hooks: { onPageChange: (({ rows }: { rows: any }) => void)[] }) => {
      hooks.onPageChange.push(({ rows }) => {
        setCurrentPageData(rows.map((row: { original: any }) => row.original));
      });
    }
  );

  useEffect(() => {
    setCurrentPageData(table.getRowModel().rows.map((row) => row.original));
  }, [table.getRowModel().rows]);
  useEffect(() => {}, [currentPageData]);
  const total = data.length;

  return (
    <>
      <div className='grid sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-2 sm:gap-y-4 md:gap-y-8 gap-y-8 mb-5'>
        {StatusStudent && (
          <div className='sm:col-span-1 md:col-span-2 lg:col-span-3 '>
            <FilterTable
              setStatus={setStatus}
              label={`${t('Choose the status')}`}
            />
          </div>
        )}
        {setDateFilter && (
          <div className='sm:col-span-1 md:col-span-2 lg:col-span-4 xl:col-span-3'>
            <DateRange setDateFilter={setDateFilter} />
          </div>
        )}

        {Specialization && (
          <div className='sm:col-span-1 md:col-span-2 lg:col-span-4 xl:col-span-3'>
            <SelectSpecialization setStatus={setSpecializationFilter} />
          </div>
        )}
        {type && (
          <div className='sm:col-span-1 md:col-span-2 xl:col-span-3'>
            <SelectGenderFilter
              setStatus={setTypeFilter}
              placeholder={`${t('choose type')}`}
            />
          </div>
        )}

        {StatusZoom && (
          <div className='sm:col-span-1 md:col-span-2 xl:col-span-3'>
            <SelectStatusZoom setStatus={setStatusZoomFilter} />
          </div>
        )}

        {Status && (
          <div className='sm:col-span-1 md:col-span-2 xl:col-span-2'>
            <SelectStatus setStatus={setStatusFilter} />
          </div>
        )}
        {interViewStatus && (
          <div className='sm:col-span-1 md:col-span-3 lg:col-span-3 xl:col-span-3'>
            <SelectInterviewStatus
              label={`${t('zoom status')}`}
              setStatus={setInterViewStatus}
              placeholder={`${t('zoom status')}`}
            />
          </div>
        )}
        {ProfileComplete && (
          <div className='sm:col-span-1 md:col-span-3 xl:col-span-4'>
            <SelectCompleteProfile setStatus={setProfileCompleteFilter} />
          </div>
        )}

        {country && (
          <div className='sm:col-span-1 md:col-span-2'>
            <SelectCountryFilter setStatus={setCountry} />
          </div>
        )}
      </div>

      <div className='flex flex-col gap-4 md:flex-row md:gap-0 justify-between my-2'>
        <div className='flex align-middle items-center gap-1'>
          <div className='flex flex-col align-middle items-center gap-1'>
            <input
              id='search'
              name='search'
              type='text'
              className='!rounded-md !shadow-none !border-1 border-style 
                  false css-1h06qz8-control dark:!bg-[#151521] dark:!text-white dark:!border-dark-borderDark'
              onChange={(e) => {
                setWord(e.target.value);
                // console.log(e.target.value)
              }}
              placeholder={`${t('search')}`}
            />
          </div>
        </div>

        <div className='flex sm-b:flex-col flex-row  sm:justify-between gap-4'>
          <div className='flex gap-2 items-center'>
            <Excel data={currentPageData} />
            <Print />
          </div>

          <div className='col-span-1 flex justify-end'>
            <div className='flex flex-col gap-1 w-max'>
              {/* <Label className='mb-3'>العدد</Label> */}
              <select
                className='!rounded-md mr-auto  px-8 !shadow-none  border-style
                     false css-1h06qz8-control w-full dark:!bg-[#151521] dark:text-white dark:!border-dark-borderDark !h-full dark:!border-[2px]'
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  const pageSize = Number(e.target.value);
                  table.setPageSize(pageSize);
                  setPagePagination(pageSize);
                }}
              >
                {[
                  { key: 10, value: 10 },
                  { key: 20, value: 20 },
                  { key: 50, value: 50 },
                  { key: 100, value: 100 },
                  { key: 1000, value: 1000 },
                  { key: 'الكل', value: totalItemsData },
                ].map((pageSize) => (
                  <option
                    key={pageSize.key}
                    value={pageSize.value}
                    className=' h-[10px]'
                  >
                    {pageSize.key}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className='GlobalTable w-full flex flex-col gap-4 mt-8 overflow-x-scroll'>
        {isLoading && <Loading />}
        {isFetching && <Loading />}

        <table id='print-table' className='min-w-full text-center'>
          <thead className='border-b bg-mainBlue dark:!bg-dark-tertiary'>
            {table?.getHeaderGroups()?.map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className='px-6 py-4 text-sm font-medium text-white dark:!bg-dark-tertiary'
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {isSuccess && !!data.length && (
            <tbody>
              {table?.getRowModel()?.rows?.map((row) => (
                <tr key={row.id} className='border-b bg-white'>
                  {row?.getVisibleCells()?.map((cell) => (
                    <td
                      className='whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900 td-col-dark'
                      key={cell.id}
                    >
                      {flexRender(
                        cell?.column?.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {isSuccess && !!!data?.length && !!!isLoading && !!!isFetching && (
          <div className='mb-5 pr-5'>
            <Header
              header={t('nothing')}
              className='text-center text-2xl font-bold dark:text-white'
            />
          </div>
        )}

        {/* <Loading/>
        } */}
        <div className='flex items-center gap-2 m-auto flex-col md:flex-row'>
          {/* <div className="pagination-table">
            <button
              className="border rounded-full p-1"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <MdKeyboardDoubleArrowRight className="!w-[25px] !h-[25px]" />
            </button>
            <button
              className=" rounded-full p-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <BsFillArrowRightCircleFill className="!w-[25px] !h-[25px] text-mainGreen" />
            </button>
            <button
              className=" rounded-full p-1"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <BsFillArrowLeftCircleFill className="!w-[25px] !h-[25px] text-mainGreen" />
            </button>
            <button
              className="border rounded-full p-1"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <MdKeyboardDoubleArrowLeft className="!w-[25px] !h-[25px]" />
            </button>
          </div>

          <div className="flex gap-1">
            <span className="flex items-center gap-1">
              <div>صفحة</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} من
                {table.getPageCount()}
              </strong>
            </span>
            <span className="flex items-center gap-1">
              الذهاب لصفحة:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  table.setPageIndex(page)
                }}
                className="border p-1 rounded w-16"
              />
            </span>
          </div> */}
        </div>
      </div>
    </>
  );
};
