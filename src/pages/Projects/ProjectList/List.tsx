import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, DropdownItem, DropdownMenu, DropdownToggle, Input, Row, UncontrolledDropdown } from 'reactstrap';
import DeleteModal from "../../../Components/Common/DeleteModal";
import { ToastContainer } from 'react-toastify';
import { useGetEventsQuery } from '../../../redux/features/services/eventsServices';


//Import Icons
// import FeatherIcon from "feather-icons-react";

//import action
// import {
//     getProjectList as onGetProjectList,
//     deleteProjectList as onDeleteProjectList,
// } from "../../../slices/thunks";

const List = () => {


    const { data = [], isLoading, isError, error } = useGetEventsQuery(1);
 
    
    const  projectLists  =  data.results ?? []
    const [project, setProject] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);


    console.log(isLoading,data.results )
    
    console.log(projectLists || [] , 'projectlist' )
    useEffect(() => {
        console.log(isLoading,data )
        setProject(data.results);
    }, [data, isLoading, projectLists]);

    // delete
    const onClickData = (project: React.SetStateAction<null>) => {
        setProject(project);
        setDeleteModal(true);
    };

    const handleDeleteProjectList = () => {
        if (project) {
            // dispatch(onDeleteProjectList(project));
            setDeleteModal(false);
        }
    };

    const activebtn = (ele: any) => {
        if (ele.closest("button").classList.contains("active")) {
            ele.closest("button").classList.remove("active");
        } else {
            ele.closest("button").classList.add("active");
        }
    };

    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <DeleteModal
                show={deleteModal}
                onDeleteClick={() => handleDeleteProjectList()}
                onCloseClick={() => setDeleteModal(false)}
            />
            <Row className="g-4 mb-3">
                <div className="col-sm-auto">
                    <div>
                        <Link to="/apps-projects-create" className="btn btn-success"><i
                            className="ri-add-line align-bottom me-1"></i> Ajouter un evenement</Link>
                    </div>
                </div>
                <div className="col-sm-3 ms-auto">
                    <div className="d-flex justify-content-sm-end gap-2">
                        <div className="search-box ms-2 col-sm-7">
                            <Input type="text" className="form-control" placeholder="Search..." />
                            <i className="ri-search-line search-icon"></i>
                        </div>

                        <select  defaultValue={'Yesterday'} className="form-control w-md" data-choices data-choices-search-false>
                            <option value="All">All</option>
                            <option value="Last 7 Days">Last 7 Days</option>
                            <option value="Last 30 Days">Last 30 Days</option>
                            <option value="Last Year">Last Year</option>
                            <option value="This Month">This Month</option>
                            <option value="Today">Today</option>
                            <option value="Yesterday" >Yesterday</option>
                        </select>
                    </div>
                </div>
            </Row>

            <div className="row">
                {projectLists.map((item:any, index:number) => (
                    <React.Fragment key={index}>
                     
                                    <Col xxl={3} sm={6} className="project-card">
                                        <Card>
                                            <CardBody>
                                                <div  className={`p-3 mt-n3 mx-n3 bg-soft-secondary  rounded-top`}>
                                                    <div className="d-flex gap-1 align-items-center justify-content-end my-n2">
                                                        <button type="button" className={`btn avatar-xs mt-n1 p-0 favourite-btn ${item.ratingClass}`} onClick={(e) => activebtn(e.target)}>
                                                            <span className="avatar-title bg-transparent fs-15">
                                                                <i className="ri-star-fill"></i>
                                                            </span>
                                                        </button>
                                                        <UncontrolledDropdown>

                                                            <DropdownToggle tag="button" className="btn btn-link text-muted p-1 mt-n2 py-0 text-decoration-none fs-15">
                                                            <i className="ri-more-fill fs-17"></i>
                                                            </DropdownToggle>

                                                            <DropdownMenu className="dropdown-menu-end">
                                                                <DropdownItem href="/apps-projects-overview"><i className="ri-eye-fill align-bottom me-2 text-muted"></i> View</DropdownItem>
                                                                <DropdownItem href="/apps-projects-create"><i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit</DropdownItem>
                                                                <DropdownItem divider />
                                                                <DropdownItem href="#" onClick={() => onClickData(item)} data-bs-toggle="modal" data-bs-target="#removeProjectModal"><i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Remove</DropdownItem>
                                                            </DropdownMenu>
                                                        </UncontrolledDropdown>
                                                    </div>
                                                    <div className="text-center pb-3">
                                                        <img src={item.img} alt="" height="32" />
                                                    </div>
                                                </div>

                                                <div className="py-3">
                                                    <h5 className="fs-14 mb-3"><Link to="/apps-projects-overview" className="text-dark">{item.name}</Link></h5>
                                                    <Row className="gy-3">
                                                        <Col xs={6}>
                                                            <div>
                                                                <p className="text-muted mb-1">Lieu</p>
                                                                <div>{item.lieu}</div>
                                                            </div>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <div>
                                                                <p className="text-muted mb-1">Date</p>
                                                                <h5 className="fs-14">{item.date}</h5>
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <div className="d-flex align-items-center mt-3">
                                                        <p className="text-muted mb-0 me-2">Participants :</p>

                                                         <h5 className="fs-14 mb-0">{item.participants.length}</h5>
                                                       
                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-center  '>
                                                  <span> Status : </span>    <h5 className="ms-2 fs-14 mb-0">{item.is_active == true ? 'En cours ' : 'Terminé'}</h5>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                  
                        
                    </React.Fragment>
                ))}
                
            </div>
            <Row className="g-0 text-center text-sm-start align-items-center mb-4">
                    <Col sm={6}>
                        <div>
                            <p className="mb-sm-0 text-muted">Showing <span className="fw-semibold">1</span> to <span className="fw-semibold">10</span> of <span className="fw-semibold text-decoration-underline">12</span> entries</p>
                        </div>
                    </Col>

                    <Col sm={6}>
                        <ul className="pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0">
                            <li className="page-item disabled">
                                <Link to="#" className="page-link">Previous</Link>
                            </li>
                            <li className="page-item active">
                                <Link to="#" className="page-link">1</Link>
                            </li>
                            <li className="page-item ">
                                <Link to="#" className="page-link">2</Link>
                            </li>
                            <li className="page-item">
                                <Link to="#" className="page-link">3</Link>
                            </li>
                            <li className="page-item">
                                <Link to="#" className="page-link">4</Link>
                            </li>
                            <li className="page-item">
                                <Link to="#" className="page-link">5</Link>
                            </li>
                            <li className="page-item">
                                <Link to="#" className="page-link">Next</Link>
                            </li>
                        </ul>
                    </Col>
                </Row>
        </React.Fragment>
    );
};

export default List;