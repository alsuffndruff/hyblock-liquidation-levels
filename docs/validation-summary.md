# Prüfstand und quantitative Grenzen

## Aktuelle Version

v1.9 übernimmt den unveränderten Modellkern und das bisherige rechte sichtbare Skalenverhalten. Neu sind gleich breite Legendenhälften, Normal/16 als kleinere Zahlenlabel-Vorgabe und passende Level-Farben auch auf der Skala. Die Chartfassung nutzt 32 gemeinsame dynamisch gefärbte Skalenplätze; die Exportfassung enthält die 19 bisherigen Datenserien und 22 gemeinsame Farbplätze. Ein Wechsel des Skalen-Bezugspunkts oder eine erzwungene Outline-Darstellung ist auf ausdrücklichen Nutzerwunsch nicht enthalten. Kurzes Ausblenden während einer TradingView-Neuberechnung wird nicht als behoben behauptet. Lokale Modell-/Export-, Kopplungs-, Breiten- und Budgettests bestehen; die tatsächliche TradingView-Sichtprüfung bleibt [Issue #4](https://github.com/alsuffndruff/hyblock-liquidation-levels/issues/4). Die quantitative Prüfung unten bezieht sich auf den bisherigen 15m-Modellstand, nicht auf die Anzahl der beschrifteten Skalenplätze.

## Tatsächliche TradingView-Exporte

- v1.4: 230 exportierte Erzeugungen im früher beginnenden Stand vollständig nachgerechnet. Der 81er-Stand hatte einen späteren Beginn. Unterschiedliche Bestände verändern spätere Deduplizierung.
- v1.5: 176 Erzeugungen vollständig nachgerechnet.
- v1.6 OI+VOL: 74 Erzeugungen vollständig nachgerechnet; am gemeinsamen letzten bestätigten Stand 35 aktiv und 39 beendet.
- v1.6 OI+CVD: 70 Erzeugungen vollständig nachgerechnet; am selben bestätigten Stand 31 aktiv und 39 beendet.
- Die gemeinsame letzte bestätigte Kerze endet am 25.10.2026 um 11:15 UTC. Spätere Marktstände können andere Zahlen haben.
- Einzelne Halb-Tick-Werte erfordern in der JavaScript-Nachrechnung Schutz vor binärem Rundungsrauschen. Pine verwendet `math.round_to_mintick()`.

Die Rohdateien bleiben lokal. Ein Export prüft die tatsächlich ausgeführte Version und ihre Eingaben; er bestätigt keine unbekannten Hyblock-Eingangsdaten.

## Fünf historische Bildstände

Zeitstempel bezeichnen den Beginn der noch laufenden Bildkerze. Für den CWS-Zustand wird nur die bis dahin bestätigte Kursfolge verwendet. Die gezeigte letzte Kerze kann bei Hyblock bereits weitere Änderungen enthalten.

| Datum | Chartzeit UTC+2 | UTC | Hyblock sicher lesbar | CWS aktiv im Bildfenster | Eindeutige Paare ≤50 USD | Mittlerer Abstand der Paare |
|---|---|---|---:|---:|---:|---:|
| 20.10.2026 | 09:30 | 07:30 | 18 | 18 | 9 | 17,92 USD |
| 21.10.2026 | 10:15 | 08:15 | 20 | 22 | 11 | 16,95 USD |
| 22.10.2026 | 10:15 | 08:15 | 26 | 28 | 13 | 24,84 USD |
| 23.10.2026 | 11:30 | 09:30 | 22 | 26 | 11 | 25,70 USD |
| 24.10.2026 | 11:15 | 09:15 | 24 | 30 | 13 | 28,12 USD |

Die Tabelle gilt für die geprüften v1.6-Exporte beider Score-Modi. Größere Unterschiede treten nach den letzten Bildständen auf; dafür liegt keine passende Hyblock-Referenz vor. Weniger Level sind deshalb nicht automatisch bessere Level.

## Vergleichsregel

- Long und Short getrennt, ohne eine unsichere Hyblock-Hebelzuordnung zu erzwingen.
- Jeder Kandidat und jede Referenz höchstens einmal zugeordnet.
- Zunächst maximale Anzahl von Paaren mit höchstens 50 USD Abstand, danach minimaler Gesamtabstand.
- Entstehungszeit nur als Zusatzinformation, nicht als harte Trefferbedingung.
- Aktive und historische Level getrennt. Historische Zeichnungen bleiben im Chart.
- Referenzen sind sicher lesbare Bildlabels, keine nachgewiesen vollständige Hyblock-Liste.

## Nicht passende Preise

In der früheren v1.6-Projektion lagen 44 Referenzbeobachtungen mehr als 50 USD vom nächsten gleichseitigen Kandidaten entfernt: Median 118,80 USD, Mittelwert 152,27 USD, Maximum 450,10 USD. Zusätzliche unzugeordnete CWS-Beobachtungen lagen im Median 249,90 USD vom nächsten lesbaren Referenzpreis entfernt, im Maximum 998,70 USD. Wiederholte Preise in mehreren Bildern wurden dabei mehrfach beobachtet und sind keine unabhängigen Stichproben.

Für die Kursentfernung ergab sich nur ein schwacher Zusammenhang mit dem lokalen Preisfehler. Ein universeller Korrekturfaktor ist daraus nicht begründbar. Ein niedriger Mittelwert unter den Treffern darf fehlende Level nicht verdecken.

## Kalibrierung und offene Ziele

Parameter wurden auf 20.–22.10. ausgewählt und anschließend auf 23./24.10. ausgewertet. Die späteren Tage waren aus vorigen Untersuchungen bereits bekannt und sind kein frischer Blindtest. Ein umfangreiches Raster auf wenigen verwandten Bildern birgt Überanpassungsgefahr.

Die gewünschte Kombination aus Hyblock-ähnlicher Anzahl und deutlich höherer Preisabdeckung ist noch nicht erreicht: [Issue #5](https://github.com/alsuffndruff/hyblock-liquidation-levels/issues/5).

## Grenzen des Modells

Netto-OI und geschätztes Delta zeigen keine individuellen Positionen, Sicherheiten oder realen Hebel. Die freien Delta-Schätzungen sind kein vollständiges Börsen-Taker-Tape. Farben und Hebelszenarien sind eigene Darstellungsannahmen. Es werden keine Screenshot-Preise in die Erzeugungslogik eingebaut. Manuelle TradingView-Zeichenwerkzeuge werden nicht verändert.
