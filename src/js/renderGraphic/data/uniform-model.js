class UniformModel {
  constructor() {
    this.glTime = null;
    this.glResolution = null;
  }

  get time() {
    return this.glTime;
  }

  set time(glTime) {
    this.glTime = glTime;
  }

  get resolution() {
    return this.glResolution;
  }

  set resolution(glResolution) {
    this.glResolution = glResolution;
  }
}

export default new UniformModel();
