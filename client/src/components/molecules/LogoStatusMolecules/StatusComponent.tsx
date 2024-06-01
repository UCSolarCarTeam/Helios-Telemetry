
function StatusComponent() {
  return (
    <div className="grid">
      <div>
        <h5 className="text-text-gray dark:text-text-gray-dark pb-1 text-sm ">
          LAST PACKET
        </h5>
        <h5 className="text-text-gray dark:text-text-gray-dark decoration-primary pb-3 text-xs underline decoration-1 underline-offset-4">
          Oct. 15 2022, 4:18.16pm
        </h5>
      </div>
      <div className="grid w-fit grid-cols-2 gap-4">
        <h5 className="text-text-gray dark:text-text-gray-dark">STATUS</h5>
        <div className="bg-green dark:bg-green-dark mt-1 size-5 rounded-full"></div>
      </div>
      <div className="flex flex-row items-center justify-center">
        {" "}
        <h1>hi</h1>
      </div>
    </div>
  );
}

export default StatusComponent;
