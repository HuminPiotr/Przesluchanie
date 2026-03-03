import "./styles.scss";

import React from 'react';
import Image from 'next/image';

const statusImages = {
  basic: '/images/basic.webp',
  normal: '/images/normal.webp',
  angry: '/images/angry.webp',
  happy: '/images/happy.webp'
};

const Student = ({ status }) => {
  return (
    <div className='student'>
      <Image 
        src={statusImages[status] || '/images/basic.webp'} 
        alt={status} 
        width={360} 
        height={360} 
        className='student__image'
      />
    </div>
  );
};

export default Student;
