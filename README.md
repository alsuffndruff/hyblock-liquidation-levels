# Hyblock Liquidation Levels

Experimentelle Pine-Script-Indikatoren zur Untersuchung OI-basierter Liquidationslevel auf `BINANCE:BTCUSDT.P` im normalen 15-Minuten-Chart.

## Dateien

- [CWS Liquidation Levels v1.3 – Footprint-Experiment](cws-liquidation-levels-v1.3-experimental.pine): OI-/Footprint-Regel mit kontrolliertem Vergleichsmodus.
- [v1.3 einrichten und vergleichen](cws-v1.3-anleitung.md): Einstellungen, Vergleichsmethode und Grenzen.

- [OI-/Footprint-Datentest v0.1](cws-oi-footprint-diagnostic-v0.1.pine): separater Diagnoseindikator für Open Interest, Footprint-Volumen, Delta und Datenabdeckung. TradingView Premium oder Ultimate erforderlich.
- [Anleitung und Prüfgrenzen](cws-datentest-anleitung.md): Einrichtung, Einheitenprüfung und Interpretation.
- [CWS Liquidation Levels v1.2](cws-liquidation-levels-v1.2-original.pine): unveränderte Referenzfassung mit OI-basierten geschätzten Levels.

## Aktueller Stand

Der Nutzer hat den OI-/Footprint-Datentest erfolgreich auf dem Zielchart ausgeführt. Beide Datenquellen waren für 6.667 von 22.808 geladenen Kerzen gemeinsam vorhanden. Der nächste Schritt ist die Prüfung der experimentellen v1.3 im TradingView Pine-Editor und der kontrollierte Vergleich ihrer beiden Modellmodi. v1.3 wurde durch den Agenten noch nicht in TradingView kompiliert oder ausgeführt. Mark Price, Funding und tatsächliche Liquidationsdaten sind noch nicht integriert.

OI-Zuwachs und Footprint-Delta belegen keine einzelne Position, keinen tatsächlichen Hebel und keine zukünftige Liquidation. Footprint-Buy/Sell beruht auf TradingViews Volumenklassifikation. Die Ähnlichkeit mit Hyblock ist noch nicht quantitativ validiert.
