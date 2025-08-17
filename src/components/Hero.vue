
<template>
  <section class="Hero">
    <div class="Hero__content">
      <span><h1>Vue Notes</h1></span>
      <h1>Open Source Project for dynamic notes</h1>
      <h3>Visual Storage of notes like nodes</h3>
      <div class="Hero__buttons">
       <router-link to="/login"> <v-btn variant="tonal" rounded="xl" color="green-lighten-1" size="large" >Sign In</v-btn></router-link>
        <v-btn variant="tonal" rounded="xl" size="large" href="https://github.com/Diego-Garza2007/Vue-Notes">View repo on Github</v-btn>
      </div>
    </div>
    <div class="Hero__Image">
      <div class="Hero__blob blob1"></div>
      <div class="Hero__blob blob2"></div>
      <img src="/biglogo.png" alt="Logo de vue notes">
    </div>

  </section>

      <!-- Nueva sección de cajas -->
    <div class="Hero__Boxes">
      <v-card class="Hero__Box" elevation="6" color="surface">
        <v-card-title class="Hero__Box-title">Dynamic Notes</v-card-title>
        <v-card-text>
          Create and organize your notes visually, connecting ideas like nodes in a diagram.
        </v-card-text>
      </v-card>

      <v-card class="Hero__Box" elevation="6" color="surface">
        <v-card-title class="Hero__Box-title">Cross Platform</v-card-title>
        <v-card-text>
          Access your notes from any device and sync your information in real time.
        </v-card-text>
      </v-card>

      <v-card class="Hero__Box" elevation="6" color="surface">
        <v-card-title class="Hero__Box-title">Open Source</v-card-title>
        <v-card-text>
          An open project that you can modify and improve according to your needs.
        </v-card-text>
      </v-card>
    </div>
</template>

<style lang="scss" scoped>
.Hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  max-width: 1200px;
  margin: 50px auto;
  padding: 0 20px;
  position: relative;

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;

    & h1 {
      font-size: 48px;
      line-height: 1.2;
      margin: 0;
    }

    & span h1 {
      background: linear-gradient(270deg, #42b883, #256fbe, #42b883);
      background-size: 400% 400%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: gradientShift 6s ease infinite;
      font-weight: bold;
    }

    & h3 {
      color: #666;
      font-weight: 400;
    }
  }

  &__buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
      
  }

  &__Image {
    position: relative;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      position: relative;
      width: 450px;
      max-width: 100%;
      z-index: 2;
    }
  }

  &__blob {
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    filter: blur(100px);
    z-index: 1;
  }

  .blob1 {
    background: #42b883;
    top: -25px;
    left: -25px;
  }

  .blob2 {
    background: #256fbe;
    bottom: -25px;
    right: -25px;
  }
}


@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}


.Hero__Boxes {
  display: flex;
  gap: 24px;
  margin-top: 50px;
  flex-wrap: wrap; /* Para que sea responsivo en móviles */
  justify-content: center;

  .Hero__Box {
    flex: 1;
    min-width: 250px;
    max-width: 350px;
    padding: 20px;
    border-radius: 16px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 32px rgba(0,0,0,0.2);
    }

    .Hero__Box-title {
      font-weight: 700;
      font-size: 1.25rem;
      margin-bottom: 12px;
    }

    v-card-text {
      color: var(); /* compatible con modo oscuro/claro */
    }
    }
}


@media (max-width: 900px) {
  .Hero {
    flex-direction: column;
    text-align: center;

    &__content {
      align-items: center;
    }

    &__buttons {
      justify-content: center;
    }
  }
}
</style>
