export const validateInputs = ({
    username, 
    password
}: {
    username: string;
    password: string;
}) => {
    if (
        typeof username !== "string" ||
        username.length < 3 ||
        username.length > 31 ||
        !/^[a-z0-9_-]+$/.test(username) ||
        typeof password !== "string" ||
        password.length < 6 ||
        password.length > 255
    ) {
        return {
            success: false,
            message: "Invalid credentials"
        };
    }

    return { 
        success: true, 
        message: ""
    };
};