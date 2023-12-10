/* eslint-disable react/prop-types */
import ButtonComp from "./buttons/ButtonComp";

export default function MainHeader({ title, addTitle, action }) {
  return (
    <div className="flex justify-between m-5">
      <h2 className="text-2xl font-bold">{title}</h2>
      {addTitle && (
        <ButtonComp variant="contained" className="w-auto" action={action}>
          {addTitle}
        </ButtonComp>
      )}
    </div>
  );
}
