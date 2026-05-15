import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
  dismissOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  lockScroll?: boolean;
  className?: {
    backdrop?: string;
    wrapper?: string;
  };
};

export const Modal = ({
  onClose,
  children,
  dismissOnOutsideClick = true,
  closeOnEsc = true,
  lockScroll = true,
  className,
}: ModalProps) => {
  useEffect(() => {
    if (!closeOnEsc) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [closeOnEsc, onClose]);

  useEffect(() => {
    if (!lockScroll) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [lockScroll]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className={twMerge("absolute inset-0 bg-black/50", className?.backdrop)}
        onClick={dismissOnOutsideClick ? onClose : undefined}
      />
      <div
        className={twMerge(
          "relative bg-white rounded-lg shadow-lg p-6 z-10 max-w-[90vw] max-h-[90vh]",
          className?.wrapper,
        )}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};
