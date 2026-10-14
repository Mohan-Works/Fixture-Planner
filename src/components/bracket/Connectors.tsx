import React, { useLayoutEffect, useState, useCallback } from 'react';
import { Fixture } from '../../types';

interface ConnectorsProps {
  fixture: Fixture;
  containerRef: React.RefObject<HTMLDivElement>;
  zoom?: number;
}

interface PathData {
  id: string;
  d: string;
  isActive: boolean;
}

export const Connectors: React.FC<ConnectorsProps> = ({
  fixture,
  containerRef,
  zoom = 1,
}) => {
  const [paths, setPaths] = useState<PathData[]>([]);

  const calculatePaths = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const newPaths: PathData[] = [];

    // Loop through all rounds except the final
    for (let r = 0; r < fixture.rounds.length - 1; r++) {
      const currentRound = fixture.rounds[r];
      const nextRound = fixture.rounds[r + 1];

      for (const match of currentRound.matches) {
        const nextMatchIndex = Math.floor(match.index / 2);
        const nextMatch = nextRound.matches[nextMatchIndex];
        if (!nextMatch) continue;

        const elFeeder = container.querySelector<HTMLElement>(`[data-match-id="${match.id}"]`);
        const elTarget = container.querySelector<HTMLElement>(`[data-match-id="${nextMatch.id}"]`);

        if (!elFeeder || !elTarget) continue;

        const feederRect = elFeeder.getBoundingClientRect();
        const targetRect = elTarget.getBoundingClientRect();

        // Coordinates relative to the container element
        // Note: dividing by zoom accounts for CSS transform: scale(zoom)
        const x1 = (feederRect.right - containerRect.left) / zoom;
        const y1 = (feederRect.top + feederRect.height / 2 - containerRect.top) / zoom;

        const isTopSlot = match.index % 2 === 0;
        const x2 = (targetRect.left - containerRect.left) / zoom;
        // Connect to top slot or bottom slot of the target match card
        const targetSlotY = isTopSlot
          ? targetRect.top + targetRect.height * 0.35
          : targetRect.top + targetRect.height * 0.65;
        const y2 = (targetSlotY - containerRect.top) / zoom;

        const midX = (x1 + x2) / 2;

        // Draw elbow path: horizontal stub -> vertical span -> horizontal entry
        const d = `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`;

        const isActive = Boolean(
          match.winnerId &&
            (nextMatch.p1.playerId === match.winnerId || nextMatch.p2.playerId === match.winnerId)
        );

        newPaths.push({
          id: `${match.id}-${nextMatch.id}`,
          d,
          isActive,
        });
      }
    }

    setPaths(newPaths);
  }, [fixture, containerRef, zoom]);

  useLayoutEffect(() => {
    calculatePaths();

    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      calculatePaths();
    });

    observer.observe(container);
    window.addEventListener('resize', calculatePaths);

    // Timeout to recalculate after layout shifts/fonts load
    const timer = setTimeout(calculatePaths, 100);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', calculatePaths);
      clearTimeout(timer);
    };
  }, [calculatePaths]);

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      style={{ zIndex: 0 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths.map((p) => (
        <path
          key={p.id}
          d={p.d}
          fill="none"
          stroke={p.isActive ? '#3b82f6' : '#cbd5e1'}
          strokeWidth={p.isActive ? 2.5 : 2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-300"
        />
      ))}
    </svg>
  );
};
