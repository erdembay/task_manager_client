# Projeyi Ayağa Kaldırma
Aşağıdaki adımları izleyerek projeyi yerel ortamınızda çalıştırabilirsiniz.

## Gereksinimler
- Node.js
- npm

## Kurulum
### Projeyi Klonlama
    ```sh
    git clone https://github.com/erdembay/task_manager_client.git
    cd task_manager_client
    ```

### Bağımlılıkları Yükleme
    ```sh
    npm install
    ```
### Ortam Değişkenlerini Ayarlama
Proje kök dizininde `.env` dosyasında api bağlantılarını düzenleyiniz.

## Geliştirme Ortamı

Geliştirme sunucusunu başlatmak için:
```sh
npm run serve
```

Tarayıcınızda `http://localhost` adresine giderek uygulamayı görüntüleyebilirsiniz.

## Build

Projeyi üretim ortamı için derlemek için:
```sh
npm run build
```

Bu komut, `build` klasöründe optimize edilmiş üretim paketini oluşturacaktır.
Projenin düzgün çalışması ve görüntülenebilmesi için sunucu ayarları `ngnix.conf` vs. dosyaların düzgün yapılandırılmış olması gerekmektedir.
