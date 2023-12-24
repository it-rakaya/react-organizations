/* eslint-disable react/prop-types */
import ButtonComp from "./buttons/ButtonComp";

export default function MainHeader({ title, addTitle, action , classNameButton , styleHead }) {
  return (
    <div className="flex items-center justify-between m-5">
      <h2 className="w-full text-2xl font-bold " style={styleHead}>{title}</h2>
      {addTitle && (
        <ButtonComp variant="contained"
        
        
        className={classNameButton`!w-[200px] ltr:!w-[200px] !mt-0`} action={action}>
          {addTitle}
        </ButtonComp>
      )}
    </div>
  );
}
