import React from "react";
import './projects.css';
import { projectsFCC, projectsOdin, persProjects } from "./projectList";

let uniqID = 0;

export default class Projects extends React.Component {
  createProjectTabs(projects) {
    return projects.map(project => {
      uniqID += 1;
      return [
        <input type="radio" id={`tab${uniqID}`} name="something" checked />,
        <label className="tabButton" for={`tab${uniqID}`}>{`${project.title} Page`}</label>,
        (
        <div className="tab">
          <div className="content">
            <div key={`project${uniqID}`} className="project">
              <div className="thumbnail-container left-column">
                <div className="thumbnail">
                  <img src={project.thumbnail} alt={`Thumbnail of ${project.title}`}/>
                </div>
              </div>
              <div className="right-column">
                <a href={project.url}><strong>{project.title}</strong></a>
                <p>
                  {project.shortDesc}
                </p>
                <p>
                  {project.longDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      )
      ]
    })
  }
  
  render() {
    return (
      <div>
        <h1>My Projects</h1>
        <p>
          The following projects were created by me while working through
          various courses as I learn web development. Generally speaking, 
          they go in chronological order with my first projects at the top
          and going down. Hopefully as you scroll you can see a progression
          in skill as sites get better with more practice.
        </p>
        <div className="tabsy">
          <input type="radio" id="freeCode" name="syllabus" checked />
          <label className="tabButton" for="freeCode">FreeCodeCamp</label>
          <div className="tab">
            <div className="content">
              <div className="tabsy">
                {this.createProjectTabs(projectsFCC)}
              </div>
            </div>
          </div>
          <input type="radio" id="odinProject" name="syllabus" />
          <label className="tabButton" for="odinProject">The Odin Project</label>
          <div className="tab">
            <div className="content">
              <div className="tabsy">
                {this.createProjectTabs(projectsOdin)}
              </div>
            </div>
          </div>
          <input type="radio" id="persProjects" name="syllabus" />
          <label className="tabButton" for="persProjects">Personal Project</label>
          <div className="tab">
            <div className="content">
              <div className="tabsy">
                {this.createProjectTabs(persProjects)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}