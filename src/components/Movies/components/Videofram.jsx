import { useEffect, useRef } from "react";

// Trailer modal built on the native <dialog> element: it traps focus,
// closes on Escape and restores focus to the opener.
const Videofram = ({ open, handleOpen, videoSrc }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (open && !el.open) el.showModal();
    return () => {
      if (el.open) el.close();
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label="Trailer"
      onClose={handleOpen}
      onClick={(e) => {
        if (e.target === ref.current) ref.current.close();
      }}
      className="w-[min(92vw,960px)] max-w-none bg-transparent p-0 backdrop:bg-black/80"
    >
      {open && (
        <>
          <form method="dialog" className="mb-3 flex justify-end">
            <button autoFocus className="btn-ghost bg-black/60">
              Close trailer
            </button>
          </form>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
            <iframe
              className="absolute inset-0 h-full w-full border-0"
              src={videoSrc}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              title="Trailer"
            />
          </div>
        </>
      )}
    </dialog>
  );
};

export default Videofram;
