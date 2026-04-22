import React from 'react';

const Section = ({ id, className = '', children, background, style = {} }) => (
  <section
    id={id}
    className={`py-16 md:py-24 ${className}`}
    style={{ background, ...style }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  </section>
);

export default Section;
