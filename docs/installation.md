# Installation und Konfiguration von v1.7.1

## Installation

Die aktuelle Pine-Datei als neues Indikatorskript im TradingView-Pine-Editor öffnen, speichern und `BINANCE:BTCUSDT.P` hinzufügen. Für reproduzierbare Vergleiche alte Instanzen entfernen oder deaktivieren. Bereits gespeicherte Eingaben können bei einer Aktualisierung erhalten bleiben; für die neuen Vorgaben eine neue Instanz verwenden oder Eingaben zurücksetzen.

## Vorgaben

| Einstellung | Vorgabe |
|---|---|
| Ereignismodell | OI+CVD |
| Einstiegsannahme | Close |
| Statistikfenster | 150 Chartkerzen |
| CVD-Länge | 30 Chartkerzen |
| Mindestscore | 1,2 |
| Mindest-OI-Zunahme | 1 Mio. USD |
| Abstand gleiche Seite/gleicher Hebel | 400 USD |
| Abstand gleiche Seite/anderer Hebel | 50 USD |
| Seitenhypothese | Both sides |
| Analysebeginn | 17.10.2026 00:00 UTC |
| Einheitliche Linienbreite | 3 |
| Preislabels auf der Skala | ein |
| Diagnosefenster | aus |

Das Datum und alle Fenster sind Modellparameter. Ein anderer Analysebeginn verändert den Bestand und spätere Deduplizierung. Die Fenster werden nicht automatisch auf eine gleichbleibende Uhrzeitdauer umgerechnet.

## Darstellung

Es gibt keine Textlabel-Objekte direkt an den Linien. Aktive Preise stehen auf der Skala: Long grün, Short rot. Historische HIT/GAP/AGE-Linien bleiben erhalten, ohne aktive Skalenlabels.

19 Datenplots und 45 Skalenplots belegen das Pine-Limit von 64 Plot-Counts. Es gibt höchstens 22 Long- und 23 Short-Labels; bei Überschreitung werden kursnähere aktive Level bevorzugt. Alle übrigen Linien bleiben bestehen. Enge Preise können abhängig vom Zoom überlagern.

Falls Skalenlabels fehlen, im Indikator unter Stil die Labels auf der Preisskala und gegebenenfalls in den globalen Chart-Einstellungen aktivieren. Den Indikator gegebenenfalls derselben rechten Preisskala wie BTC zuordnen.

Das gesamte Diagnosefenster wird unter **Analysis → Show diagnostic panel** eingeschaltet. Die Anzeigeoption beeinflusst weder Skalenlabels noch Berechnung oder CSV-Export. Bei ausgeschaltetem Fenster stehen Hinweise zu fehlenden Daten nur nach Einschalten zur Verfügung.

## Weitere Zeitrahmen

| Chartauflösung | Delta-Schätzung |
|---|---|
| 1m | aus der Chartkerze |
| Größer als 1m bis einschließlich 4h | 1m-Intrabars |
| Größer als 4h bis einschließlich 1D | 5m-Intrabars |
| Größer als 1D bis einschließlich 1W | 60m-Intrabars |
| Größer als 1W | 240m-Intrabars |

Minuten-, Tages-, Wochen- und Monatsauflösungen werden zugelassen. Sekunden-/Tick-Charts und nicht standardmäßige Kerzen sind keine unterstützten Zielkontexte. Eine leere OI-/Intrabar-Historie kann die Erzeugung verhindern. Für OI+CVD müssen das OI-Statistikfenster und die vollständige Delta-Historie verfügbar sein. Besonders sehr große Perioden können mangels ausreichender Historie keine Signale liefern.

Nur der 15m-Stand wurde gegen die vorhandenen Referenzbilder verglichen. Auf 1m oder anderen Perioden entsteht jeweils ein eigener, unkalibrierter Bestand. Die größere Bar-Größe, ein anderes Delta-Raster und andere Beobachtungsfenster können Anzahl und Preise stark verändern. Ein Wechsel des Chartintervalls bewahrt nicht denselben 15m-Bestand.

## Export

Die Ereignis- und OI-Spalten bleiben enthalten. Der redundante Export `Aligned OI` wurde durch `Delta resolution seconds` ersetzt; `TV OI raw (confirmed)` bleibt die OI-Quelle. Der Delta-Anteil heißt jetzt `Estimated delta share (adaptive TF)`. CSV-Auswerter müssen gegebenenfalls diese Spaltennamen berücksichtigen. Die Chartauflösung ist über die CSV-Zeitstempel erkennbar.

## Noch offen

Lokale Quell-, Plotbudget-, Slot- und Intrabar-Grenzprüfungen sind erfolgt. Ein TradingView-Compilerlauf und die visuelle Prüfung der aktuellen Version sind noch offen unter [#4](https://github.com/alsuffndruff/hyblock-liquidation-levels/issues/4). Eine höhere Preisabdeckung ist ein gesondertes Forschungsziel unter [#5](https://github.com/alsuffndruff/hyblock-liquidation-levels/issues/5).

## Offizielle Dokumentation

- [Plot-Darstellung](https://www.tradingview.com/pine-script-docs/visuals/plots/)
- [Pine-Limits](https://www.tradingview.com/pine-script-docs/writing/limitations/)
- [Intrabar-Anfragen](https://www.tradingview.com/pine-script-docs/concepts/other-timeframes-and-data/)
- [Sichtbarkeit von Indikatorlabels](https://www.tradingview.com/support/solutions/43000659666-i-want-to-hide-the-values-of-individual-indicators/)
