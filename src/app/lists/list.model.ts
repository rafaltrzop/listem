export class List {
  constructor(
    public name: string,
    public softDeleted?: boolean
  ) {
    this.softDeleted = softDeleted || false;
  }
}
