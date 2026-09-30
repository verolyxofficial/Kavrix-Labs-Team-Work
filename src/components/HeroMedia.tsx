import { useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroMedia() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  useGSAP(
    () => {
      // 1. Entrance Animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-video-card",
        { scale: 0.88, opacity: 0, rotateY: -12, rotateX: 6, y: 45 },
        { scale: 1, opacity: 1, rotateY: -5, rotateX: 2, y: 0, duration: 1.1, delay: 0.15 }
      )
        .fromTo(
          ".hero-video-glow",
          { scale: 0.7, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2 },
          "-=0.9"
        );

      // 2. Interactive Scroll-Driven 3D Parallax Tilt (desktop / tablets)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 901px)", () => {
        gsap.to(".hero-video-card", {
          rotateY: 8,
          rotateX: -7,
          rotateZ: -1.2,
          scale: 1.04,
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: "#top",
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });
    },
    { scope: wrapRef }
  );

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      try {
        await video.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div ref={wrapRef} className="hero-video-wrap" data-gsap-custom="true" aria-label="Kavrix Labs motion showcase">
      <div className="hero-video-glow" />
      <div className="hero-video-card">
        <video
          ref={videoRef}
          className="hero-video"
          src="/hero-motion.mp4"
          poster="/hero-motion-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <div className="hero-video-overlay" />
        <div className="hero-video-label">
          <span className="live-dot" />
          3D / MOTION REEL
        </div>
        <div className="hero-video-caption">
          <span>Creative motion</span>
          <b>KAVRIX LABS</b>
        </div>
        <div className="hero-video-controls" aria-label="Video controls">
          <button type="button" onClick={togglePlay} aria-label={playing ? "Pause video" : "Play video"}>
            {playing ? <Pause /> : <Play />}
          </button>
          <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute video" : "Mute video"}>
            {muted ? <VolumeX /> : <Volume2 />}
          </button>
        </div>
      </div>
      <svg className="hero-orbit" viewBox="0 0 500 500" aria-hidden="true">
        <circle cx="250" cy="250" r="205" />
        <circle cx="250" cy="250" r="153" />
        <path d="M82 300c94-169 235-211 337-98" />
      </svg>
    </div>
  );
}
