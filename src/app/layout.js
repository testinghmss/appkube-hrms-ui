"use client"
// import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store/store";

// const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <AntdRegistry>
          <Provider store={store}>
            {children}
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
