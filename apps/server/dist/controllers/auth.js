const registerUser = async (_req, res) => {
    res.status(200).json({ message: "Register endpoint" });
};
const loginUser = async (_req, res) => {
    res.status(200).json({ message: "Login endpoint" });
};
export default {
    registerUser,
    loginUser,
};
//# sourceMappingURL=auth.js.map