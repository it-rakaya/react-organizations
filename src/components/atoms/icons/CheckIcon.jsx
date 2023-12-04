/* eslint-disable react/prop-types */

function CheckIcon({className}) {
  return (
    <div>
      <svg
      className={className}
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_3514_32885"
        //   style="mask-type:luminance"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="44"
          height="44"
        >
          <path
            d="M22 42C24.627 42.0034 27.2287 41.4876 29.6556 40.4823C32.0826 39.477 34.2869 38.002 36.142 36.142C38.002 34.2869 39.477 32.0826 40.4823 29.6556C41.4876 27.2287 42.0034 24.627 42 22C42.0034 19.3731 41.4876 16.7714 40.4823 14.3444C39.4769 11.9175 38.0019 9.71312 36.142 7.85802C34.2869 5.99804 32.0826 4.52302 29.6556 3.5177C27.2287 2.51239 24.627 1.99661 22 2.00002C19.3731 1.99667 16.7714 2.51247 14.3444 3.51778C11.9175 4.52309 9.71312 5.99809 7.85802 7.85802C5.99809 9.71312 4.52309 11.9175 3.51778 14.3444C2.51247 16.7714 1.99667 19.3731 2.00002 22C1.99661 24.627 2.51239 27.2287 3.5177 29.6556C4.52302 32.0826 5.99804 34.2869 7.85802 36.142C9.71312 38.0019 11.9175 39.4769 14.3444 40.4823C16.7714 41.4876 19.3731 42.0034 22 42Z"
            fill="white"
            stroke="white"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M14 22L20 28L32 16"
            stroke="black"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </mask>
        <g mask="url(#mask0_3514_32885)">
          <path d="M-2 -2H46V46H-2V-2Z" fill="#CAB272" />
        </g>
      </svg>
    </div>
  );
}

export default CheckIcon;
