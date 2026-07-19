class DragAndDropPage {
  constructor(page) {
    this.page = page;
    this.columnA = page.locator('#column-a');
    this.columnB = page.locator('#column-b');
  }

  async goto() {
    await this.page.goto('/drag_and_drop');
  }

  async getColumnAText() {
    return await this.columnA.locator('header').innerText();
  }

  async getColumnBText() {
    return await this.columnB.locator('header').innerText();
  }

  async dragAToBWithMouse() {
    const sourceBox = await this.columnA.boundingBox();
    const targetBox = await this.columnB.boundingBox();

    await this.page.mouse.move(
      sourceBox.x + sourceBox.width / 2,
      sourceBox.y + sourceBox.height / 2
    );
    await this.page.mouse.down();
    await this.page.mouse.move(
      targetBox.x + targetBox.width / 2,
      targetBox.y + targetBox.height / 2,
      { steps: 10 }
    );
    await this.page.mouse.up();
  }
}

module.exports = { DragAndDropPage };