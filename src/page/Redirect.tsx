import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
type RedirectProps = {
    to: string;
}
const Redirect : React.FC<RedirectProps> = ({to}) => {
    const navigate = useNavigate()
    useEffect(() => {
        console.log("redirect to", to)
        navigate(to);
    }, []);
    return null;
};

export default Redirect;