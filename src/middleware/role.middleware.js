/**
 * Role-based access control middleware
    * Usage: roleCheck(["admin", "lecturer"])
 */
export const roleCheck = (allowedRoles = []) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: "User not authenticated",
                });
            }

            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied: insufficient permissions",
                });
            }

            next(); // User has allowed role, continue
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Role check failed",
                    error: error.message,
            });
        }
    };
};