const logoutHandler = async (req, res) => {
    res.cookie('token', 'Logout', {
        // maxAge:1,
        expires: new Date(0),
        httpOnly: true,       // Prevents JavaScript access to the cookie
        // secure: false,        // Set to true if using HTTPS
        // sameSite: 'lax',      // Provides CSRF protection
        path: '/'             // The path must be a relative path
    });

    console.log('Set-Cookie header:', res.getHeader('Set-Cookie'));

    res.status(200).json({ message: "Logout successful" });
};

module.exports = { logoutHandler };
