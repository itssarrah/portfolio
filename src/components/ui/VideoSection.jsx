import React from 'react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import Twemoji from './Twemoji';

const VideoSection = ({ language }) => {
  return (
    <ScrollAnimationWrapper>
      <div className="max-w-3xl mx-auto">
        {/* Decorative frame */}
        <div className="relative p-3 md:p-4 bg-gradient-to-br from-sakura-100 to-blossom-lavender/30 rounded-2xl">
          {/* Corner ornaments */}
          <div className="absolute top-2 left-2"><Twemoji emoji="🌸" size={18} /></div>
          <div className="absolute top-2 right-2"><Twemoji emoji="🌸" size={18} /></div>
          <div className="absolute bottom-2 left-2"><Twemoji emoji="🌸" size={18} /></div>
          <div className="absolute bottom-2 right-2"><Twemoji emoji="🌸" size={18} /></div>

          <video
            controls
            playsInline
            preload="metadata"
            poster="/Pic.jpg"
            className="w-full rounded-xl shadow-lg"
            style={{ maxHeight: '500px' }}
          >
            <source src="/portfolio_example.mp4" type="video/mp4" />
            {language === 'en'
              ? 'Your browser does not support the video tag.'
              : 'Votre navigateur ne supporte pas la balise vidéo.'}
          </video>
        </div>

        <p className="text-center font-handwriting text-lg text-warm-light mt-4">
          {language === 'en'
            ? 'A glimpse into my journey '
            : 'Un aperçu de mon parcours '}<Twemoji emoji="✨" size={18} />
        </p>
      </div>
    </ScrollAnimationWrapper>
  );
};

export default VideoSection;
