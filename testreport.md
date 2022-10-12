# Testrapport

Nedan hittas testspecifikation följt av en testrapport.

## Testspecifikation - Test Cases

1.1. Lägg till en ny kontakt vid namn Jane Doe.
  - Kolla så att kontakten har skapats.

1.2. Lägg till en ny kontakt utan efternamn.
  - Se till att applikationen varnar för felaktigt efternamn.

2.1. Gå till menyalternativ 1. (förutsätter att du skapat kontakter sedan tidigare)
  - Kolla så att alla skapade kontakter är listade.

2.2. Se till att inga kontakter finns sparade, gå till menyalternativ 1.
  - Kolla så att applikationen informerar om att det inte finns några kontakter och skickar tillbaka dig till huvudmenyn.

3.1. Lägg till en address på en existerande kontakt med följande uppgifter.
  - Address
    - Home (1)
    - Exempelvägen
    - 1
    - 111 11
    - Exempelstaden
    - Exempellandet
  - Gå till kontakten och kolla så att adressen är skapad.

3.2. Försök skapa en address utan gatunamn.
  - Se till att applikationen varnar för felaktigt gatunamn.

4.1. Gå till en kontakt.
  - Kolla så att kontaktens addresser är listade.

4.2. Gå till en kontakt utan addresser.
  - Kolla så att kontakten fortfarande presenteras, men utan addresser.

5.1. Gå till en kontakt, välj alternativ 2.
  - Lista alla kontakter och se till att aktuell kontakt inte finns kvar i listan.

6.1. `inte implementerat`

7.1. Lägg till en kontakt (TC 1.1) och en address (TC 3.1). Avsluta applikationen och starta upp den igen.
  - Kolla så att den skapade kontakten fortfarande listas i applikationen.

8.1. Se till att TC 7.1 är lyckat.

8.2. Radera filen `./data/data.json` (obs! låt mappen `data` ligga kvar) och starta sedan applikationen.
  - Kontrollera följande:
    - Applikationen startar utan problem.
    - Applikationen innehåller inga kontakter.
    - Filen `./data/data.json` har återskapats.

## Testrapport 2022-10-12

| TC | Resultat | Kommentar |
|----|----------|-----------|
| 1.1 | ✅ ||
| 1.2 | ✅ ||
| 2.1 | ✅ ||
| 2.2 | ✅ ||
| 3.1 | ✅ ||
| 3.2 | ✅ ||
| 4.1 | ✅ ||
| 4.2 | ✅ ||
| 5.1 | ✅ ||
| 6.1 | ❌ | Av tidsskäl valde jag att inte implementera detta, fokuserade istället på kvalitén i existerande kod. |
| 7.1 | ✅ ||
| 8.1 | ✅ ||
| 8.2 | ✅ ||