# CWS Liquidation Levels v1.3 – Footprint-Experiment

Stand: 24.10.2026.

## Ziel und aktueller Nachweis

Der Nutzer-Screenshot des separaten Datentests zeigt erfolgreichen OI- und Footprint-Empfang auf dem BTCUSDT-Chart. Für die zuletzt abgeschlossene Kerze um 14:00 UTC wurden 40,364 BTC OI-Zuwachs (ca. 3,256 Mio. USD) und +6,586 % Footprint-Delta angezeigt. Beide Werte liegen unter den Ausgangsschwellen von 5 Mio. USD bzw. 10 %. OI und Footprint waren bei 6.667 von 22.808 geladenen Kerzen gemeinsam vorhanden. Footprint/Chartvolumen = 100 % bezieht sich nur auf diese eine Kerze.

Das bestätigt die Datenverfügbarkeit im Datentest, nicht die Prognosequalität eines Liquidationsmodells. v1.3 selbst wurde hier noch nicht im Pine-Editor kompiliert oder im Chart ausgeführt.

## Einrichtung

1. Datei [cws-liquidation-levels-v1.3-experimental.pine](cws-liquidation-levels-v1.3-experimental.pine) vollständig in einen neuen Pine-Indikator kopieren.
2. Auf BINANCE:BTCUSDT.P, normalen 15-Minuten-Kerzen und mit TradingView Premium oder Ultimate speichern und zum Chart hinzufügen.
3. Für eine übersichtliche erste Ansicht andere Liquidationsindikatoren und den separaten Datentest ausblenden. Bestehende manuelle Zeichnungen können erhalten bleiben.
4. Vorgaben zunächst beibehalten: Modus **OI + Footprint**, OI-Schwelle **5 Mio. USD**, Delta-Schwelle **10 %**, maximal **100 Level**. Die OI-Feed-Einheit BTC und den Umrechnungsfaktor weiterhin prüfen.
5. Screenshot des Charts einschließlich Diagnose senden. Für den Hyblock-Vergleich möglichst gleiche Aufnahmezeit, Börse/Kontrakt und sichtbaren Zeit-/Preisbereich verwenden. Die bisherigen Screenshots müssen nicht nochmals gesendet werden. Bei einem Fehler bitte exakten Text und Zeilennummer senden.

## Was sich gegenüber v1.2 ändert

Ein neues Ereignis benötigt einen positiven OI-Nominalzuwachs oberhalb der Schwelle UND gültige Footprint-Daten derselben abgeschlossenen Kerze. Überwiegt das klassifizierte Buy-Volumen mit mindestens der eingestellten Delta-Schwelle, wird eine hypothetische Long-Seite modelliert; bei entsprechend negativem Delta eine hypothetische Short-Seite. Null-Delta wählt auch bei Schwelle 0 keine Seite. Bei fehlendem Footprint, Nullvolumen oder ungültigem OI-Paar entstehen keine neuen Level. Es gibt keinen automatischen Rückfall auf die Kursrichtung.

Die Footprint-Klassifikation ist keine Binance-Taker-Kennung. Ein positiver OI-Zuwachs hat immer beide Kontraktseiten. Das Verfahren identifiziert weder einzelne Trader noch deren tatsächlichen Einstieg, Hebel oder Margin. Es berechnet keine kalibrierte Wahrscheinlichkeit.

Die Level entstehen weiter vom Schlusskurs aus für die angenommenen Hebel 25/50/100. Farben, Abstände, vereinfachte Liquidationsformel, Laufzeiten und Preisberührungslogik stammen aus v1.2. Der angezeigte OI-Zuwachs gilt für das ganze Ereignis und wird je Hebelklasse wiederholt; nicht addieren. Die Side-Texte enthalten jetzt „est.“ als Schätzkennzeichnung. Tooltips nennen Ereigniszeit und Footprint-Delta.

Für diesen ersten Vergleich werden keine POC-Einstiege, Clusteraggregation, Mark-Price-Regeln oder Funding-/Liquidationsfeeds ergänzt. Dadurch lässt sich die Wirkung der Richtungsregel und des Deltafilters gesondert untersuchen. Nahe Duplikate werden weiterhin übersprungen, nicht summiert. Bei voller Kapazität wird weiterhin der älteste Eintrag entfernt; die Diagnose zählt diese Kapazitätsverluste ausdrücklich.

## Kontrollierter Vergleich

Unter **Model / controlled comparison** kann auf **OI + close direction (shared coverage)** gewechselt werden. Dieser Modus verwendet die alte Schlusskursrichtungsregel, verlangt aber ebenfalls gültigen Footprint-Empfang. Dadurch verwenden beide Modi dieselben zur Ereignisbildung zugelassenen Kerzen, einschließlich eventueller Datenlücken.

Für eine Gegenüberstellung können zwei Instanzen von v1.3 mit ansonsten identischen Einstellungen und unterschiedlichen Modi geladen werden. Alternativ zwischen den Modi wechseln und je einen Screenshot mit unverändertem Chartbereich aufnehmen. Dieselbe Startzeit, OI-Einheit, Schwellen, Abstände, Hebel, Laufzeiten und Kapazität verwenden. Die Startzeit bezieht sich auf den Öffnungszeitpunkt einer Ereigniskerze.

**Candidates close / footprint rule** zählt Ereigniskerzen beider Regeln vor Duplikat-, Abstands- und Kapazitätsprüfung. Dies ist weder die Zahl aktuell sichtbarer Linien noch eine Trefferquote. Die Footprint-Regel kann auf einer Kerze mit unverändertem Schlusskurs eine Richtung finden, auf der die alte Regel aussetzt. Deshalb ist selbst eine niedrigere Ereigniszahl nicht garantiert.

**Shared / loaded candles after start** zeigt die tatsächliche gemeinsame Datenabdeckung. Anfang und Ende dieser Abdeckung bedeuten nicht, dass jede Kerze dazwischen gültige Daten hat. Der Vergleich mit dem unveränderten v1.2 ist für diese Frage weniger geeignet, weil v1.2 auf längerer OI-only-Historie zusätzliche Level erzeugen kann.

Vor einem Qualitätsurteil prüfen:
- Sind beide Vergleichsmodi auf derselben Datenbasis und mit identischen übrigen Einstellungen berechnet?
- Werden weniger schwache, isolierte Linien erzeugt, ohne relevante Cluster zu verlieren?
- Gibt es Kapazitätsverluste? Dann ist die sichtbare Auswahl zusätzlich durch FIFO-Löschung beeinflusst.
- Stimmen konkrete Preiszonen und Entstehungszeiten besser mit der zeitgleichen Hyblock-Referenz überein?

Übereinstimmung mit Hyblock ist noch kein Beweis realer Liquidationen oder finanzieller Prognosequalität. Ein späterer Vorwärtstest mit eingefrorenen Parametern muss Level vor dem Ergebnis protokollieren und Treffer sowie Fehlalarme mit festen Toleranzen messen. Schwellen nicht rückwirkend nur auf einen Screenshot optimieren.

## Technische Prüfung und Grenzen

Die API wurde mit der offiziellen Dokumentation abgeglichen:
https://www.tradingview.com/pine-script-docs/concepts/other-timeframes-and-data/#requestfootprint

Genau eine Footprint-Abfrage; alle Objektzugriffe sind gegen fehlende IDs geschützt. OI benötigt zwei aufeinanderfolgende gültige Zeitstempel ohne Fortschreibung über Lücken. Neue Ereignisse, Leveländerungen und Diagnose-Snapshots erfolgen auf abgeschlossenen Kerzen. Die Datenfensterausgaben erlauben historische Prüfung von OI, Delta und gemeinsamer Datenverfügbarkeit. Datenanbieter können historische Werte später korrigieren.

Lokale Quellprüfung durchgeführt; keine Pine-Kompilierung und kein neuer TradingView-Lauf durch den Agenten. Die v1.2-Referenz und der bisherige Datentest bleiben separat erhalten.
