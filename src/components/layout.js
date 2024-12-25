"use client";

const Layout = ({ children }) => {
    return (
        <div suppressHydrationWarning>
            {children}
        </div>
    );
};

export default Layout;