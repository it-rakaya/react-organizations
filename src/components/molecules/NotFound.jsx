// eslint-disable-next-line react/prop-types, no-unused-vars
function DataNotFound({ title }) {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{ left: "calc(50% - 100px )", top: "calc(50% - 50px)" }}
    >
      <div className="mt-20 text-3xl font-bold md:m-0">{title}</div>
    </div>
  );
}

export default DataNotFound;
