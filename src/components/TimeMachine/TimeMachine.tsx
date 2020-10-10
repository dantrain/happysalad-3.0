import { Link } from 'gatsby';
import React from 'react';

const TimeMachine: React.FC<{ years: string[] }> = ({ years }) => (
  <nav>
    <ul>
      {years.map((year) => (
        <li key={year}>
          <Link to={`/${year}`}>{year}</Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default TimeMachine;
