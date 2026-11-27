# Quadratische Funktionen

Lernseite zu quadratischen Funktionen. Jede Übung ist ein eigener Reiter und eine eigene Datei.

## Aufbau

```
index.html                       Seite, Farb-Tokens, Einbindung der Skripte
css/app.css                      gemeinsame Gestaltung (Reiter, Buttons, Bruchdarstellung)
core/math.js                     Brüche, Eingabe-Parser (-3, 1,5, 3/2), Term-Ausgabe
core/app.js                      Tab-System, Speicher pro Übung, DOM-Helfer
tabs/quadratische-ergaenzung.js  Reiter 1: Quadratische Ergänzung (3 Stufen + Mix)
tabs/_vorlage.js                 Vorlage für neue Reiter (nicht eingebunden)
```

## Neuen Reiter ergänzen

1. `tabs/_vorlage.js` kopieren und umbenennen, `id` und `title` ändern.
2. In `index.html` unter den vorhandenen Übungen eine Zeile ergänzen:
   `<script src="tabs/mein-reiter.js"></script>`

Die Datei `tabs/_vorlage.js` erklärt, was `mount()` bekommt (Panel, Speicher, Mathe-Helfer).

## Hinweise

- Der Lernstand liegt im `localStorage` des Browsers. Er wandert nicht zwischen Geräten.
- Jeder Reiter hat eine Adresse, z. B. `index.html#quadratische-ergaenzung`.
- Die Aufgaben der Übung 1 werden zufällig erzeugt; die Prüflogik (`logic` im Tab-Objekt)
  rechnet mit exakten Brüchen, Rundungsfehler gibt es nicht.
