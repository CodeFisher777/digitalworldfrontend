import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = (props) => (
  <ContentLoader
    speed={2}
    width={315}
    height={330}
    viewBox="0 0 315 330"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="13" y="-10" rx="2" ry="2" width="260" height="162" />
    <rect x="6" y="165" rx="10" ry="10" width="280" height="25" />
    <rect x="149" y="204" rx="16" ry="16" width="134" height="45" />
    <rect x="11" y="209" rx="0" ry="0" width="90" height="27" />
  </ContentLoader>
);

export default Skeleton;
