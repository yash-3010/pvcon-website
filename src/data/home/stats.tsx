import { FaAward } from "react-icons/fa6";
import { RiUserStarFill } from "react-icons/ri";
import { FaGlobe } from "react-icons/fa";
import React from "react";

// Non-translatable config: icons only.
// All text (titles, descriptions) lives in messages/*.json under "stats.items"
export const statsIcons = [
  <FaGlobe key="0" size={34} className="text-blue-500" />,
  <FaAward key="1" size={34} className="text-yellow-500" />,
  <RiUserStarFill key="2" size={34} className="text-green-600" />,
];
