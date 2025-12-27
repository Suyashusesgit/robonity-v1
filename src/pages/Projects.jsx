import React from 'react';
import './Projects.css';

function Projects() {
    return (
        <div className="projects-page">
            <h1 className="page-header">Community Projects</h1>
            <p className="page-subtext">
                Here is a list of projects currently being developed by our community members.
            </p>

            {/* PROJECT GRID */}
            <div className="projects-grid">
                <div className="project-card">
                    <h3>Autonomous Mars Rover</h3>
                    <p>
                        A small-scale rover using a Raspberry Pi and AI for navigation.
                    </p>
                    <div className="project-tags">
                        <span>AI</span>
                        <span>Robotics</span>
                        <span>Embedded</span>
                    </div>
                </div>

                <div className="project-card">
                    <h3>RoboSoccer Team</h3>
                    <p>
                        Building a team of AI-powered robots for the upcoming RoboSoccer 2026.
                    </p>
                    <div className="project-tags">
                        <span>AI</span>
                        <span>Robotics</span>
                        <span>ML</span>
                    </div>
                </div>

                {/* ADD PROJECT CTA */}
                <div className="project-card add-project">
                    <h3>+ Add Your Project</h3>
                    <p>
                        Share your idea, get collaborators, and build together.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Projects;
