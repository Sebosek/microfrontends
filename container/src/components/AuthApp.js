import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { mount } from 'auth/startup';

export default ({ onSignIn }) => {
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
      onAuthChange: (user) => onSignIn(user),
    });
    
    history.listen(onParentNavigate);
  }, []);
  
  return (
    <div ref={ref} />
  );
};