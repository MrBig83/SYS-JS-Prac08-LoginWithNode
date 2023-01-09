# SYS-JS-Prac08-LoginWithNode
### Login med Node.js


<p>I den här övningen skall du utveckla en headless inloggningssida.
Utgå gärna från din inloggningssida från Javascript grundkursen.

<p>Nu skall du flytta över inloggnigslogiken till servern. 

<p>Du skall utveckla ett API (Med express js) som du kan anropa från front end applikationen (Fetch) som skickar namn och lösenord till en route på servern.

<p>Skapa flera användare till ett object array (global array) på servern så att du kan logga in med olika användare. Varje användare skall ha ett unikt ID.

<p>Servern skall sedan kolla om det är en korrekt inloggning och i så fall svara med användarens ID, spara detta i localStorage på klienten. Vid felaktig inloggning skall en error skickas tillbaka.
