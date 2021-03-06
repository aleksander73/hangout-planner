<template>
  <div class="container">
    <div class="intro">
      <div class="background"></div>
      <div class="heading-container">
        <div class="heading-row-1">
          <div class="title-container">
            <h1>Hangout planner</h1>
          </div>
          <div class="icon-container">
            <img src="../../assets/icons/coffee.svg">
          </div>
        </div>
        <div class="heading-row-2">
          <div  class="subtitle">
            <h3>Organize your hangouts effortlessly</h3>
          </div>
        </div>
      </div>
      <div class="authorize-buttons">
        <a href="/authorize">Log in</a>
        <a href="/authorize">Register</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.intro {
  align-items: center;
  background-size: cover;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100%;
}

.background {
  background-image: url('../../assets/background-image.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: inherit;
}

.heading-container {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 3vh;
  position: absolute;
}

.heading-row-1 {
  align-items: center;
  display: flex;
  height: 12vh;
  justify-content: center;
}

.title-container > h1 {
  font-size: 5em;
}

.icon-container {
  align-items: center;
  display: flex;
  height: 100%;
  margin-left: 3vh;
}

.icon-container > img {
  height: 75%;
}

.heading-row-2 {
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 2vh;
}

.subtitle {
  font-size: 1.5em;
}

.authorize-buttons {
  display: flex;
  justify-content: space-around;
  margin: 1vh 3vh;
  position: absolute;
  right: 0;
  top: 0;
}

.authorize-buttons > a {
  margin: 1em 1.5em;
  text-decoration: none;
}
</style>

<script>
export default {
  data() {
    return {
      
    }
  }
}
</script>
