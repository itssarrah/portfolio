import React from 'react';

const BASE = 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple@16.0.0/img/apple/64/';

const Twemoji = ({ emoji, size = 20, className = '' }) => {
  const codePoints = [...emoji]
    .map((c) => c.codePointAt(0).toString(16))
    .filter((cp) => cp !== 'fe0f')
    .join('-');

  return (
    <img
      src={`${BASE}${codePoints}.png`}
      alt={emoji}
      width={size}
      height={size}
      className={`inline-block ${className}`}
      style={{ verticalAlign: '-0.1em' }}
      draggable={false}
    />
  );
};

export default Twemoji;
