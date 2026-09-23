import { useEffect } from "react";

export default function usePageEffects() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 50px 0px" },
    );

    const observeNewTargets = () => {
      const targets = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
      targets.forEach((target) => observer.observe(target));
    };

    observeNewTargets();

    // Observe dynamically mounted elements (e.g. portfolio category filters)
    const mutationObserver = new MutationObserver(() => {
      observeNewTargets();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const onPointerMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? window.scrollY / total : 0;
      document.documentElement.style.setProperty("--page-progress", String(progress));
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}
