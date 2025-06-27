export default function LoadingPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 w-full h-full">
      <div className="flex-1">
        <div className="bg-[#1B2838] p-4 rounded">
          <div className="w-full h-64 skeleton"></div>

          <br />

          <div className="skeleton h-8 w-full"></div>

          <br />

          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        </div>
      </div>

      <div className="flex-none flex flex-col gap-4">
        <div className="bg-[#1B2838] p-4 rounded hidden lg:flex flex-col gap-4">
          <div className="skeleton btn btn-wide lg:"></div>
          <div className="skeleton btn btn-wide lg:"></div>
          <div className="skeleton btn btn-wide lg:"></div>
        </div>

        <div className="bg-[#1B2838] p-4 rounded flex flex-col gap-4">
          <div className="skeleton h-8 w-full"></div>

          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        </div>

        <div className="bg-[#1B2838] p-4 rounded flex flex-col gap-4">
          <div className="skeleton h-8 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-24 w-full"></div>
        </div>

        <div className="bg-[#1B2838] p-4 rounded flex lg:hidden flex-col gap-4">
          <div className="skeleton btn btn-wide w-full"></div>
          <div className="skeleton btn btn-wide w-full"></div>
          <div className="skeleton btn btn-wide w-full"></div>
        </div>
      </div>
    </div>
  );
}
