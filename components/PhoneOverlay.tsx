'use client';

import { motion, AnimatePresence } from 'framer-motion';

type PhoneOverlayProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function PhoneOverlay({ open, title, onClose, children }: PhoneOverlayProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 bg-black/85 flex flex-col"
        >
          <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-zinc-700">
            <h2 className="text-lg font-bold text-white">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-zinc-400 hover:text-white text-sm px-2 py-1"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto p-4">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
