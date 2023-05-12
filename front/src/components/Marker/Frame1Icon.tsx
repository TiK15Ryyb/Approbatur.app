import { memo, SVGProps } from 'react';

const Frame1Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 70 80' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M50 22C50 33.0457 43.2843 42 35 42C26.7157 42 20 33.0457 20 22C20 10.9543 26.7157 2 35 2C43.2843 2 50 10.9543 50 22Z'
      fill='#FF8C8C'
    />
    <path
      d='M43 22C43 26.9706 39.4183 31 35 31C30.5817 31 27 26.9706 27 22C27 17.0294 30.5817 13 35 13C39.4183 13 43 17.0294 43 22Z'
      fill='white'
    />
    <path d='M23 17C23 25.5714 23 46.1759 34.6 62C47 47.1649 47 17 47 17' stroke='#FF8C8C' />
  </svg>
);

const Memo = memo(Frame1Icon);
export { Memo as Frame1Icon };
