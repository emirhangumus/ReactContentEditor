import * as React from "react";

const SixDotsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={800}
    height={800}
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M108 60a16 16 0 1 1-16-16 16 16 0 0 1 16 16Zm56 16a16 16 0 1 0-16-16 16 16 0 0 0 16 16Zm-72 36a16 16 0 1 0 16 16 16 16 0 0 0-16-16Zm72 0a16 16 0 1 0 16 16 16 16 0 0 0-16-16Zm-72 68a16 16 0 1 0 16 16 16 16 0 0 0-16-16Zm72 0a16 16 0 1 0 16 16 16 16 0 0 0-16-16Z" />
  </svg>
);

export default SixDotsIcon;
