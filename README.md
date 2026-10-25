# Hyblock Liquidation Levels

Experimentelle Pine-v6-Indikatoren zur Untersuchung OI-basierter Liquidationsszenarien auf `BINANCE:BTCUSDT.P`. Die aktuelle Variante verwendet kostenlose Kurs-/OI-Daten und preisbasierte Delta-Schätzungen. Sie ist kein originalgetreuer Nachbau von Hyblock.

## Aktuelle Version: v1.8

- [Pine-Datei v1.8](cws-liquidation-levels-v1.8-readable.pine)
- [Installation, Darstellung und Zeitrahmen](docs/installation.md)
- [Änderungsprotokoll](CHANGELOG.md)
- [Quantitativer Prüfstand und Grenzen](docs/validation-summary.md)

Vorgaben: **OI+CVD**, einheitliche **Linienbreite 3**, Preislabels auf der Skala **an**, kleine Farblegende **an**, optionale Größenlabels **aus**, Diagnosefenster **aus**. Unter History / display → Show OI size at line midpoint lässt sich eine reine Zahl in der Linienmitte anzeigen. Diese bezeichnet geschätzte Netto-OI-Zunahme der Ereigniskerze in Mio. USD, keine tatsächliche Einzelposition. Das gesamte Diagnosefenster lässt sich unter Analysis → Show diagnostic panel einschalten. Bereits abgeholte Level bleiben als beendete Linien erhalten.

Zeitbasierte Charts ab 1 Minute werden unterstützt, mit angepasster Delta-Auflösung für größere Perioden. Die Parameter wurden bisher nur auf **15m** mit den vorhandenen Bildreferenzen verglichen. Andere Zeitrahmen sind unkalibriert. Der aktuelle Anzeigestand und die Zeitrahmenerweiterung wurden lokal geprüft; ein tatsächlicher TradingView-Compiler-/Sichttest steht noch aus: [#4](https://github.com/alsuffndruff/hyblock-liquidation-levels/issues/4).

Neu in v1.8: lesbare neutrale Legende, getrennte Schriftgrößen und frei wählbare Long-/Short-Linienfarben. Die Skalenlabels werden beim Verschieben am rechten sichtbaren Chartbalken aufgebaut. Berührte Linien enden visuell am Balken der Berührung statt am Beginn des nächsten Balkens. Skalenmarker behalten feste Türkis-/Korallfarben zur Erhaltung der vollen Kapazität. Die direkte TradingView-Sichtprüfung dieser Änderungen ist noch offen unter #4.

## Änderungsverfolgung

Ab sofort wird vor einer fachlichen Änderung ein GitHub-Issue angelegt oder weitergeführt. Commit, Akzeptanz und Prüfung werden verknüpft. Frühere Arbeit ist ausdrücklich als Nachtrag dokumentiert. Der Ablauf steht in [AGENTS.md](AGENTS.md).

- [Tickets](https://github.com/alsuffndruff/hyblock-liquidation-levels/issues)
- [Aktuelle Anzeige in TradingView prüfen (#4)](https://github.com/alsuffndruff/hyblock-liquidation-levels/issues/4)
- [Preisabdeckung bei ähnlicher Levelanzahl verbessern (#5)](https://github.com/alsuffndruff/hyblock-liquidation-levels/issues/5)

## Historische Versionen

- [v1.7.2 – Farblegende und optionale Größenlabels](cws-liquidation-levels-v1.7.2-legend-size.pine)
- [v1.7.1 – Diagnosefenster standardmäßig aus](cws-liquidation-levels-v1.7.1-multi-timeframe.pine)
- [v1.7 – Zeitrahmenerweiterung](versions/cws-liquidation-levels-v1.7-multi-timeframe.pine)
- [v1.6.3 – Nur Skalenlabels](versions/cws-liquidation-levels-v1.6.3-scale-only.pine)
- [v1.6.2 – Skalenlabels und Vorgaben](versions/cws-liquidation-levels-v1.6.2-price-scale.pine)
- [v1.6.1 – Einheitliche Linienbreite](versions/cws-liquidation-levels-v1.6.1-uniform-lines.pine)
- [v1.6 – Reduzierte Leveldichte](versions/cws-liquidation-levels-v1.6-density-test.pine)
- [v1.5 – Kalibrierungsversuch](versions/cws-liquidation-levels-v1.5-experimental.pine)
- [v1.4 – TV-Rekonstruktion](versions/cws-liquidation-levels-v1.4.pine), [Export-Testfassung](versions/cws-liquidation-levels-v1.4-test.pine)
- [v1.3 – Früheres Footprint-Experiment](cws-liquidation-levels-v1.3-experimental.pine), [Anleitung](cws-v1.3-anleitung.md)
- [OI-/Footprint-Datentest v0.1](cws-oi-footprint-diagnostic-v0.1.pine), [Anleitung](cws-datentest-anleitung.md): historischer separater Versuch mit zusätzlichen TradingView-Datenanforderungen; keine Voraussetzung für die aktuelle freie Variante.
- [v1.2 – Referenzfassung](cws-liquidation-levels-v1.2-original.pine)

## Lokale Anzeigeprüfung

Aus dem Repository-Verzeichnis: `node tests/check-readable-display.cjs`. Die Prüfung schützt den Modell-/Exportkern, den historischen Skalenbestand, Treffkerzen-Enden, Schrift-/Farbvorgaben und das Plotbudget. Sie ersetzt keinen TradingView-Compilerlauf. `tests/check-legend-size.cjs` bleibt als Prüfung des historischen v1.7.2-Stands erhalten.

## Modellgrenzen

OI-Zuwachs und geschätztes Delta belegen keine einzelne Position, keinen tatsächlichen Hebel und keine künftige Liquidation. Die Hebel- und Margin-Annahmen sind Szenarien. Eine ähnliche Anzahl sichtbarer Linien beweist keine gleiche Preisabdeckung. Screenshots liefern keine vollständige Referenzhistorie. Roh-CSV, Nutzerbilder und lokale Benutzerpfade werden nicht veröffentlicht.
