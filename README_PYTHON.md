# Midas Pro - Otonom Siber Operasyon Arayüzü (Python CustomTkinter)

Bu proje, Otonom Siber Operasyon Arayüzü'nün Python CustomTkinter ile yeniden yazılmış versiyonudur.

## Özellikler

- **Splash Screen**: Animasyonlu başlangıç ekranı
- **Ana Panel (Dashboard)**: Ağ grafiği görselleştirmesi ve tehdit izleme
- **Workflow Orkestrasyon**: İş akışı yönetimi (yakında)
- **Expert Intelligence**: Zeka analizi paneli (yakında)
- **Modern Karanlık Tema**: Orijinal tasarıma sadık renkler ve stil
- **Yan Menü Navigasyonu**: Kolay gezinme için ikonlu kenar çubuğu

## Kurulum

### Gereksinimler

- Python 3.8 veya üzeri
- pip (Python paket yöneticisi)

### Adımlar

1. Gerekli paketleri yükleyin:

```bash
pip install -r requirements.txt
```

veya manuel olarak:

```bash
pip install customtkinter Pillow
```

## Çalıştırma

Uygulamayı başlatmak için:

```bash
python app.py
```

veya otomatik kontrol ile:

```bash
python run.py
```

**Not:** Tkinter sistem düzeyinde bir GUI kütüphanesidir ve işletim sistemine bağlı olarak ayrıca yüklenmesi gerekebilir:

- **Ubuntu/Debian**: `sudo apt-get install python3-tk`
- **Fedora**: `sudo dnf install python3-tkinter`
- **macOS**: Python ile birlikte gelir
- **Windows**: Python ile birlikte gelir

## Yapı

### Ekran Görüntüleri

Uygulama şu ekranlardan oluşur:

1. **Splash Screen** (Başlangıç Ekranı)
   - Animasyonlu logo (M logosu)
   - İlerleme çubuğu
   - "Midas Pro" başlığı
   - Alt başlık: "AUTONOMOUS CYBER OPERATIONS COMMAND CENTER"

2. **Ana Pencere**
   - Özel başlık çubuğu (macOS stili pencere kontrolleri)
   - Sol kenar çubuğu (navigasyon)
   - Ana içerik alanı

3. **Dashboard (Komut Paneli)**
   - Sol: Ağ grafiği görselleştirmesi (6 kategori)
   - Sağ: Aktivite ve tehdit istatistikleri

4. **Workflow** (İş Akışı)
   - Yakında gelecek mesajı

5. **Intelligence** (İstihbarat)
   - Yakında gelecek mesajı

### Ana Bileşenler

- **SplashScreen**: İlk yükleme ekranı (progress bar ile)
- **MidasProApp**: Ana uygulama penceresi
- **CommandPanel**: Dashboard görünümü (ağ grafiği ve aktivite akışı)
- **NetworkGraph**: Canvas üzerinde ağ görselleştirmesi
- **OrchestrationWorkflow**: İş akışı yönetim ekranı
- **ExpertIntelligence**: İstihbarat analiz ekranı

### Renkler

Orijinal tasarımla aynı renk paleti kullanılmıştır:

- Arka plan: `#0a0a0f`, `#0f0f14`, `#121218`
- Kenarlıklar: `#1e1e24`, `#2d2d35`
- Altın vurgu: `#d4af37`, `#ffd700`
- Cyan: `#00d4ff`
- Kırmızı: `#ff3366`
- Mavi: `#4a9eff`
- Mor: `#a855f7`

## Dönüşüm Detayları

Bu Python uygulaması, orijinal React/TypeScript projesinin tam bir dönüşümüdür:

### React → CustomTkinter Eşlemeleri

| React Bileşeni | CustomTkinter Karşılığı | Notlar |
|---------------|------------------------|--------|
| `<div>` | `CTkFrame` | Konteyner bileşeni |
| `<button>` | `CTkButton` | Buton bileşeni |
| `<span>`, `<p>` | `CTkLabel` | Metin gösterimi |
| `<canvas>` | `Canvas` (tkinter) | Grafik çizimi için |
| CSS classes | `fg_color`, `text_color` | Stil özellikleri |
| `useState` | Sınıf değişkenleri | Durum yönetimi |
| `useEffect` | `after()` metodu | Animasyonlar için |

### Özellikler

- ✅ Tam renkli tema uyumluluğu
- ✅ Animasyonlu splash screen
- ✅ Ağ grafiği görselleştirmesi (Canvas kullanarak)
- ✅ Responsive layout (flex benzeri yerleşim)
- ✅ Tab/View geçişleri
- ✅ Scrollable frame'ler (aktivite akışı için)
- ✅ Custom başlık çubuğu
- ✅ Icon-based navigation

### Teknik Notlar

1. **CustomTkinter**: Modern ve kullanımı kolay bir Tkinter wrapper
2. **Canvas**: Ağ grafiği için native tkinter Canvas kullanıldı
3. **Animasyonlar**: `after()` metodu ile frame-by-frame animasyon
4. **Renkler**: Orijinal Tailwind CSS renkleri HEX formatında tanımlandı
5. **Layout**: Pack geometry manager ile responsive layout

## Orijinal Proje

Orijinal React/TypeScript projesi: https://www.figma.com/design/Umbek5IzbjKEwjsB36ylGz/Otonom-Siber-Operasyon-Aray%C3%BCz%C3%BC

## Lisans

Bu proje orijinal projenin Python versiyonudur.
