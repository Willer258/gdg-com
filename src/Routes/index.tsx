import React from 'react';
import { Routes, Route } from "react-router-dom";

// Layouts
import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "../Layouts/index";

// Routes
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
// import { AuthProtected } from './AuthProtected';

const Index: React.FC = () => {
    return (
        <React.Fragment>
            <Routes>
                <Route path="/">
                    {publicRoutes.map((route, idx) => (
                        <Route
                            path={route.path}
                            element={
                                <NonAuthLayout>
                                    {route.component}
                                </NonAuthLayout>
                            }
                            key={idx}
                            
                        />
                    ))}
                </Route>

                <Route path="/">
                    {authProtectedRoutes.map((route, idx) => (
                        <Route
                            path={route.path}
                            element={
                                // <AuthProtected>   </AuthProtected>
                                    <VerticalLayout>{route.component}</VerticalLayout>
                              
                            }
                            key={idx}
                            
                        />
                    ))}
                </Route>
            </Routes>   
        </React.Fragment>
    );
};

export default Index;
