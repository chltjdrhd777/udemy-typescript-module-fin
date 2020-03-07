import { Component } from "./component.js";
import * as Validations from "../util/validation.js";
import { autoBind as Auto } from "../decorator/autobind.js";
import { projectState } from "../state/project-state.js";

//Input section
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement; // in constant "element", I can find something which has an ID "title" and populate it in titleInputElement
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler); // if I submit something, submitHandler would get started. But, if I send anything in submitHandler, Then, for it, "this" doesn't mean the class. So, I could add .bind/ but in this case, I would aplly decorator.
  }

  renderContent() {} // dummy content, because of the structure of component class. I could erase this if I get rid of renderContent() in inheriting Class.

  private gatherUserInput(): [string, string, number] | void {
    // it would be working like an input container/ and, the result of this function is to be [string,string,string]
    const enteredTilte = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;
    //In advance, I set the whole values which could be put

    const titleValidatable: Validations.Validatable = {
      value: enteredTilte,
      required: true
    };

    const descriptionValidatable: Validations.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5 // the description value should have more than 5 length
    };

    const peopleValidatable: Validations.Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1, // the people value should have more than 1
      max: 5
    };
    if (
      ////////////////////////////////////////////////////////////////////
      //one posible way but has some limitation
      /* enteredTilte.trim().length === 0 ||
    enteredDescription.trim().length === 0 ||
    enteredPeople.trim().length === 0 */
      //////////////////////////////////////////////////////////////////
      // alternative
      !Validations.validate(titleValidatable) ||
      !Validations.validate(descriptionValidatable) ||
      !Validations.validate(peopleValidatable) //if validate(titleValidatable) is not true or validate(descriptionValidatable) is not true or validate(peopleValidatable) is not true, then
    ) {
      alert("Invalid input, please try again");
      return;
    } else {
      return [enteredTilte, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  } // after values are sent, they would disappear.

  @Auto
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput(); // in other words, userInput = [enteredTilte,enteredDescription,+enteredPeople]
    if (Array.isArray(userInput)) {
      // Array.isArray('something') = is "something" an array?
      const [title, desc, people] = userInput; // it means that the key names are "title, desc, people" and the value of each key is things in userInput array
      projectState.addProject(title, desc, people); // projects: [{id,title,description,people}]
      this.clearInputs();
    }
  }
}
