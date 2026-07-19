class FileUploadPage {
  constructor(page) {
    this.page = page;
    this.fileInput = page.locator('#file-upload');
    this.uploadButton = page.locator('#file-submit');
    this.uploadedFileName = page.locator('#uploaded-files');
    this.pageHeading = page.locator('h3');
  }

  async goto() {
    await this.page.goto('/upload');
  }

  async uploadFile(filePath) {
    await this.fileInput.setInputFiles(filePath);
    await this.uploadButton.click();
  }

  async isUploadSuccessful() {
    await this.pageHeading.waitFor({ state: 'visible' });
    const headingText = await this.pageHeading.innerText();
    return headingText.includes('File Uploaded!');
  }

  async getUploadedFileName() {
    await this.uploadedFileName.waitFor({ state: 'visible' });
    return await this.uploadedFileName.innerText();
  }
}

module.exports = { FileUploadPage };