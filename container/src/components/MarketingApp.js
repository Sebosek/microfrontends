﻿import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { mount } from 'marketing/startup';

export default () => {
  const ref = useRef(null);
  const history = useHistory();
  
  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: next }) => {
        const { pathname } = history.location;
        if (pathname === next) return;
        
        history.push(next);
      },
    });
    
    history.listen(onParentNavigate);
  }, []);
  
  return (
    <div ref={ref} />
  );
};