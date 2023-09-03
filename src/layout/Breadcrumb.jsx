import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const parts = location.pathname.split('/').filter(part => part !== '');
  const breadcrumbs = parts.map((part, index) => {
    const correctedPart = part.replace(/-/g, ' ');

    const path = '/' + parts.slice(0, index + 1).join('/');
    return (
      <ul key={part}>
        <li>
          <Link to={path}>
            {correctedPart}
          </Link>
        </li>
        {index < parts.length - 1 && <li> <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg> </li>}
      </ul>
    );
  });

  return (
    <main>
      <section id='crumb'>
        <ul>
          <li>
            <Link to='/'>Home
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>
            </Link>
          </li>
          {breadcrumbs}
        </ul>
      </section>
    </main>
  );
};

export default Breadcrumb;
