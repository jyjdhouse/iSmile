module.exports = function isJSON(data) {
    try {
      JSON.parse(data);
      return true;
    } catch (error) {
      return false;
    }
  }