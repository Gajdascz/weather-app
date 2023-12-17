function settings({
  gifs = 'on',
  bg = 'on',
  temp = 'f',
  precip = 'in',
  pressure = 'in',
  distance = 'miles',
  speed = 'mph'
} = {}) {
  let _gifs = gifs;
  let _bg = bg;
  let _temp = temp;
  let _precip = precip;
  let _pressure = pressure;
  let _distance = distance;
  let _speed = speed;
  const savedLocations = [];
  return {
    get gifs() {
      return _gifs;
    },
    set gifs(status) {
      _gifs = status;
    },
    get bg() {
      return _bg;
    },
    set bg(status) {
      _bg = status;
    },
    get temp() {
      return _temp;
    },
    set temp(newTemp) {
      _temp = newTemp;
    },
    get precip() {
      return _precip;
    },
    set precip(newPrecip) {
      _precip = newPrecip;
    },
    get pressure() {
      return _pressure;
    },
    set pressure(newPressure) {
      _pressure = newPressure;
    },
    get distance() {
      return _distance;
    },
    set distance(newDistance) {
      _distance = newDistance;
    },
    get speed() {
      return _speed;
    },
    set speed(newSpeed) {
      _speed = newSpeed;
    },
    get savedLocations() {
      return savedLocations;
    }
  };
}

export { settings };
