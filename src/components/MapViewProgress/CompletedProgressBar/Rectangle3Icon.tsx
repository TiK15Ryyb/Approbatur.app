import { memo, SVGProps } from 'react';

const Rectangle3Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 308 53' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M0 20C0 8.95431 8.95431 0 20 0H288C299.046 0 308 8.95431 308 20V33C308 44.0457 299.046 53 288 53H20C8.95431 53 0 44.0457 0 33V20Z'
      fill='#00AD45'
      stroke='black'
    />
  </svg>
);

const Memo = memo(Rectangle3Icon);
export { Memo as Rectangle3Icon };
