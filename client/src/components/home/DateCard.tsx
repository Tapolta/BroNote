import { ReactNode } from "react";

type DateGroupProps = {
  date: string;
  count: number;
  children: ReactNode;
};

const DateGroup = ({ date, count, children }: DateGroupProps) => {
  return (
    <div className="group">
      <div className="flex items-center mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">{date}</h2>
        <span className="ml-3 sm:ml-4 px-2 sm:px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-full">
          {count} notes
        </span>
        <div className="ml-2 sm:ml-auto h-px bg-gray-300 dark:bg-gray-700 flex-1"></div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
        {children}
      </div>
    </div>
  );
};

export default DateGroup;
