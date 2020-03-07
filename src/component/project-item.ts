import { Draggable } from "../models/drag-drop.js";
import { Component } from "./component.js";
import { Project } from "../models/project.js";
import { autoBind } from "../decorator/autobind.js";

//because, class "ProjectItem" extends Component...
//ProjectItem class
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  private project: Project; //{id,title,.....,status}

  //getter for checking plurality and singularity

  get howMany() {
    if (this.project.people === 1) {
      return "1 person";
    } else {
      return `${this.project.people} persons`;
    }
  }

  constructor(hostId: string, project: Project) {
    //when initiated, this constructor's parameter would forward hostId to super(Component class's constructor)
    super("single-project", hostId, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }

  /////////implemented interface "Draggable"
  @autoBind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id); //dataTransfer.setData(the type of drag data, the data) // moving data
    event.dataTransfer!.effectAllowed = "move"; //dragged one itself would be moved
  }

  dragEndHAndler(_: DragEvent) {
    console.log("Dragfinished");
  }
  ////////////////

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHAndler);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title; //this.element = <li> in single project template //in <h2>, things I type in the title bar would be stored
    this.element.querySelector("h3")!.textContent = this.howMany + " assgined"; // getter do not have to get parentheses
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
