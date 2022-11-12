export class Import {
  public name: string;
  public path: string;
  public hasDefault: boolean;
  public hasNamespace: boolean;
  public named: string[];

  constructor(
    name: string,
    path: string,
    hasDefault: boolean,
    hasNamespace: boolean,
    named: string[]
  ) {
    this.name = name;
    this.path = path;
    this.hasDefault = hasDefault;
    this.hasNamespace = hasNamespace;
    this.named = named;
  }
}
