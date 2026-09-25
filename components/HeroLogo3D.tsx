"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Logo 3D animato per la hero della home.
 * - Loop video (WebM + MP4 di riserva), muto, senza controlli
 * - Bordi sfumati: il video si fonde con lo sfondo #0c0c0a
 * - Si ferma quando esce dallo schermo (risparmia batteria)
 * - Con "riduci movimento" attivo mostra solo l'immagine fissa
 */
export default function HeroLogo3D({ className = "" }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [riduciMovimento, setRiduciMovimento] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const aggiorna = () => setRiduciMovimento(mq.matches);
    aggiorna();
    mq.addEventListener("change", aggiorna);
    return () => mq.removeEventListener("change", aggiorna);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || riduciMovimento) return;
    const osservatore = new IntersectionObserver(
      ([voce]) => {
        if (voce.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.1 }
    );
    osservatore.observe(video);
    return () => osservatore.disconnect();
  }, [riduciMovimento]);

  const maschera =
    "radial-gradient(circle closest-side, #000 80%, transparent 100%)";

  return (
    <div
      aria-hidden="true"
      className={`relative aspect-square w-full max-w-[560px] ${className}`}
      style={{ WebkitMaskImage: maschera, maskImage: maschera }}
    >
      {riduciMovimento ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/video/logo-3d-poster.webp"
          alt=""
          className="h-full w-full object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          poster="/video/logo-3d-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
        >
          <source src="/video/logo-3d.webm" type="video/webm" />
          <source src="/video/logo-3d.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
