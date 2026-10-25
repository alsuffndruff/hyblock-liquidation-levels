# Arbeitsablauf für CWS Liquidation Levels

Das zugehörige GitHub-Repository ist https://github.com/alsuffndruff/hyblock-liquidation-levels.

- Vor einer fachlichen Änderung ein passendes GitHub-Issue suchen oder anlegen. Änderungen, Prüfung und verbleibende Grenzen im Issue dokumentieren.
- Commits mit Issue-Nummern verknüpfen. CHANGELOG und aktuellen README-Stand bei Versionen aktualisieren.
- Ein Issue erst schließen, wenn seine festgelegten Akzeptanzkriterien erfüllt und die zugehörigen Dateien im Repository vorhanden sind. Noch ausstehende TradingView-Kompilierung oder visuelle Prüfung als offenes Folgeticket führen; lokale Quellprüfungen sind kein Compilerlauf.
- Nachträgliche Dokumentation früherer Arbeit ausdrücklich als Nachtrag kennzeichnen.
- Die kostenlose TradingView-basierte Rekonstruktion priorisiert Preisnähe und ähnliche aktive Levelanzahl. Entstehungszeit ist nachrangig. Ein Modelllevel darf im Vergleich höchstens einmal gepaart werden; Preisgrenze 50 USD.
- Keine Roh-CSV, Screenshots, lokalen Benutzerpfade oder Zugangsdaten in das öffentliche Repository oder seine Issues übernehmen. Zusammenfassungen und Pine-Quellcode sind für die Dokumentation vorgesehen.
- Abgeholte Linien als Historie erhalten. Das manuelle Long-Position-Werkzeug nicht verändern. Standardmäßig nur Preislabels auf der Skala. Auf ausdrücklichen Nutzerwunsch sind optionale Größenlabels in der Linienmitte erlaubt, Vorgabe aus und sichtbarer Text ausschließlich eine Zahl. Der Wert bezeichnet geschätzte Ereignis-Netto-OI-Zunahme in Mio. USD, keine tatsächliche Einzelposition; Einheit und Grenze in Legende/Tooltip erklären und Ereigniswerte nicht addieren.
- Kleine Farblegende standardmäßig an, separat schaltbar: Long/Short und aktuelle Hebelszenarien; unabhängig vom Diagnosefenster.
- Vorgaben: OI+CVD und einheitliche Linienbreite 3. Änderungen dieser Vorgaben müssen durch einen neuen Nutzerwunsch oder einen dokumentierten Vergleich begründet sein.
- Diagnosefenster standardmäßig vollständig aus; über Show diagnostic panel einschaltbar. Preislabels und Export bleiben unabhängig davon.
- Zeitbasierte Auflösungen ab 1 Minute unterstützen; adaptive Delta-Auflösung und Datenabdeckung berücksichtigen. Nur 15m ist bisher gegen die Bildreferenzen verglichen. Andere Zeitrahmen ausdrücklich als unkalibriert behandeln.
- Falls GitHub nicht erreichbar ist, lokale Arbeit nicht als synchronisiert ausgeben. Den ausstehenden Ticket-/Commit-Schritt ausdrücklich festhalten.

Offen sind insbesondere GitHub-Issue #4 (TradingView-Prüfung der aktuellen Anzeige) und #5 (Preisabdeckung verbessern).
