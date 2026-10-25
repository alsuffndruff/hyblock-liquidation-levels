# Änderungsprotokoll

## 2026-10-25 – Nachtrag und aktueller Stand

Die Einträge bis einschließlich v1.6.2 dokumentieren nachträglich Arbeit aus dem Chat. Sie sind keine Behauptung, dass diese Fassungen bereits zuvor im Repository lagen.

### v1.10 CLUSTER EXPERIMENT – ausschließlich experiment/oi-cluster-selection (#5)

- Kausale OI-Gruppen, gewichteter oder stärkster Einstieg und gruppenweiser Scorefilter. Bestehende Level bleiben unverändert; keine Rückdatierung.
- Separate Chart-/Exportdateien mit zusätzlichem Gruppenexport; generische Referenzengine und synthetische Tests zu Zukunftsdaten, Datenlücken und Historienerhalt.
- Kein Nachweis höherer Preisabdeckung durch diese Veröffentlichung. Private CSV-basierte Vergleiche bleiben lokal bis zur ausdrücklichen Veröffentlichungsfreigabe.
- Compiler-/Laufzeitprüfung offen #4, Forschung #5 offen. Hauptversion v1.9 unverändert.
- Nutzerwunsch: eigene Branches für Experimente; aktuellen Änderungsbranch immer nennen.

### v1.9 – Gleiche Legendenbreite und passende Skalenfarben (#14, #15)

- Long-/Short-Hälfte aus derselben expliziten Breite ableiten; Farbmuster und Werte besitzen identische Spaltenbreiten. Breite je Hälfte in Appearance einstellbar.
- Zahlenschrift standardmäßig Normal/16 statt Groß/20, größere Optionen weiterhin verfügbar.
- Skalenpreise, tatsächliche Level-Farben und Seiten gemeinsam einfügen/entfernen; keine festen abweichenden Türkis-/Korallmarker mehr.
- Wegen des Pine-Plotbudgets zwei Fassungen: Chart mit 32 gemeinsamen dynamisch gefärbten Plätzen/64 Counts; Export mit allen 19 bisherigen numerischen Datenspalten und 22 gemeinsamen Farbplätzen/63 Counts.
- Bei Überlauf kursnächste aktive Level beider Seiten gemeinsam priorisieren; keine separaten Long-/Short-Quoten mehr. Das betrifft nur Beschriftungen, nicht Erzeugungen oder Historienlinien.
- Der Nutzer hat die weitere Änderung des Preislabel-Verhaltens zurückgenommen. Rechter sichtbarer Bezugspunkt sowie natives gefülltes/umrandetes Rendering bleiben erhalten; keine Offset-/Trackprice-Tricks und kein Versprechen, TradingViews Neuzeichenphasen zu verhindern.
- Tests für gekoppelte Farb-/Preisarrays, Kapazitätsüberlauf, gleiche Breiten, kleinere Vorgabe, unveränderten Modellkern und exakte Exportserie bestehen lokal. TradingView-UI-Prüfung weiterhin #4.

### v1.8 – Freigegebenes lesbares Design und Darstellungsfehler (#11, #12, #13)

- Neutrale Legende mit separaten Farbmusterlinien statt farbig gefüllter Felder, wie im freigegebenen Bildentwurf.
- Legendenschrift Normal/Groß/Sehr groß = 14/16/20; Zahlenschrift = 16/20/24. Vorgabe jeweils Groß, numerische Labels fett und mit kontrastabhängiger Textfarbe.
- Frei wählbare Long-/Short-Basisfarben für Linien, Legende und Zahlenlabels; hellere Szenario-Abstufungen automatisch. Skalenmarker behalten feste Türkis-/Korallfarben, damit 19 Exportplots plus 45 Skalenplots unter dem Limit von 64 bleiben.
- Skalenbestand wird am rechten sichtbaren Balken aus dem damals bekannten aktiven Bestand kopiert und über spätere unsichtbare Balken eingefroren. Die vorherige Beschränkung auf letzte Datenkerze/show_last=1 entfällt.
- Bei einem nach links verschobenen historischen Ausschnitt beziehen sich die Skalenmarker damit auf dessen rechten sichtbaren Zeitpunkt, nicht auf den heutigen aktiven Bestand. Spätere Ereignisse werden nicht vorweggenommen.
- Berührte/GAP-Linien enden visuell am time der Treffkerze statt an deren time_close. Erkennung bleibt bestätigt am Schluss. Altersablauf, Geburt und exportierte Erstellungszeit bleiben unverändert; Ende nie vor Geburt.
- Neues lokales Prüfskript für unveränderten Modell-/Exportkern, Snapshot-Kausalität, Treff-/Ablaufgrenzen und Plotbudget. Tatsächliche Scroll-/Sichtprüfung bleibt #4.

### v1.7.2 – Farblegende und optionale Größenlabels (#9, #10)

- Kleine, separat schaltbare Farblegende unten rechts, Vorgabe an. Zeigt Long-/Short-Schattierungen sowie aktuelle Hebelszenarien A/B/C, einschließlich deaktivierter Szenarien.
- Optionale Zahlenlabels in der zeitlichen Linienmitte, Vorgabe aus. Text enthält ausschließlich den Wert mit zwei Dezimalstellen, ohne Präfix oder Einheit.
- Größenwert ist die geschätzte Netto-OI-Zunahme der Ereigniskerze in Mio. USD, keine einzelne Position. Einheit und Grenze stehen in Legende und Tooltip. Mehrfach auf Szenarien wiedergegebene Ereigniswerte dürfen nicht addiert werden.
- Höchstens ein Label je gespeicherter Linie, maximal 500. Aktive Labels folgen der Mitte der gespeicherten Linie; beendete bleiben am finalen Mittelpunkt erhalten. Bestehende Levelpreise werden nicht verschoben.
- Signal-/Deduplizierungsregeln, Exportserien, Skalenplots und OI+CVD/Breite-3-Vorgaben unverändert. Weiterhin 64 Plot-Counts; Diagnosefenster standardmäßig aus.
- Quelländerungen, numerischen Text, Konstruktorfelder und Mittelpunktgrenzen lokal geprüft. TradingView-Prüfung bleibt #4.

### v1.7.1 – Diagnosefenster aus (#8)

- Das komplette Diagnosepanel standardmäßig ausblenden; Konfigurationsschalter `Show diagnostic panel`.
- Skalenlabels, Exporte und Berechnung bleiben davon unabhängig.
- Reversible, lokal geprüfte Änderung gegenüber v1.7; TradingView-Prüfung unter #4 offen.

### v1.7 – Weitere Zeitrahmen (#7)

- Zeitbasierte Charts ab 1 Minute einschließlich Stunden, Tage, Wochen und Monate unterstützen.
- Auf 1m preisbasierte Delta-Schätzung aus der Chartkerze; bis 4h weiter 1m-Intrabars, darüber bis 1D 5m, bis 1W 60m und bei größeren Perioden 240m.
- Erwartete Intrabar-Anzahl aus tatsächlicher Kerzendauer berechnen; leere oder ungültige Array-Ergebnisse abfangen.
- Diagnose zeigt Chart- und Delta-Auflösung sowie den unkalibrierten Status außerhalb 15m.
- Redundanten Export `Aligned OI` durch `Delta resolution seconds` ersetzen; rohe OI-Serie bleibt enthalten. Delta-Anteil heißt nun `Estimated delta share (adaptive TF)`.
- Weiterhin 64 Plot-Counts. Keine Änderung am Preis-/Deduplizierungs-/Erzeugungsblock, nur Kontextfreigabe und Delta-Auflösung erweitert.
- Lokale Grenzen einschließlich Monatslängen und 15m-Abdeckungsregel geprüft. Keine Gleichwertigkeits- oder Gütebehauptung für andere Zeitrahmen; tatsächliche TradingView-Prüfung unter #4 offen.

### v1.6.3 – Nur Skalenlabels (#1)

- Textlabels an Level-Linien vollständig entfernt, einschließlich Label-Objekten und Eingaben für Linien-/Historienlabels.
- Aktive Preislabels auf der Skala erhalten; bis zu 22 Long und 23 Short, nahe aktive Preise zuerst.
- OI+CVD als Vorgabe und einheitliche Linienbreite 3 erhalten.
- Unveränderte Preis-, Ereignis-, Deduplizierungs- und Historienregeln; Prüfung der betroffenen Quellabschnitte und neun Konstruktorfelder.
- TradingView-Kompilierung und visuelle Prüfung bleiben offen unter #4.

### v1.6.2 – Vorgaben und Skalenlabels (#3)

- OI+CVD und Breite 3 als Vorgaben.
- 45 Skalenplots mit konstanten Farben plus 19 Exportplots: 64 Plot-Counts.
- Skalenlabels kennzeichnen aktive Level, historische Linien bleiben sichtbar.
- Begrenzte Sortierarrays für den leeren, normalen und übervollen Bestand lokal geprüft.

### v1.6.1 – Einheitliche Breite (#3)

- Gemeinsamer Breitenregler; OI-Ereignisklasse bestimmt die Linienbreite nicht mehr.
- Berechnungs- und Statusregeln unverändert.

### v1.6 – Ähnliche Levelanzahl und klassenübergreifender Abstand (#2)

- Close als Einstiegsannahme, Mindestscore 1,2, Abstand gleicher Seite/gleichem Hebel 400 USD und anderer Hebelklasse 50 USD.
- Neue nahe Kandidaten werden vor der Zeichnung verworfen. Bestehende Preise werden nicht verschoben und OI-Werte nicht summiert.
- Nutzerexporte bestätigen 74 Erzeugungen mit OI+VOL beziehungsweise 70 mit OI+CVD am gemeinsamen Vergleichsstand.
- Historische Bildvergleiche sind für beide Modi gleich: 18/22/28/26/30 aktive CWS-Level gegenüber 18/20/26/22/24 sicher lesbaren Referenzen; eindeutige Paare innerhalb 50 USD: 9/11/13/11/13.
- Anzahlreduktion kostet Referenzabdeckung. Weiterarbeit in #5.

### v1.5 – Experimentelle Kalibrierung (#2)

- OC2-Einstieg, Mindestscore 2 und Klassenabstand 75 USD.
- 176 exportierte Erzeugungen stimmen mit der lokalen Nachrechnung überein.
- Weniger aktive Linien als v1.4, aber teilweise verlorene Referenzpaare.

### v1.4 – Rekonstruktion und CSV-Prüfung (#2)

- OI-basierte Ereignisscores, Hebelszenarien, Deduplizierung und bestätigte Kerzen.
- Getrennte Export-Testfassung für tatsächlich angelegte Level.
- Berührte, abgelaufene oder in einer Kurslücke übersprungene Linien enden und bleiben erhalten; keine automatische Verdrängung am Objektlimit.
- Nachgerechneter Nutzerexport: 230 Erzeugungen bei früherem Analysebeginn. Der frühere 81er-Stand hatte einen späteren Beginn und einen anderen aktiven Bestand.

### Korrektur des Modellvergleichs

Die früher exportierte Score-Reihe entspricht rechnerisch OI+CVD. Der erste tatsächliche v1.6-Export entspricht OI+VOL. Die frühere Parameterauswahl verwendete die exportierten Score-Werte und prüfte deshalb nicht automatisch den im Code genannten OI+VOL-Default. Die Nutzerexporte wurden anschließend getrennt nachgerechnet. Gleichartige Bildresultate bedeuten keinen generell gleichwertigen Algorithmus und keinen nachgewiesenen Hyblock-Nachbau.

### Ticketablauf (#6)

- Änderungen künftig vor Umsetzung über GitHub-Issues verfolgen.
- Akzeptanz, Quellcode, Commit und Prüfstatus verknüpfen.
- Noch ausstehende externe Prüfung und Modellziele bleiben als offene Issues sichtbar.
- Keine Nutzer-Rohdateien oder lokalen Benutzerpfade veröffentlicht.
