import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import "@/styles/globals.css";

export const metadata = {
    title: "Share Prompts",
    description: "..........Hello .............",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div className="main">
                    <div className="gradient"></div>
                </div>
                <div className="app">
                    <Provider>
                        <Nav></Nav>
                        {children}
                    </Provider>
                </div>
            </body>
        </html>
    );
}
