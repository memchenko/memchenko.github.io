import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const useGame = create(
  subscribeWithSelector((set) => {
    return {
      blocksCount: 3,
      blocksSeed: 0,
      phase: "ready",
      startTime: 0,
      endTime: 0,

      start: () => {
        set((state) => {
          if (state.phase === "ready") {
            return { phase: "playing", startTime: Date.now() };
          }

          return {};
        });
      },
      restart: () => {
        set((state) => {
          if (state.phase === "playing" || state.phase === "ended") {
            return { phase: "ready", blocksSeed: Math.random() };
          }

          return {};
        });
      },
      end: () => {
        set((state) => {
          if (state.phase === "playing") {
            return { phase: "ended", endTime: Date.now() };
          }

          return {};
        });
      },
    };
  })
);
