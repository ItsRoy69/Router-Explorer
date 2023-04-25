import { Select } from "@mantine/core";
import React, { forwardRef } from "react";
import { RiArrowDownSFill } from "react-icons/ri";

const SelectItem = forwardRef(({ icon, label, ...others }, ref) => (
  <div
    ref={ref}
    {...others}
    className={`flex overflow-hidden relative items-center text-white p-3 hover:bg-glass cursor-pointer rounded-lg`}
  >
    <img
      src={icon}
      className="h-10 w-10 object-contain mr-3"
      alt="chain logo"
    />
    <div className="w-full flex justify-between items-center">
      <p className="text-xl font-bold">{label}</p>
    </div>
  </div>
));

const CustomDropdown = ({ value, options, onChange }) => {
  const classNames = {
    input:
      "w-full bg-transparent text-white 2xl:h-14 h-12 rounded-xl cursor-pointer text-lg p-3 border-[0.6px] border-gray-200 focus:border-white focus:border-sm",
    root: "w-full",
    dropdown: "bg-glass rounded-lg border-0 z-50 moving-gradient",
  };

  return (
    <Select
      data={options}
      value={value.value}
      searchable
      nothingFound="No results"
      onChange={(val) => onChange(val)}
      itemComponent={SelectItem}
      rightSection={<RiArrowDownSFill />}
      classNames={classNames}
    />
  );
};

export default CustomDropdown;
