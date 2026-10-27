/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import HistoryAndDetails from "./components/HistoryAndDetails";
import DressCode from "./components/DressCode";
import RSVP from "./components/RSVP";
import Gifts from "./components/Gifts";
import Footer from "./components/Footer";
import EnvelopeIntro from "./components/EnvelopeIntro";
import MusicToggle from "./components/MusicToggle";

// Arquivo de música em public/
const MUSIC_SRC = "/la-vie-en-rose.mp3";
const MUSIC_VOLUME = 0.5;

export default function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  // null enquanto a música ainda não começou (ou o arquivo não existe)
  const [musicPlaying, setMusicPlaying] = useState<boolean | null>(null);

  const startMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    audio
      .play()
      .then(() => {
        setMusicPlaying(true);
        // Entrada suave do volume
        const fade = setInterval(() => {
          audio.volume = Math.min(MUSIC_VOLUME, audio.volume + 0.05);
          if (audio.volume >= MUSIC_VOLUME) clearInterval(fade);
        }, 150);
      })
      .catch(() => {});
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
      setMusicPlaying(true);
    } else {
      audio.pause();
      setMusicPlaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-wedding-cream relative font-sans">
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />
      <EnvelopeIntro onOpen={startMusic} />
      {musicPlaying !== null && (
        <MusicToggle playing={musicPlaying} onToggle={toggleMusic} />
      )}
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        <HistoryAndDetails />
        <DressCode />
        <RSVP />
        <Gifts />
      </main>
      <Footer />
    </div>
  );
}
