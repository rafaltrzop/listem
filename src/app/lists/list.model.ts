export class List {
  constructor(
    public name: string,
    public ownersCount?: number,
    public softDeleted?: boolean
  ) {
    this.ownersCount = ownersCount || 1;
    this.softDeleted = softDeleted || false;
  }
}
