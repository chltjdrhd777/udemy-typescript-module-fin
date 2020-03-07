export class Component {
    constructor(templateId, hostElementId, insertStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertStart);
    }
    attach(insertStart) {
        this.hostElement.insertAdjacentElement(insertStart ? "afterbegin" : "beforeend", this.element);
    }
}
//# sourceMappingURL=component.js.map