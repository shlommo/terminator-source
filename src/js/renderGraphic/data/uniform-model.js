const uniformVars = {
  GL_TIME_UNIFORM: null,
  GL_RESOLUTION_UNIFORM: null
};

class UniformModel {
  constructor(vars = uniformVars) {
    this.glTime = vars.GL_TIME_UNIFORM;
    this.glResolution = vars.GL_RESOLUTION_UNIFORM;
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
