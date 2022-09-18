class Cell {
  constructor(state, prevState = undefined, deadTime = 0) {
    this._state = state;
    this._prevState = prevState;
    this._deadTime = deadTime;
  }

  get state() {
    return this._state;
  }

  set state(state) {
    this._prevState = this._state;
    this._state = state;

    if (state === 1) {
      this._deadTime = 0;
    } else {
      if (this._prevState === 1 || this._deadTime > 0) {
        this._deadTime = this._deadTime + 1;
      }
    }
  }

  get deadTime() {
    return this._deadTime;
  }

  set deadTime(deadTime) {
    this._deadTime = deadTime;
  }

  get prevState() {
    return this._prevState;
  }

  set prevState(prevState) {
    this._prevState = prevState;
  }
}
