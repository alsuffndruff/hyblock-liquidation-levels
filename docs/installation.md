# Installation und Konfiguration von v1.9

## Installation

Die aktuelle Pine-Datei als neues Indikatorskript im TradingView-Pine-Editor öffnen, speichern und `BINANCE:BTCUSDT.P` hinzufügen. Für reproduzierbare Vergleiche alte Instanzen entfernen oder deaktivieren. Bereits gespeicherte Eingaben können bei einer Aktualisierung erhalten bleiben; für die neuen Vorgaben eine neue Instanz verwenden oder Eingaben zurücksetzen.

Für die normale Anzeige **Chart** verwenden: bis zu 32 gemeinsame, passend gefärbte Preislabels. Für eine CSV-Auswertung mit den bisherigen 19 OI-/Ereignisspalten stattdessen die **Export**-Fassung mit denselben Berechnungsparametern verwenden: bis zu 22 gemeinsame Farbplätze. Nicht beide Fassungen gleichzeitig hinzufügen, da sonst die Level-Linien doppelt berechnet/gezeichnet werden. Beide Dateien haben dieselben Modellregeln; sie unterscheiden sich im Plotbudget und Datenexport.

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
| Long-/Short-Linienfarbe | Türkis / Korall, frei wählbar |
| Legendenschrift | Groß (16) |
| Zahlenschrift | Normal (16) |
| Breite je Legendenhälfte | 12 % der Chartfläche, links/rechts gleich |
| Preislabels auf der Skala | ein |
| Kleine Farblegende | ein |
| OI-Größenlabels in der Linienmitte | aus |
| Diagnosefenster | aus |

Das Datum und alle Fenster sind Modellparameter. Ein anderer Analysebeginn verändert den Bestand und spätere Deduplizierung. Die Fenster werden nicht automatisch auf eine gleichbleibende Uhrzeitdauer umgerechnet.

## Darstellung

Aktive Preise auf der Skala verwenden dieselbe Level-Farbe wie die zugehörigen Linien und aktiven Größenlabels, einschließlich selbst gewählter Farben und Szenario-Abstufung. Historische HIT/GAP/AGE-Linien bleiben erhalten, ohne aktive Skalenlabels im jeweiligen Referenzbestand.

Die kleine Legende unten rechts zeigt die sechs Linienfarben: Long-/Short-Seite und die konfigurierten Hebelszenarien A/B/C. Deaktivierte Szenarien sind markiert. Unter **History / display → Show color legend** lässt sie sich ausschalten.

Unter **Appearance** lassen sich **Long-Farbe**, **Short-Farbe**, **Legendenschrift**, **Zahlenschrift** und **Breite je Legendenhälfte (%)** ändern. Beide Hälften erhalten ausdrücklich dieselbe Kopf- und Spaltenbreite. Die Legende verwendet neutrale Zellen mit separaten Farbmusterlinien. Die Basisfarben bestimmen Linien, Legende, Zahlenlabel-Hintergründe und Skalenmarker; hellere Hebelszenarien werden automatisch abgeleitet. Die Zahlenschrift wechselt für den Kontrast zwischen hell und dunkel. Ihre Vorgabe ist wieder Normal/16; Groß/20 und Sehr groß/24 bleiben auswählbar.

Unter **History / display → Show OI size at line midpoint** lassen sich optionale Größenlabels einschalten, Vorgabe aus. Sichtbar ist nur eine Zahl mit zwei Dezimalstellen, etwa `30.43`. Das bedeutet 30,43 Mio. USD geschätzte Netto-OI-Zunahme der auslösenden Kerze, keine gemessene einzelne Positionsgröße. Die Einheit und Grenze stehen in der Legende und im Tooltip. Derselbe Ereigniswert kann auf mehreren Long-/Short-/Hebelszenarien erscheinen und darf nicht summiert werden.

Das Label sitzt zeitlich in der Mitte der gesamten gespeicherten Linie. Bei aktiven Linien wandert es mit deren Ende, nach einer Berührung bleibt es an der finalen Mitte. Bei starkem Hineinzoomen kann die Mitte einer langen Linie außerhalb des sichtbaren Ausschnitts liegen. Pro gespeicherter Linie wird höchstens ein Label erzeugt; ausgeschaltet entstehen keine Größenlabel-Objekte. Diese Labeloption verändert keine Levelpreise oder Erzeugungsregeln.

Frei gefärbte Skalenplots benötigen je zwei Plot-Counts. Deshalb hat die Chartfassung 32 gemeinsame Plätze (64 Counts) ohne die bisherigen numerischen Exportserien. Die Exportfassung hat 22 gemeinsame Plätze plus 19 numerische Serien (63 Counts). Bei Überschreitung werden kursnähere aktive Level beider Seiten gemeinsam bevorzugt. Alle übrigen Linien bleiben bestehen. Enge Preise können abhängig vom Zoom überlagern. Im optionalen Diagnosepanel stehen angezeigte/aktive Anzahlen.

Falls Skalenlabels fehlen, im Indikator unter Stil die Labels auf der Preisskala und gegebenenfalls in den globalen Chart-Einstellungen aktivieren. Den Indikator gegebenenfalls derselben rechten Preisskala wie BTC zuordnen.

Das gesamte Diagnosefenster wird unter **Analysis → Show diagnostic panel** eingeschaltet. Die Anzeigeoption beeinflusst weder Skalenlabels noch Berechnung oder CSV-Export. Bei ausgeschaltetem Fenster stehen Hinweise zu fehlenden Daten nur nach Einschalten zur Verfügung.

## Verschieben des Charts und Linienenden

Die Skalenplots sind nicht mehr auf die letzte Datenkerze begrenzt. Beim horizontalen Verschieben wird ihr aktiver Bestand am rechten sichtbaren Balken aufgebaut und anschließend für diese Ansicht gehalten. Beim Blick in die Vergangenheit gelten also die damals bis zum sichtbaren Kerzenschluss bekannten Level, nicht spätere Ereignisse. Bei einer noch offenen rechten Kerze stammt der Bestand weiterhin aus den bereits bestätigten Kerzen. Vor den ersten Ereignissen oder außerhalb der geladenen Historie können entsprechend keine aktiven Level vorliegen.

Dieses Verhalten wurde auf ausdrücklichen Wunsch beibehalten. Die native gefüllte/umrandete Darstellung wird nicht durch Offset- oder Trackprice-Tricks erzwungen. TradingView startet Skripte mit sichtbaren Zeitgrenzen beim Scrollen/Zoomen neu. Während dieser Neuberechnung können Werte vorübergehend fehlen; dieser mögliche Ablauf wurde hier nicht direkt im Browser nachgewiesen und wird nicht als behoben ausgegeben.

Die Signalberechnung liest keine sichtbaren Chartgrenzen. Nur die Skalendarstellung hängt davon ab. Die 19 numerischen Datenexport-Spalten bleiben in der Exportfassung unverändert; Skalenplots sind Darstellungswerte der jeweiligen Ansicht und keine zusätzliche Ereignisquelle.

Nach bestätigter Berührung/GAP endet eine Linie nun am Zeitstempel der auslösenden Kerze. `time_close` lag bereits beim Beginn der nächsten Kerze und ließ sie visuell einen Balken zu weit reichen. Dies ändert nur das sichtbare Ende, nicht den Zeitpunkt, zu dem die Berührung erkannt wird. Bei Berührung direkt in der Folgekerze kann das Segment sehr kurz sein; ein Ende vor seiner Geburt wird verhindert. Altersablauf behält seinen bisherigen Schlusszeitpunkt.

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

Für vollständige Daten die Exportfassung statt der Chartfassung verwenden und alle relevanten Berechnungsparameter übernehmen. Dort bleiben die Ereignis- und OI-Spalten enthalten. Der redundante Export `Aligned OI` wurde bereits früher durch `Delta resolution seconds` ersetzt; `TV OI raw (confirmed)` bleibt die OI-Quelle. Der Delta-Anteil heißt `Estimated delta share (adaptive TF)`. Die Chartfassung enthält nur die farbigen aktiven Skalenserien, keine vollständigen OI-/Erzeugungsfelder. Die Chartauflösung ist über die CSV-Zeitstempel erkennbar.

## Noch offen

Die lokalen Anzeigeverträge lassen sich aus dem Repository-Verzeichnis mit `node tests/check-scale-colors.cjs` prüfen. Dazu gehören gekoppelte Preis-/Farb-/Seitenarrays bei Überlauf, gleiche Legendenbreiten, kleinere Schriftvorgabe, unveränderte Signalregeln, exakte numerische Exportserien in der Exportfassung und beide Plotbudgets. Die Prüfung ist kein Pine-Compiler.

Lokale Quell-, Plotbudget-, Slot- und Intrabar-Grenzprüfungen sind erfolgt. Ein TradingView-Compilerlauf und die visuelle Prüfung der aktuellen Version sind noch offen unter [#4](https://github.com/alsuffndruff/hyblock-liquidation-levels/issues/4). Eine höhere Preisabdeckung ist ein gesondertes Forschungsziel unter [#5](https://github.com/alsuffndruff/hyblock-liquidation-levels/issues/5).

## Offizielle Dokumentation

- [Plot-Darstellung](https://www.tradingview.com/pine-script-docs/visuals/plots/)
- [Pine-Limits](https://www.tradingview.com/pine-script-docs/writing/limitations/)
- [Intrabar-Anfragen](https://www.tradingview.com/pine-script-docs/concepts/other-timeframes-and-data/)
- [Sichtbarkeit von Indikatorlabels](https://www.tradingview.com/support/solutions/43000659666-i-want-to-hide-the-values-of-individual-indicators/)
