export enum ProjectStatus { // enum is like using an object as a type. If one constant have ProjectStatus type, it's value is restricted into "Active" or "Finished"
  Active,
  Finished
}

export class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {
    // parameter "status" should be "Active" or "Finished"
  }
}
