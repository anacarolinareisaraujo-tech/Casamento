/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import HistoryAndDetails from "./components/HistoryAndDetails";
import RSVP from "./components/RSVP";
import Gifts from "./components/Gifts";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-wedding-cream relative font-sans">
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        <HistoryAndDetails />
        <RSVP />
        <Gifts />
      </main>
      <Footer />
    </div>
  );
}
