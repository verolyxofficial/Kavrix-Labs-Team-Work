import { useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

export default function HeroMedia() {
  const publicAsset = (name: string) => `${import.meta.env.BASE_URL}${name}`;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

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
    <div className="hero-video-wrap reveal reveal-right" aria-label="Kavrix Labs motion showcase">
      <div className="hero-video-glow" />
      <div className="hero-video-card">
        <video
          ref={videoRef}
          className="hero-video"
          src={publicAsset("hero-motion.mp4")}
          poster={publicAsset("hero-motion-poster.jpg")}
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
      <div className="hero-float hero-float--top">
        <span className="live-dot" />
        3D MOTION / AVAILABLE
      </div>
      <div className="hero-float hero-float--bottom">
        <span>DESIGN</span>
        <i />
        <span>MOTION</span>
        <i />
        <span>CODE</span>
      </div>
      <svg className="hero-orbit" viewBox="0 0 500 500" aria-hidden="true">
        <circle cx="250" cy="250" r="205" />
        <circle cx="250" cy="250" r="153" />
        <path d="M82 300c94-169 235-211 337-98" />
      </svg>
    </div>
  );
}
