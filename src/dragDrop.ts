import { ProjectInput } from "./component/project-input.js";
import { ProjectList } from "./component/project-list.js";

//encompass the whole codes inside namespace App{}
//and then, It doesn't matter any more if I instantiate classes by putting like "const ~~~ =" just "new ~~~" is enough
// to compile all reference files into one javascript file, go to tsconfig.json and activate "outfile", then set "amd" in lib

//Project Type = to separate the values stored in both activate bar and finishied bar

new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
