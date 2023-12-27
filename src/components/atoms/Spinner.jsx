import { Rings } from "react-loader-spinner";

function Spinner() {
  return (
    <div>
      {/* <ThreeDots
        height="40"
        width="40"
        radius="10"
        color="#fff"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      /> */}
      <Rings
           height="30"
           width="30"
          color="#fff"
          ariaLabel="rings-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
    </div>
  );
}

export default Spinner;
