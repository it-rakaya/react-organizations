import {
  BiDetail,
  BiHome,
  BiSolidCube,
  BiUser
} from "react-icons/bi";
import { IconType } from "react-icons/lib";

export type MenuItem_TP = {
  id: string;
  icon: IconType;
  label: string;
  link?: string;
  heading?: string; // Add the heading property
  items?: {
    id: string;
    icon: IconType;
    label: string;
    link?: string;
    items?: MenuItem_TP[];
  }[];
};

export const sideBarItems: MenuItem_TP[] = [
  {
    id: crypto.randomUUID(),
    label: `${"Home"}`,
    icon: BiHome,
    link: "/dashboard",
  },
  {
    id: crypto.randomUUID(),
    label: `${"Facilities"}`,
    icon: BiSolidCube,
    link: "/dashboard/facilities",
  },
  {
    id: crypto.randomUUID(),
    label: `${"Employee"}`,
    icon: BiUser,
    link: "/dashboard/employee",
  },
  // {
  //   id: crypto.randomUUID(),
  //   label: `${"Facilities"}`,
  //   icon: BiSolidCube,
  //   link: "/facilities ",
  // },
  // {
  //   id: crypto.randomUUID(),
  //   label: `${"Employee"}`,
  //   icon: BiUser,
  //   link: "/employee ",
  // },
  {
    id: crypto.randomUUID(),
    label: `${"Orders"}`,
    icon: BiDetail,
    link: "/dashboard/orders",
  },
];
