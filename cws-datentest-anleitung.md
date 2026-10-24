# CWS OI + Footprint Datentest v0.1

Stand: 24.10.2026. Separater Diagnoseindikator vor einer Weiterentwicklung von CWS Liquidation Levels v1.2.

## Verwendung

1. TradingView mit Premium oder Ultimate öffnen. BINANCE:BTCUSDT.P, 15 Minuten und normale Kerzen auswählen.
2. Den vollständigen Inhalt von `cws-oi-footprint-diagnostic-v0.1.pine` in einen neuen Pine-Indikator kopieren, speichern und zum Chart hinzufügen.
3. CWS v1.2 kann zum Vergleich auf dem Chart bleiben. Der Datentest erscheint in einem eigenen Bereich.
4. OI-Feed und seine Einheit prüfen. BTC und Faktor 1 sind die Vorgaben aus v1.2; die Einheit wird nicht automatisch bestätigt.
5. Nach einem Kerzenschluss die Diagnosetabelle prüfen. Historische Werte stehen beim Auswählen einer abgeschlossenen Kerze im Datenfenster. Die Tabelle zeigt immer die zuletzt abgeschlossene Kerze.

Bitte zur Auswertung einen Screenshot der vollständigen Diagnosetabelle einschließlich Chart-Symbol/Zeitrahmen schicken. Bei einem Compiler- oder Laufzeitfehler stattdessen den genauen Fehlertext mit Zeilennummer mitteilen. Die beiden bereits vorliegenden Vergleichsscreenshots müssen nicht erneut geschickt werden.

## Was gemessen wird

- Vorzeichenbehaftete OI-Änderung nur bei zwei zeitlich passenden, direkt aufeinanderfolgenden gültigen OI-Kerzen. Keine Fortschreibung über Datenlücken.
- Footprint-Buy-/Sell-Volumen, Delta, Delta-Anteil und POC-Preisbereich. Fehlende Objekte werden vor jedem Zugriff geprüft; Nullvolumen ergibt keine Verhältniswerte.
- OI-Änderung relativ zum Footprint-Gesamtvolumen nur bei vom Chart als BTC-Basisvolumen gemeldeter Einheit. Fehlende Einheitenbestätigung unterdrückt BTC-/USD-Footprint-Umrechnungen.
- Vergleich Footprint-Gesamtvolumen mit Chartvolumen als Diagnose, ohne erzwungene Gleichheit.
- Häufigkeit verfügbarer Daten und OI+-Ereignisse mit klassifizierter Kauf-/Verkaufsinitiative im geladenen Datensatz. Diese Zähler sind keine Trefferquote und ändern sich mit der geladenen Historie.

Footprint-Delta ist die TradingView-Klassifikation anhand untergeordneter Kursbewegungen, kein nachgewiesenes Binance-Taker-Flag. OI+ belegt keine bestimmte neue Long-/Short-Größe. Die Einordnung ist eine Heuristik ohne kalibrierte Wahrscheinlichkeit. Der POC zeigt einen Volumenschwerpunkt, keinen belegten Positionseinstieg. Die frei wählbare Delta-Schwelle ist eine Diagnoseeinstellung ohne nachgewiesene Prognosegüte.

USD-Nominalwerte verwenden den Kerzenschlusskurs als Näherung. Im USD-OI-Modus ist die BTC-Umrechnung ebenfalls nur eine Näherung; Änderungen des USD-OI können Preisbewertungseffekte enthalten. Footprint-Volumen ist Handelsumsatz, OI ein offener Bestand. Das Verhältnis beschreibt zwei verschiedene Größen und ist keine Quote neu eröffneter Positionen.

## Umfang und Grenzen der Prüfung

Die Footprint-API, Objekttypen, Methoden, Premium-/Ultimate-Anforderung, `na`-Rückgabe und Beschränkung auf genau eine Footprint-Abfrage wurden mit der offiziellen Dokumentation abgeglichen:

https://www.tradingview.com/pine-script-docs/concepts/other-timeframes-and-data/#requestfootprint

Der Code verwendet eine einzige Footprint-Abfrage und dieselbe OI-Zeitstempelprüfung wie v1.2. Ausgaben und Zähler beruhen auf abgeschlossenen Kerzen. Nachgelagerte Datenkorrekturen durch den Anbieter sind weiterhin möglich.

Es gab hier keine Pine-Kompilierung und keinen Lauf in einem angemeldeten TradingView-Chart. Die tatsächliche Datenabdeckung und die vom Feed gemeldeten Einheiten müssen dort geprüft werden. Mark Price, Funding und tatsächliche Liquidationen werden in diesem eng begrenzten ersten Test nicht abgefragt; ihre Pine-Verfügbarkeit bleibt offen. Es werden keine Liquidationslevel erzeugt oder verändert.

## Befunde im gelieferten v1.2-Code

Positive OI-Nominaländerung oberhalb der Schwelle wird über `close > close[1]` bzw. `<` einer Seite zugeordnet. Für jede aktivierte Hebelklasse entsteht ein eigener Kandidat. Nahe Duplikate derselben Seite und Klasse werden übersprungen, nicht aggregiert. Bei voller Kapazität wird der älteste Datensatz entfernt. Berührung durch Chart-High/-Low, Alter oder Entfernung beendet ein Level; das ist kein Nachweis tatsächlicher Liquidation. Angezeigtes OI+ wird für alle Hebelklassen desselben Ereignisses wiederholt und darf nicht addiert werden. Der ursprüngliche v1.2-Code ist als separate Referenzkopie beigefügt.
