import React from 'react';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Container } from 'reactstrap';

import List from './List';

const ProjectList = () => {

    document.title = "Evenements | Velzon - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Listes des evenements" pageTitle="Evenements" />
                    <List />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ProjectList;