"use client";

/** World map with auto-positioned presence dots.
 *  - Countries with lat/lng in config.ts → exact SVG coords via geoViewBox formula (always accurate).
 *  - Countries without lat/lng          → centre of SVG bounding box via getBBox() (good for compact shapes).
 *  To fix a dot that lands in the ocean, add lat/lng to that entry in config.ts. */

import { useEffect, useRef, useState } from "react";
import { companyPresence } from "@/data/company/config";
import { WorldMapPaths } from "@/data/world-map-paths";

/** Derived from the SVG's mapsvg:geoViewBox attribute */
const GEO = { left: -169.110266, top: 83.600842, w: 359.596545, h: 142.109315 };
const SVG = { w: 1009.6727, h: 665.96301 };

function geoToSvg(lat: number, lng: number) {
  return {
    cx: ((lng - GEO.left) / GEO.w) * SVG.w,
    cy: ((GEO.top - lat) / GEO.h) * SVG.h,
  };
}

type Dot = { cx: number; cy: number; code: string; label: string };

export default function WorldMapSvg() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [bboxDots, setBboxDots] = useState<Dot[]>([]);

  // Pre-compute dots for countries that have explicit lat/lng — no DOM access needed
  const geoDots: Dot[] = companyPresence
    .filter((p) => p.lat !== undefined && p.lng !== undefined)
    .map((p) => ({ ...geoToSvg(p.lat!, p.lng!), code: p.code, label: p.label }));

  // For the rest, derive centre from the country's SVG path bounding box
  const bboxCountries = companyPresence.filter((p) => p.lat === undefined || p.lng === undefined);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const frame = requestAnimationFrame(() => {
      const computed = bboxCountries.flatMap(({ code, label }) => {
        const el = svg.getElementById(code) as SVGGraphicsElement | null;
        if (!el) return [];
        const { x, y, width, height } = el.getBBox();
        if (!width && !height) return [];
        return [{ cx: x + width / 2, cy: y + height / 2, code, label }];
      });
      setBboxDots(computed);
    });

    return () => cancelAnimationFrame(frame);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dots = [...geoDots, ...bboxDots];

  return (
    <div className="relative w-full max-w-5xl mx-auto select-none">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes mapPulse {
              0%   { r: 4;  opacity: 0.9; }
              70%  { r: 13; opacity: 0;   }
              100% { r: 13; opacity: 0;   }
            }
            .map-dot-ping { animation: mapPulse 2.8s cubic-bezier(0,0,0.2,1) infinite; }
          `,
        }}
      />

      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG.w} ${SVG.h}`}
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        role="img"
        aria-label="World map showing PVCON global presence"
      >
        <g fill="#d1d5db" stroke="#ffffff" strokeWidth="0.5">
          <WorldMapPaths />
        </g>

        {dots.map((dot, i) => (
          <g key={dot.code}>
            <title>{dot.label}</title>
            <circle
              cx={dot.cx}
              cy={dot.cy}
              r="4"
              fill="none"
              stroke="#92b353"
              strokeWidth="1.5"
              className="map-dot-ping"
              style={{ animationDelay: `${i * 0.22}s` }}
            />
            <circle cx={dot.cx} cy={dot.cy} r="4" fill="#92b353" />
          </g>
        ))}
      </svg>
    </div>
  );
}
