import { Import } from "./Import";
import { TracingNode } from "./TracingNode";

class ParsedFile {
  public path: string;
  imports: Import[] = [];
  components: TracingNode[] = [];
  exports: any = [];

  constructor(path: string) {
    this.path = path;
  }

  public hasComponents(): boolean {
    return this.components.length > 0;
  }
}
export default ParsedFile;
