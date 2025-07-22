// import { render, screen } from '@testing-library/react';
// import ContactPage from '@/src/app/contact/page.tsx';

// const viewports = [
//   { label: 'mobile', width: 375 },
//   { label: 'tablet', width: 768 },
//   { label: 'desktop', width: 1024 },
//   { label: 'large desktop', width: 1440 },
// ];

// describe('ContactPage responsive layout', () => {
//   viewports.forEach(({ label, width }) => {
//     describe(`${label} viewport`, () => {
//       beforeEach(() => {
//         Object.defineProperty(window, 'innerWidth', {
//           writable: true,
//           configurable: true,
//           value: width,
//         });
//         window.dispatchEvent(new Event('resize'));
//       });

//       it(`renders correctly on ${label} screen`, () => {
//         render(<ContactPage />);
//         expect(screen.getByText(/ติดต่อเรา/i)).toBeInTheDocument();
//       });
//     });
//   });
// });
