<template>
  <div class="not-found">
    <div class="container">
      <h1 class="title">403</h1>
      <p class="subtitle">Yetkisiz Erişim!</p>
      <p class="description">
        Erişmeye Çalıştığınız Sayfa İçin Yetkiniz Bulunmamaktadır!.
      </p>
      <router-link to="/" class="home-link">Ana Sayfaya Dön</router-link>
    </div>
  </div>
</template>
<script>
export default {
  setup() {
    return {};
  },
};
</script>
<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}
.container {
  text-align: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.title {
  font-size: 96px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #fd8d14;
}
.subtitle {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #444;
}
.description {
  font-size: 18px;
  margin-bottom: 20px;
  color: #666;
}
.home-link {
  display: inline-block;
  padding: 10px 20px;
  border: 2px solid #fd8d14;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  color: #fd8d14;
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;
}
.home-link:hover {
  background-color: #ff3860;
  color: #fff;
}
</style>
