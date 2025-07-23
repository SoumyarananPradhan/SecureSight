export const metadata = {
    title: "SecureSight Dashboard",
    description: "Monitoring incidents from CCTV feeds",
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body className="bg-gray-100">{children}</body>
      </html>
    );
  }
  