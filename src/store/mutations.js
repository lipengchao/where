export default {
  // try 为了防止用户关闭localStorage报错
  changeCity (state, city) {
    state.city = city
    try {
      localStorage.city = city
    } catch (e) {
      console.log(e)
    }
  }
}
