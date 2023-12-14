/* eslint-disable react/prop-types */
import ButtonComp from "./buttons/ButtonComp";

export default function MainHeader({ title, addTitle, action }) {
  return (
    <div className="flex items-center justify-between m-5">
      <h2 className="w-full text-2xl font-bold ">{title}</h2>
      {addTitle && (
        <ButtonComp variant="contained" className="!w-[200px] ltr:!w-[200px] !mt-0" action={action}>
          {addTitle}
        </ButtonComp>
      )}
    </div>
  );
}
