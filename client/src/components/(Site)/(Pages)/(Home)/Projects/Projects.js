import './Projects.scss'
import Project from './Project'
//import {getFeaturedCases, getLastCases} from '@/context/Cases'
import Button from '@/components/(Site)/Button/Button'

const Projects = ({data, projects}) => {
    const lastCases = projects.success && true ? projects.data : null;
    return(
        <section className="pg-section pg-section-pd hp-projects bg-light">
            <div className="pj-wrap">
                <div className="container">
                    <div className="pj-wrapper sc-wrap">
                        <h2>{data?.['projects_title']?.['meta_value']}</h2>
                        <div className="sc-inner fx fx-jb">
                            <div className="sc-lcol">
                                <div className="sc-txt sc-txt-dk">
                                    <p>{data?.['projects_desc']?.['meta_value']}</p>
                                </div>
                            </div>
                            <div className="sc-rcol">
                                <Button 
                                    classList="btn-primary btn-primary-dk fx fx-ac fx-jc"
                                    link="/portfolio"
                                    buttonText={data?.['projects_btn']?.['meta_value']}
                                />
                            </div>
                        </div>
                        <div className="pj-row fx fx-wrap">
                            <div className="pj-slide-row fx fx-wrap">
                            {
                                Array.isArray(lastCases) && lastCases.length > 0 ? (
                                    lastCases.map((post, index) => (
                                        <Project 
                                            counter={index + 1}
                                            key={index}
                                            pId={post.id}
                                            project={post}
                                        />
                                    ))
                                ) : (
                                    <p>No posts were found</p>
                                )
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;