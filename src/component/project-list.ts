import { Project } from "../models/project.js";
import { Component } from "./component.js";
import { autoBind } from "../decorator/autobind.js";
import { DragTarget } from "../models/drag-drop";
import { projectState } from "../state/project-state.js";
import { ProjectStatus } from "../models/project.js";
import { ProjectItem } from "./project-item.js";

//ProjectList Class
export class ProjectList extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
  assignedProjects: Project[];
  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  /////drop definition
  @autoBind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      //restrict the things that could be dropped
      event.preventDefault(); // in drag and drop event, only available event is dropping. but on the place of dragover, drop means "return default" which means not dropping. so prevent this.
      //dragover = allows me to change the things when my dragged one is passing
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable"); // according to css definition, color of activ and finished bar changes
    }
  }

  @autoBind
  dropHandler(event: DragEvent) {
    const prjId = event.dataTransfer!.getData("text/plain"); // getData('text/plain') = what does this type carry?
    projectState.moveProject(
      prjId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  @autoBind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable"); // when the dragged list leaves the droppable point, color turn back to original condition
  }

  //////////////

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);
    projectState.addListener((projects: Project[]) => {
      //filter
      const relevantProjects = projects.filter(prj => {
        // target.filter(elements => condition), making new array with elements inside the target array only if pass through the condition.
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active; //[{...status:Active},{...status:Active},......]
        }
        return prj.status === ProjectStatus.Finished; // [{...status:Finished},{...status:Finished},......]
      });

      this.assignedProjects = relevantProjects;
      this.renderProjects();
    }); //function addListener(project=>{this.assignedProjects = projects; this.renderProjects}) is stored in Listeners array. [addListener(), ...], then, It is activated because of for()
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId; //I selected the unlisted order tag in project list template and I put the id which is activated-projects-list or finished-projects-list
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + "PROJECTS"; // it would be 'ACTIVE PROJECTS' or 'FINISHIED PROJECTS'
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list` // <ul> in the section of project's template
    )! as HTMLUListElement;
    listEl.innerHTML = "";

    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
    }
  }
}
