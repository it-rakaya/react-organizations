/* eslint-disable react/prop-types */

import { LoadingButton } from '@mui/lab';
import { t } from 'i18next';

///
export const Loading = ({
  mainTitle,
  subTitle = t('loading').toString(),
}) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  /////////// FUNCTIONS | EVENTS | IF CASES
  ///

  ///
  return (
    <div className='z-auto m-auto my-28 flex h-full w-full items-center justify-center absolute z-50 top-[0px] left-0'>
      <div className='z-[1000] h-ful relative flex w-full max-w-sm  flex-col items-center justify-center rounded-lg border border-gray-100 bg-white p-6 shadow-md dark:!border-dark-borderDark dark:bg-gray-800 dark:hover:bg-gray-700'>
        <h5 className='mt-8 mb-2 text-2xl font-bold tracking-tight text-gray-900 opacity-50 dark:text-white'>
          {mainTitle}
        </h5>
        <p className='font-normal text-mainGreen dark:text-white'>{subTitle}</p>
        <div
          role='status'
          className='absolute -translate-x-1/2 -translate-y-1/2 top-1/4 left-1/2'
        >
          <LoadingButton size='large' variant='white' />
        </div>
      </div>
    </div>
  );
};
