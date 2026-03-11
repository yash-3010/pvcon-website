import { BsBarChartFill, BsFillStarFill } from "react-icons/bs";
import { PiGlobeFill } from "react-icons/pi";
import React from "react";

// Non-translatable config: icons only.
// All text (titles, descriptions) lives in messages/*.json under "stats.items"
export const statsIcons = [
  <BsBarChartFill key="0" size={34} className="text-blue-500" />,
  <BsFillStarFill key="1" size={34} className="text-yellow-500" />,
  <PiGlobeFill key="2" size={34} className="text-green-600" />,
];
