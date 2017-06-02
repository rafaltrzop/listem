export class Item {
  constructor(
    public name: string,
    public description?: string,
    public checked?: boolean
  ) {
    this.checked = checked || false;
  }
}
