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

## Yapı

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

## Orijinal Proje

Orijinal React/TypeScript projesi: https://www.figma.com/design/Umbek5IzbjKEwjsB36ylGz/Otonom-Siber-Operasyon-Aray%C3%BCz%C3%BC

## Lisans

Bu proje orijinal projenin Python versiyonudur.
