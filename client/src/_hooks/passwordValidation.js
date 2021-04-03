import {useEffect, useState} from "react";

export const usePasswordValidation = ({ password = "", password2 = "" }) => {
    const [match, setMatch] = useState(null);

    useEffect(() => {
        setMatch(password && password === password2);

    }, [password, password2]);
    return [match];
};

