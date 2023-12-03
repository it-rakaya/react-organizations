import {  ThreeDots } from "react-loader-spinner";

function Spinner() {
  return (
    <div>
      <ThreeDots
        height="40"
        width="40"
        radius="10"
        color="#fff"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
}

export default Spinner;
