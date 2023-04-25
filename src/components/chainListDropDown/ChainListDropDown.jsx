import CustomDropdown from "../customUi/CustomDropdown";

const ChainListDropdown = ({ value, onChange, options }) => {
  return (
    <div className="flex w-full justify-center items-center">
      <CustomDropdown
        value={value}
        onChange={onChange}
        options={options || []}
      />
      <div className="m-0 ml-1">
        <img
          src={value.icon}
          className="h-10 w-10 object-contain"
          alt="chain logo"
        />
      </div>
    </div>
  );
};

export default ChainListDropdown;
