import Navbar from './components/Navbar/navbar';
import './globals.css';

export default function RootLayout({ children }) {
  return (

    <>
      <html lang="en">
        <body>
          <div className="flex min-h-screen">
            <Navbar />
            <main className="flex-1 ml-30 p-4 overflow-y-auto">
              {children}
            </main>
          </div>
        </body>
      </html>
      
    </>
  );
}