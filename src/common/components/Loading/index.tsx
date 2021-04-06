import React from 'react';

/*
 * Props of Component
 */
interface ComponentProps {
  className?: string;
}

const Loading = (props: ComponentProps) => {
  const { className } = props;

  return (
    <>
      <div>Loading ... </div>
    </>
  );
};

export default Loading;
