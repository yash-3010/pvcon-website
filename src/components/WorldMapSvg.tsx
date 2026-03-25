"use client";

/** World map with auto-positioned presence dots.
 *  Every dot is centred via getBBox() on the country's SVG path. */

import { useEffect, useRef, useState } from "react";
import { companyPresence } from "@/data/company/config";
import { WorldMapPaths } from "@/data/world-map-paths";

const SVG = { w: 1009.6727, h: 665.96301 };

type Dot = { cx: number; cy: number; code: string; label: string };

export default function WorldMapSvg() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const frame = requestAnimationFrame(() => {
      const computed = companyPresence.flatMap(({ code, label, svgX, svgY }) => {
        const el = svg.getElementById(code) as SVGGraphicsElement | null;
        if (!el) return [];
        // Use manual SVG coordinate overrides for countries with distant territories
        if (svgX !== undefined && svgY !== undefined) {
          return [{ cx: svgX, cy: svgY, code, label }];
        }
        const { x, y, width, height } = el.getBBox();
        if (!width && !height) return [];
        return [{ cx: x + width / 2, cy: y + height / 2, code, label }];
      });
      setDots(computed);
    });

    return () => cancelAnimationFrame(frame);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
