class UniformModel {
  constructor() {
    this.glTime = null;
    this.glResolution = null;
    this.glAudioPower = null;
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

  get audioPower() {
    return this.audioPower;
  }

  set audioPower(audioPower) {
    this.glAudioPower = audioPower;
  }
}

export default new UniformModel();
