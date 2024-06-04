function StatusComponent() {
  return (
    <div className="grid">
      <div>
        <h5 className="text-text-gray dark:text-text-gray-dark pb-1 text-sm ">
          PACKET TIMESTAMP
        </h5>
        <h5 className="text-text-gray dark:text-text-gray-dark decoration-primary pb-3 text-xs underline decoration-1 underline-offset-4">
          Oct. 15 2022, 4:18.16pm
        </h5>
      </div>
      <div className="grid w-fit grid-cols-2 gap-2">
        <h5 className="text-text-gray dark:text-text-gray-dark">STATUS</h5>
        <div className="bg-green dark:bg-green-dark mt-1 size-4 rounded-full"></div>
      </div>
    </div>
  );
}

export default StatusComponent;
