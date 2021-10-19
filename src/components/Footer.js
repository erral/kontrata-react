import React from "react"

const Footer = ({ children }) =>
    <footer className="mt-5 pt-4 pb-2 bg-light">
        <div className="text-center py-3">
            {children}
        </div>
    </footer>

export default Footer