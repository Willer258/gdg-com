import  { useEffect } from 'react';
import withRouter from '../Components/Common/withRouter';

//redux

const NonAuthLayout = ({ children }:any) => {
    const layoutModeType:any  = 'light'

    useEffect(() => {
        if (layoutModeType === "dark") {
            document.body.setAttribute("data-layout-mode", "dark");
        } else {
            document.body.setAttribute("data-layout-mode", "light");
        }
        return () => {
            document.body.removeAttribute("data-layout-mode");
        };
    }, [layoutModeType]);
    return (
        <div>
            i
            {children}
        </div>
    );
};

export default withRouter(NonAuthLayout);