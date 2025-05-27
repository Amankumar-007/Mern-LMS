import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

export const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useSelector(store=>store.auth);

    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }

    return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export const AuthenticatedUser = ({children}) => {
    const {isAuthenticated} = useSelector(store=>store.auth);

    if(isAuthenticated){
        return <Navigate to="/"/>
    }

    return children;
}

AuthenticatedUser.propTypes = {
    children: PropTypes.node.isRequired,
};

export const AdminRoute = ({children}) => {
    const {user, isAuthenticated} = useSelector(store=>store.auth);

    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }

    if(user?.role !== "admin"){
        return <Navigate to="/"/>
    }

    return children;
}

AdminRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export const InstructorRoute = ({children}) => {
    const {user, isAuthenticated} = useSelector(store=>store.auth);

    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }

    if(user?.role !== "instructor"){
        return <Navigate to="/"/>
    }

    return children;
}

InstructorRoute.propTypes = {
    children: PropTypes.node.isRequired,
};