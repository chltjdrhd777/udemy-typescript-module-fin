import { Project, ProjectStatus } from "../models/project.js";
//Redundant component
type Listner<T> = (itmes: T[]) => void; // type name = ~~~ <--- which allows me to restrcit the result into assigned options. Ex) type test1 = 'a'|'b'|'c' then, const test2:test1 = 'a' or 'b' or 'c'. this is union type

class state<T> {
  protected listeners: Listner<T>[] = []; // protected : private but can be used in inheriting class

  addListener(listenerFn: Listner<T>) {
    this.listeners.push(listenerFn);
  }
}

//project state management :things that would be stored in projects array
export class ProjectState extends state<Project> {
  private projects: Project[] = []; //[{id,title,description,people,status}] when intantiated

  //singleton = the blueprint of instances which I would make from now on.
  private static instance: ProjectState; // ProjectState = {projects:[], addProject(title,description,numOfPeople),...}
  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }
  /////////////////////////////////////////////////

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject); // projects: [{id,title,description,people},........]
    this.updatedListeners();
  }

  //to move current project list to new thing
  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find(
      everything => everything.id === projectId
    ); //detect the firt thing which accords with the condition I set(everything.id === projectId)
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updatedListeners();
    }
  }

  private updatedListeners() {
    for (const listenerFn of this.listeners) {
      // to every function in listners, act with this.projects.slice() <--- this.projects.slice() is the copy of projects array.
      listenerFn(this.projects.slice());
    }
  }
}

export const projectState = ProjectState.getInstance(); //make one instance.
