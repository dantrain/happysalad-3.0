import React from 'react';
import { Link } from 'gatsby';
import Container from '../Container';

import s from './header.module.css';

const LogoText = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 328.680 82.224"
    {...props}
  >
    <path d="M30.02 64.66L30.02 48.02C30.02 43.56 29.09 40.46 27.00 37.94C24.70 35.14 21.24 33.48 17.57 33.48C15.34 33.48 13.39 33.98 11.16 35.21L11.16 16.63L4.10 16.63L4.10 64.66L11.16 64.66L11.16 48.74C11.16 45.86 11.52 44.21 12.38 42.84C13.39 41.40 15.41 40.39 17.28 40.39C19.08 40.39 20.95 41.40 21.89 42.84C22.68 44.14 22.97 45.65 22.97 48.82L22.97 64.66ZM67.25 64.66L67.25 52.20C67.25 46.01 66.74 43.56 64.80 40.54C62.06 36.22 56.88 33.48 51.62 33.48C42.91 33.48 35.71 40.68 35.71 49.32C35.71 57.89 42.84 65.09 51.19 65.09C54.43 65.09 57.38 64.01 60.19 61.85L60.19 64.66ZM51.77 40.39C56.74 40.39 60.48 44.35 60.48 49.54C60.48 54.43 56.59 58.18 51.70 58.18C46.66 58.18 42.77 54.29 42.77 49.32C42.77 44.28 46.73 40.39 51.77 40.39ZM73.44 81.86L80.50 81.86L80.50 61.85C83.30 64.01 86.26 65.09 89.50 65.09C97.85 65.09 104.98 57.89 104.98 49.32C104.98 40.68 97.78 33.48 89.06 33.48C83.81 33.48 78.62 36.22 75.89 40.54C73.94 43.56 73.44 46.01 73.44 52.20ZM88.99 40.39C93.96 40.39 97.92 44.35 97.92 49.32C97.92 54.36 94.03 58.18 88.99 58.18C83.95 58.18 80.28 54.43 80.28 49.25C80.28 44.35 84.17 40.39 88.99 40.39ZM110.02 81.86L117.07 81.86L117.07 61.85C119.88 64.01 122.83 65.09 126.07 65.09C134.42 65.09 141.55 57.89 141.55 49.32C141.55 40.68 134.35 33.48 125.64 33.48C120.38 33.48 115.20 36.22 112.46 40.54C110.52 43.56 110.02 46.01 110.02 52.20ZM125.57 40.39C130.54 40.39 134.50 44.35 134.50 49.32C134.50 54.36 130.61 58.18 125.57 58.18C120.53 58.18 116.86 54.43 116.86 49.25C116.86 44.35 120.74 40.39 125.57 40.39ZM173.30 33.91L166.25 33.91L166.25 50.83C166.25 55.44 164.09 58.18 160.34 58.18C156.53 58.18 154.37 55.37 154.37 50.54L154.37 33.91L147.31 33.91L147.31 50.26C147.31 54.14 148.10 57.31 149.69 59.62C152.14 63.07 156.02 65.09 160.27 65.09C162.65 65.09 164.23 64.66 166.39 63.43L166.39 67.39C166.39 69.48 166.03 71.28 165.53 72.22C164.45 74.16 162.29 75.38 159.98 75.38C156.24 75.38 153.94 72.86 153.72 68.62L146.74 68.62L146.74 69.41C146.74 76.39 152.78 82.22 160.06 82.22C164.09 82.22 167.69 80.50 170.35 77.26C172.30 74.88 173.30 71.50 173.30 67.18ZM199.37 34.70C196.13 33.62 193.97 33.26 191.30 33.26C184.82 33.26 180.14 37.37 180.14 43.06C180.14 47.74 182.88 50.47 189.14 52.20C193.54 53.42 194.33 54.00 194.33 55.80C194.33 57.74 192.67 58.90 189.79 58.90C187.34 58.90 184.18 58.03 180.50 56.30L180.50 63.50C183.82 64.73 186.55 65.30 189.65 65.30C196.49 65.30 201.17 61.20 201.17 55.15C201.17 52.70 200.23 50.40 198.58 48.89C197.50 47.81 195.98 47.09 193.32 46.30C189.50 45.22 189.50 45.22 188.50 44.78C187.49 44.35 186.98 43.70 186.98 42.77C186.98 40.75 188.78 39.53 191.66 39.53C194.18 39.53 196.99 40.32 199.37 41.76ZM237.24 64.66L237.24 52.20C237.24 46.01 236.74 43.56 234.79 40.54C232.06 36.22 226.87 33.48 221.62 33.48C212.90 33.48 205.70 40.68 205.70 49.32C205.70 57.89 212.83 65.09 221.18 65.09C224.42 65.09 227.38 64.01 230.18 61.85L230.18 64.66ZM221.76 40.39C226.73 40.39 230.47 44.35 230.47 49.54C230.47 54.43 226.58 58.18 221.69 58.18C216.65 58.18 212.76 54.29 212.76 49.32C212.76 44.28 216.72 40.39 221.76 40.39ZM251.50 64.66L251.50 16.63L244.44 16.63L244.44 64.66ZM289.01 64.66L289.01 52.20C289.01 46.01 288.50 43.56 286.56 40.54C283.82 36.22 278.64 33.48 273.38 33.48C264.67 33.48 257.47 40.68 257.47 49.32C257.47 57.89 264.60 65.09 272.95 65.09C276.19 65.09 279.14 64.01 281.95 61.85L281.95 64.66ZM273.53 40.39C278.50 40.39 282.24 44.35 282.24 49.54C282.24 54.43 278.35 58.18 273.46 58.18C268.42 58.18 264.53 54.29 264.53 49.32C264.53 44.28 268.49 40.39 273.53 40.39ZM325.58 16.63L318.53 16.63L318.53 36.72C315.72 34.56 312.77 33.48 309.53 33.48C301.18 33.48 294.05 40.68 294.05 49.25C294.05 57.89 301.25 65.09 309.96 65.09C315.22 65.09 320.40 62.35 323.14 58.03C325.08 55.01 325.58 52.56 325.58 46.37ZM310.03 40.39C315.07 40.39 318.74 44.21 318.74 49.32C318.74 54.22 314.86 58.18 310.03 58.18C305.06 58.18 301.10 54.22 301.10 49.25C301.10 44.21 304.92 40.39 310.03 40.39Z" />
  </svg>
);

const Header = () => (
  <header className={s.header}>
    <Container pad>
      <Link to="/" title="Home">
        <div className={s.logo}>
          <img className={s.logoImg} src="/images/logo-tomato.png" />
          <LogoText className={s.logoText} />
        </div>
      </Link>
    </Container>
  </header>
);

export default Header;
