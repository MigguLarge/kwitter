import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
    authService.const[(isLoggedIn, setIsLoggedIn)] = useState(false);
    return (
        <>
            <AppRouter isLoggedIn={isLoggedIn} />
            <footer>&copy; {new Date().getFullYear()} Kwitter</footer>
        </>
    );
}

export default App;
