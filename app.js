
const lyricsEl = document.getElementById("lyrics");

function startQRScanner() {
  const html5QrCode = new Html5Qrcode("reader");
  const config = { fps: 10, qrbox: 250 };

  html5QrCode.start(
    { facingMode: "environment" },
    config,
    async (decodedText) => {
      html5QrCode.stop();
      lyricsEl.textContent = "🔄 Carregando letra...";

      try {
        const res = await fetch(decodedText);
        if (!res.ok) throw new Error("Erro ao carregar");
        const text = await res.text();
        lyricsEl.textContent = text;
      } catch (err) {
        lyricsEl.textContent = "❌ Não foi possível carregar a letra.";
        console.error(err);
      }
    },
    (err) => {
      console.warn(`QR Scan error: ${err}`);
    }
  );
}

window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(() => {
      console.log("✅ Service Worker registrado!");
    });
  }
  startQRScanner();
});
