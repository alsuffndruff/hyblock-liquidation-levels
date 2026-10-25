# OI-Gruppierung: experimentelle Pine-v6-Variante

Änderungsbranch: `experiment/oi-cluster-selection`, Issue #5. Keine Übernahme nach main und keine Behauptung höherer Preisabdeckung. Die bisherige Hauptversion bleibt v1.9. Diese öffentliche Dokumentation enthält keine Messwerte aus privaten CSV-Dateien; der lokale Vergleichsbericht benötigt eine gesonderte Veröffentlichungsfreigabe.

## Algorithmus

Positive Netto-OI-Zunahmen ab der absoluten Untergrenze werden auf bestätigten Kerzen gruppiert. Eine neue Kerze muss innerhalb des konfigurierten Radius um den laufenden OI-gewichteten Einstieg liegen. Abschluss bei Zeitgrenze, nicht qualifizierender OI-Kerze oder Preisregionswechsel. Fehlende Eingangs-/Score-Daten und Zeitlücken verwerfen die offene Gruppe. Kein künstlicher Abschluss am Dateiende oder auf der letzten offenen Chartkerze.

Einstieg wahlweise gewichtet nach positiven Netto-OI-Zunahmen oder aus der Kerze mit dem höchsten vorhandenen OI+CVD-Score. Dieser Höchstscore muss die Schwelle erfüllen. Es ist keine vollständige Rangfolge konkurrierender Gruppen. Die vorhandene Preisabstandsprüfung bleibt nachgelagert aktiv. Nach Ausgabe sind Preise fest; berührte/abgelaufene Linien bleiben als Historie. Bei der Objektgrenze endet die Neuanlage ohne Löschen alter Linien. Pro Kerze höchstens eine Gruppenausgabe; Geburt erst am bestätigten Abschluss, keine Rückdatierung.

Die Gruppen-OI-Zahl summiert positive Nettoänderungen, keine tatsächlichen Einzelpositionen. Negative Änderungen werden nicht von dieser Gewichtung abgezogen. Dieselbe Zahl kann auf mehreren Long-/Short- und Hebelszenarien erscheinen: nicht addieren. OI+CVD, einheitliche Breite 3, Farblegende an, Diagnose und optionale Zahlenlabels aus bleiben Vorgaben. Die Farben und das native Skalenverhalten entsprechen v1.9.

## Installation

Chartfassung als neues Pine-v6-Indikatorskript speichern und BINANCE:BTCUSDT.P hinzufügen. Für Vergleiche 15m verwenden; andere zeitbasierte Auflösungen sind hinsichtlich Qualität unkalibriert. Die tatsächliche Gruppenbildung benötigt mindestens eine Chartkerze, ein Abschluss kann erst auf einer Folgekerze erkannt werden.

Für CSV-Ausgaben stattdessen die Exportfassung mit identischen Parametern verwenden, nicht zusätzlich: Chart 32 dynamische Farbplätze/64 Plot-Counts; Export 21 Farbplätze und 21 Datenplots/63 Counts. Die Exportfassung behält die bisherigen 19 Eingangs-/Ereignisfelder und ergänzt Created group entry sowie Created group positive OI (Mio USD) bei tatsächlicher Erzeugung. Die Gruppenfelder sind im Modus Single bars leer.

Unter OI grouping experiment lassen sich Gruppenfenster, Preisregion und Einstieg einstellen. Grouping mode → Single bars v1.9 verwendet den bisherigen Einzelkerzenblock. Gespeicherte alte Eingaben können bei Aktualisierungen erhalten bleiben; bei Bedarf eine neue Instanz verwenden. Manuelle Zeichnungen werden durch das Skript nicht bearbeitet.

## Lokale Prüfung

`node experiments/oi-cluster/test.cjs` prüft kausale Teilhistorien, gewichteten Einstieg, ausbleibende Signale auf offenen Kerzen, Datenlücken, fehlenden End-of-Datei-Abschluss, Kapazität/Historie, unveränderte Levelpreise, Chart-/Export-Modellgleichheit, Skalenanker und Plotbudgets. Das ist kein Pine-Compilerlauf. TradingView-Kompilierung, Laufzeit und visuelle Prüfung stehen weiterhin unter #4 aus.

Generische Referenzengine: experiments/oi-cluster/engine.cjs. Eingaben sind bestätigte Kerzenobjekte mit timeMs, closeMs, low, high, close, entry, oiM, score, valid und confirmed. Ohne garantierte historische OI-/Delta-Abdeckung können keine vergleichbaren Signale erwartet werden. Das Referenzmodell behandelt die verglichenen Standardannahmen; sämtliche alternativen Pine-Szenarien sind damit nicht vollständig abgebildet.

Offizielle Pine-Syntaxreferenz: https://www.tradingview.com/pine-script-docs/language/objects/ und https://www.tradingview.com/pine-script-docs/language/user-defined-functions/ .
