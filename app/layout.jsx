import React from "react";
import "../styles/globals.css";
import NavBar from "../components/Nav";
import Provider from "../components/Provider";

export const metadata = {
  title: "Promotopia",
  description: "discover and Share Ai Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm">
            <NavBar />
          </nav>

          <main className="app pt-24">{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
