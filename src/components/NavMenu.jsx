import { useState } from "react";
import { Burger, Menu } from "@mantine/core";
import NavLink from "./NavLink";
import { useClickOutside } from "@mantine/hooks";

const navLinks = [
  {
    name: "Cross-chain Swap",
    path: "/crosschainswap",
  },
  {
    name: "Cross Talk",
    path: "/crosstalk",
  },
  {
    name: "Fee Calculator",
    path: "/calculate-fees",
  },
  {
    name: "Verify Transaction",
    path: "/verify-transaction",
  },
];

const NavMenu = () => {
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));

  const classNames = {
    dropdown: "bg-glass border-0 h-48 w-96",
    item: "text-white text-base hover:text-black",
  };

  return (
    <Menu classNames={classNames} shadow="md" width={200} opened={opened}>
      <Menu.Target>
        <Burger
          color="white"
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          ref={ref}
        />
      </Menu.Target>

      <Menu.Dropdown>
        {navLinks.map((val) => (
          <Menu.Item key={val.path}>
            <NavLink name={val.name} path={val.path} />
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default NavMenu;
