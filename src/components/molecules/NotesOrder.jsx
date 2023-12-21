/* eslint-disable react/prop-types */
function NotesOrder({ notes }) {
  return notes?.length ? (
    notes?.map((item) => (
      <div
        className="main_content max-h-[450px] overflow-y-scroll scroll_main mt-5"
        key={item?.id}
        dangerouslySetInnerHTML={{
          __html: item?.content,
        }}
      >
        
      </div>
    ))
  ) : (
    <div className="mt-10 text-2xl font-bold text-"> لايوجد ملاحظات </div>
  );
}

export default NotesOrder;
