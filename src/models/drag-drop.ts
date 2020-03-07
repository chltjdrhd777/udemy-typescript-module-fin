//Drag & Drop
//namespace "whatevername" {} = the keyword to initiate the connection of this file and another file. it means the boundary of this namespace App{} is applied from where to where.
export interface Draggable {
  // "export" is trigger meaning getting ready. In the target file, I can use "///<reference path="drag-drop-interfaces.ts"/>"
  dragStartHandler(event: DragEvent): void;
  dragEndHAndler(event: DragEvent): void;
}

export interface DragTarget {
  dragOverHandler(event: DragEvent): void; // validator for the target to be dragged
  dropHandler(event: DragEvent): void; //actual dropper
  dragLeaveHandler(event: DragEvent): void; // preventor about unwanted actions
}
