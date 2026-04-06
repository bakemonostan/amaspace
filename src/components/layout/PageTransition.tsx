import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Outlet, useRouterState } from "@tanstack/react-router";

/**
 * Lightweight route transitions (opacity + small translate). Respects prefers-reduced-motion.
 * @see https://motion.dev/docs/react — Motion is the successor to Framer Motion; this project uses `framer-motion` which shares the same API.
 */
export function PageTransition() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduce = useReducedMotion();

  return (
    <AnimatePresence initial={false} mode="sync">
      <motion.div
        key={pathname}
        initial={reduce ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
        transition={{
          duration: reduce ? 0 : 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="min-h-[50vh]"
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
