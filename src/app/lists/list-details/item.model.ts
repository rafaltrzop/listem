export class Item {
  constructor(
    public name: string,
    public checked?: boolean
  ) {
    this.checked = checked || false;
  }
}
