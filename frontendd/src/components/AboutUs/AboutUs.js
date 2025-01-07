import React from 'react';
import { AboutHero } from './AboutHero'; // Named import
import { Mission } from './Mission';     // Named import
import { Values } from './Values';       // Named import
import { Team } from './Team';           // Named import

export default function AboutUs() {
  return (
    <div className="overflow-hidden">
      <AboutHero />
      <Mission />
      <Values />
      <Team />
    </div>
  );
}
