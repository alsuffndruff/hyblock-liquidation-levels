# Hyblock Liquidation Levels

Experimentelle Pine-Script-Indikatoren zur Untersuchung OI-basierter Liquidationslevel auf `BINANCE:BTCUSDT.P` im normalen 15-Minuten-Chart.

## Dateien

- [OI-/Footprint-Datentest v0.1](cws-oi-footprint-diagnostic-v0.1.pine): separater Diagnoseindikator für Open Interest, Footprint-Volumen, Delta und Datenabdeckung. TradingView Premium oder Ultimate erforderlich.
- [Anleitung und Prüfgrenzen](cws-datentest-anleitung.md): Einrichtung, Einheitenprüfung und Interpretation.
- [CWS Liquidation Levels v1.2](cws-liquidation-levels-v1.2-original.pine): unveränderte Referenzfassung mit OI-basierten geschätzten Levels.

## Aktueller Stand

Der nächste Schritt ist die Prüfung des Datentests im TradingView Pine-Editor und auf dem Zielchart. Der Datentest wurde noch nicht in TradingView kompiliert oder ausgeführt. Mark Price, Funding und tatsächliche Liquidationsdaten sind darin noch nicht integriert.

OI-Zuwachs und Footprint-Delta belegen keine einzelne Position, keinen tatsächlichen Hebel und keine zukünftige Liquidation. Footprint-Buy/Sell beruht auf TradingViews Volumenklassifikation. Die Ähnlichkeit mit Hyblock ist noch nicht quantitativ validiert.
