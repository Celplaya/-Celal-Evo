/* ---------- talen ---------- */
/* Elke taal: id, weergavenaam, vlag, spraak-taalcode, of er een artikel/
   geslacht-systeem is, zijn eigen categorienamen + iconen, en (optioneel)
   een grammatica-gids. Cultuur-tokens (kleuren/landmarks/aanmoedigingen)
   worden per taal aangevuld in style.css / app.js. */
const LANG_ORDER=["de","tr","nl"];

/* ---------- gedeelde UI-labels (taal-onafhankelijk) ---------- */
const LVL_LABEL={A1:"Makkelijk",A2:"Gemiddeld",B1:"Moeilijk",Alles:"Alles"};
const MODE_LABEL={mixed:"Sessie",new:"Nieuwe woorden",review:"Herhalen",check:"Controleren"};
const NEW_PER_SESSION=15, MASTER_IV=21;

/* ================= DUITS ================= */
const CATS_DE={bas:"Basis & begroeting",tijd:"Getallen & tijd",eten:"Eten & drinken",fam:"Familie & mensen",verb:"Alledaagse werkwoorden",reis:"Onderweg & reizen",rest:"In het restaurant",hotel:"In het hotel",zwit:"Bergen & wandelen",ch:"Typisch Zwitsers (CH)",sport:"Sport & lichaam",auto:"Auto & detailing",werk:"Werk & geld",spreek:"Gesprek & mening",zin:"Nuttige zinnetjes",gram:"Grammatica-drills"};
const CAT_ICON_DE={bas:"👋",tijd:"⏰",eten:"🍽️",fam:"👪",verb:"🏃",reis:"✈️",rest:"🍜",hotel:"🏨",zwit:"⛰️",ch:"🇨🇭",sport:"🏋️",auto:"🚗",werk:"💼",spreek:"💬",zin:"🗣️",gram:"📐"};

const WORDS_BAS=[
["A1","-","Guten Morgen","goedemorgen"],["A1","-","Guten Tag","goedendag"],["A1","-","Guten Abend","goedenavond"],["A1","-","Tschüss","doei"],["A1","-","Auf Wiedersehen","tot ziens"],["A1","-","bitte","alsjeblieft / graag gedaan"],["A1","-","danke","dank je"],["A1","-","Entschuldigung","sorry / pardon"],["A1","-","Wie geht's?","hoe gaat het?"],["A1","-","gut","goed"],["A1","-","schlecht","slecht"],["A1","-","Ich heiße …","ik heet …"],["A1","-","Ich komme aus den Niederlanden","ik kom uit Nederland"],["A1","-","Ich verstehe nicht","ik begrijp het niet"],["A1","-","langsam","langzaam"],["A1","-","natürlich","natuurlijk"],["A1","-","genau","precies / klopt"],["A1","-","leider","helaas"],["A1","-","gerne","graag"],["A1","-","vielleicht","misschien"],["A1","-","Hallo","hallo"],["A1","-","Ja","ja"],["A1","-","Nein","nee"],["A2","-","Wie bitte?","pardon? (niet verstaan)"],["A2","-","Viel Glück","veel geluk"],["B1","-","Es freut mich","aangenaam kennis te maken"],["B1","-","Macht nichts","het geeft niet"]
];
const WORDS_TIJD=[
["A1","-","eins","één"],["A1","-","zwei","twee"],["A1","-","drei","drie"],["A1","-","vier","vier"],["A1","-","fünf","vijf"],["A1","-","sechs","zes"],["A1","-","sieben","zeven"],["A1","-","acht","acht"],["A1","-","neun","negen"],["A1","-","zehn","tien"],["A1","-","zwanzig","twintig"],["A1","-","hundert","honderd"],["A1","-","heute","vandaag"],["A1","-","morgen","morgen"],["A1","-","gestern","gisteren"],["A1","-","jetzt","nu"],["A1","-","später","later"],["A1","e","Stunde","uur (60 min)"],["A1","e","Woche","week"],["A1","s","Jahr","jaar"],["A1","-","elf","elf"],["A1","-","zwölf","twaalf"],["A1","-","dreißig","dertig"],["A1","-","Montag","maandag"],["A1","-","Freitag","vrijdag"],["A2","r","Monat","maand"],["A2","-","immer","altijd"],["A2","-","manchmal","soms"],["B1","-","demnächst","binnenkort"]
];
const WORDS_ETEN=[
["A1","s","Wasser","water"],["A1","r","Kaffee","koffie"],["A1","r","Tee","thee"],["A1","s","Brot","brood"],["A1","r","Käse","kaas"],["A2","s","Frühstück","ontbijt"],["A2","s","Mittagessen","lunch"],["A2","s","Abendessen","avondeten"],["A1","r","Apfel","appel"],["A1","s","Fleisch","vlees"],["A2","s","Hähnchen","kip (gerecht)"],["A1","r","Fisch","vis"],["A2","s","Gemüse","groente"],["A2","s","Obst","fruit"],["A2","e","Rechnung","rekening"],["A2","-","bestellen","bestellen"],["A1","-","lecker","lekker"],["A2","-","satt","vol (verzadigd)"],["A1","s","Restaurant","restaurant"],["A2","e","Speisekarte","menukaart"],["A2","s","Bier","bier"],["A2","r","Wein","wijn"],["A2","e","Suppe","soep"],["A2","r","Salat","salade"],["A2","e","Milch","melk"],["A2","s","Ei","ei"],["B1","-","würzig","pittig / kruidig"],["B1","-","vegetarisch","vegetarisch"]
];
const WORDS_FAM=[
["A1","e","Familie","familie / gezin"],["A1","r","Vater","vader"],["A1","e","Mutter","moeder"],["A1","r","Bruder","broer"],["A1","e","Schwester","zus"],["A1","r","Sohn","zoon"],["A1","e","Tochter","dochter"],["A1","r","Freund","vriend"],["A1","e","Freundin","vriendin"],["A1","r","Mann","man"],["A1","e","Frau","vrouw"],["A1","s","Kind","kind"],["A1","e","Eltern","ouders"],["A1","r","Opa","opa"],["A1","e","Oma","oma"],["A2","-","verheiratet","getrouwd"],["A2","r","Nachbar","buurman"],["A1","e","Leute","mensen"],["A1","-","jung","jong"],["A1","-","alt","oud"],["A2","r","Onkel","oom"],["A2","e","Tante","tante"],["B1","-","geschieden","gescheiden"],["B1","r","Enkel","kleinzoon"],["B1","-","verwandt","verwant"]
];
const WORDS_VERB=[
["A1","-","sein","zijn"],["A1","-","haben","hebben"],["A1","-","gehen","gaan / lopen"],["A1","-","kommen","komen"],["A1","-","machen","doen / maken"],["A1","-","sagen","zeggen"],["A1","-","sehen","zien"],["A1","-","hören","horen"],["A1","-","sprechen","spreken"],["A1","-","essen","eten"],["A1","-","trinken","drinken"],["A1","-","kaufen","kopen"],["A1","-","brauchen","nodig hebben"],["A1","-","wissen","weten"],["A2","-","denken","denken"],["A2","-","finden","vinden"],["A2","-","helfen","helpen"],["A2","-","suchen","zoeken"],["A1","-","geben","geven"],["A1","-","nehmen","nemen"],["A2","-","arbeiten","werken"],["A2","-","spielen","spelen"],["A2","-","lesen","lezen"],["A2","-","schreiben","schrijven"],["B1","-","erlauben","toestaan"],["B1","-","vermeiden","vermijden"],["B1","-","sich beeilen","zich haasten"]
];
const WORDS_REIS=[
["A2","r","Bahnhof","station"],["A2","r","Zug","trein"],["A2","s","Flugzeug","vliegtuig"],["A2","r","Flughafen","luchthaven"],["A2","e","Fahrkarte","kaartje / ticket"],["A1","-","links","links"],["A1","-","rechts","rechts"],["A2","-","geradeaus","rechtdoor"],["A1","e","Straße","straat"],["A1","e","Stadt","stad"],["A1","s","Hotel","hotel"],["A1","s","Zimmer","kamer"],["A2","r","Schlüssel","sleutel"],["A2","e","Reise","reis"],["A2","r","Urlaub","vakantie"],["A2","s","Gepäck","bagage"],["A2","-","abfahren","vertrekken"],["A2","-","ankommen","aankomen"],["A2","-","buchen","boeken"],["B1","r","Ausflug","uitje / excursie"],["A2","r","Koffer","koffer"],["A2","e","Verspätung","vertraging"],["A2","r","Ausweis","identiteitsbewijs"],["B1","r","Anschluss","aansluiting (overstap)"],["B1","-","umsteigen","overstappen"],["B1","e","Grenze","grens"]
];
const WORDS_SPORT=[
["A2","r","Sport","sport"],["A2","-","trainieren","trainen"],["A1","-","laufen","hardlopen / lopen"],["A2","-","schwimmen","zwemmen"],["B1","r","Muskel","spier"],["A2","-","stark","sterk"],["A1","-","müde","moe"],["A2","-","gesund","gezond"],["A1","-","krank","ziek"],["A2","r","Körper","lichaam"],["A2","s","Herz","hart"],["B1","-","atmen","ademen"],["B1","-","sich ausruhen","uitrusten"],["A2","r","Schlaf","slaap"],["A1","-","schlafen","slapen"],["A2","s","Ziel","doel"],["A1","-","schnell","snel"],["B1","e","Kraft","kracht"],["A2","-","üben","oefenen"],["B1","s","Gewicht","gewicht"],["A2","-","spazieren","wandelen (rustig)"],["A2","-","fit","fit"],["B1","-","sich verletzen","zich blesseren"],["B1","e","Verletzung","blessure"],["B1","-","sich erholen","herstellen"]
];
const WORDS_AUTO=[
["A1","s","Auto","auto"],["A2","r","Wagen","wagen / auto"],["A2","r","Reifen","band"],["A2","s","Rad","wiel"],["A2","r","Motor","motor"],["B1","e","Motorhaube","motorkap"],["A2","r","Kofferraum","kofferbak"],["B1","e","Windschutzscheibe","voorruit"],["B1","r","Lack","lak"],["B1","e","Felge","velg"],["A2","s","Leder","leer"],["B1","r","Kratzer","kras"],["B1","-","polieren","polijsten"],["A2","-","reinigen","reinigen"],["A1","-","waschen","wassen"],["B1","r","Schaum","schuim"],["B1","s","Tuch","doek"],["B1","r","Staubsauger","stofzuiger"],["B1","-","glänzen","glanzen"],["A2","e","Werkstatt","werkplaats / garage"],["A2","-","tanken","tanken"],["A2","e","Bremse","rem"],["B1","r","Sicherheitsgurt","veiligheidsgordel"],["B1","-","reparieren","repareren"],["B1","r","Ölwechsel","olieverversing"]
];
const WORDS_WERK=[
["A1","e","Arbeit","werk"],["A2","r","Kunde","klant"],["A2","r","Termin","afspraak"],["A2","e","Firma","bedrijf"],["A2","r","Preis","prijs"],["A1","s","Geld","geld"],["A1","-","teuer","duur"],["A2","-","günstig","voordelig"],["B1","r","Vertrag","contract"],["B1","e","Versicherung","verzekering"],["B1","e","Steuer","belasting"],["B1","-","selbstständig","zelfstandig (zzp)"],["B1","s","Angebot","offerte / aanbod"],["A2","-","verdienen","verdienen"],["A2","-","bezahlen","betalen"],["A2","-","pünktlich","stipt / op tijd"],["B1","r","Feierabend","einde van de werkdag"],["B1","e","Erfahrung","ervaring"],["B1","-","zuverlässig","betrouwbaar"],["A2","r","Chef","baas"],["A2","r","Kollege","collega (man)"],["A2","e","Kollegin","collega (vrouw)"],["B1","e","Kündigung","ontslag"],["B1","-","verhandeln","onderhandelen"],["A2","-","Ich habe morgen frei.","ik heb morgen vrij"],["B1","e","Gehaltserhöhung","loonsverhoging"],["A2","r","Lohn","loon"],["B1","-","Ich arbeite von zu Hause aus.","ik werk vanuit huis"]
];
const WORDS_SPREEK=[
["B1","e","Meinung","mening"],["B1","-","Ich finde, dass …","ik vind dat …"],["B1","-","einverstanden","akkoord / mee eens"],["B1","r","Vorschlag","voorstel"],["A2","e","Frage","vraag"],["A2","e","Antwort","antwoord"],["B1","-","erklären","uitleggen"],["A2","-","verstehen","begrijpen"],["B1","-","empfehlen","aanbevelen"],["B1","-","eigentlich","eigenlijk"],["B1","-","wahrscheinlich","waarschijnlijk"],["A2","-","wichtig","belangrijk"],["B1","e","Entscheidung","beslissing"],["B1","-","entscheiden","beslissen"],["B1","-","sich freuen auf","zich verheugen op"],["A2","-","Es tut mir leid","het spijt me"],["A1","-","kein Problem","geen probleem"],["B1","r","Grund","reden"],["B1","-","deshalb","daarom"],["B1","-","zwar … aber","weliswaar … maar"],["A2","-","stimmen","kloppen (juist zijn)"],["B1","-","zustimmen","instemmen"],["B1","-","bezweifeln","betwijfelen"],["B1","e","Ausrede","excuus"],["B1","-","übertreiben","overdrijven"]
];
const WORDS_REST=[
["A2","-","Einen Tisch für zwei, bitte.","een tafel voor twee, graag"],["A2","-","Die Speisekarte, bitte.","de menukaart, graag"],["A2","-","Ich hätte gern ein Wasser.","ik wil graag een water"],["A2","-","Was können Sie empfehlen?","wat kunt u aanbevelen?"],["A2","-","Ich nehme das Schnitzel.","ik neem de schnitzel"],["A2","-","Die Rechnung, bitte.","de rekening, graag"],["A2","-","Zusammen oder getrennt?","samen of apart (betalen)?"],["B1","-","Stimmt so.","laat maar zitten (fooi)"],["A2","-","Kann ich mit Karte zahlen?","kan ik pinnen?"],["A2","-","Es hat sehr gut geschmeckt.","het heeft erg goed gesmaakt"],["A1","-","Guten Appetit!","eet smakelijk"],["A2","-","Noch etwas?","nog iets?"],["B1","-","Ich bin allergisch gegen Nüsse.","ik ben allergisch voor noten"],["A2","-","Ohne Zwiebeln, bitte.","zonder ui, graag"],["A2","s","Leitungswasser","kraanwater"],["A2","-","Ich habe eine Reservierung.","ik heb een reservering"],["A2","-","Für wie viele Personen?","voor hoeveel personen?"],["A2","-","Was empfehlen Sie?","wat beveelt u aan?"],["A2","r","Nachtisch","toetje / dessert"],["A2","e","Vorspeise","voorgerecht"],["A2","s","Hauptgericht","hoofdgerecht"],["A2","-","Ist der Tisch frei?","is deze tafel vrij?"],["A2","r","Kellner","ober"],["A2","e","Kellnerin","serveerster"],["A2","-","Zum Wohl!","proost!"],["B1","-","Ich hätte gern getrennte Rechnungen.","ik wil graag apart afrekenen"],["A2","-","Können wir noch etwas Brot haben?","kunnen we nog wat brood krijgen?"],["A2","s","Trinkgeld","fooi"],["B1","-","Ist das scharf?","is dit pittig?"],["A2","-","Ich bin satt.","ik zit vol"]
];
const WORDS_HOTEL=[
["A2","-","Ich habe ein Zimmer reserviert.","ik heb een kamer gereserveerd"],["A2","-","Auf den Namen …","op naam van …"],["A2","-","Ein Doppelzimmer für zwei Nächte.","een tweepersoonskamer voor twee nachten"],["A2","-","Ist das Frühstück inbegriffen?","is het ontbijt inbegrepen?"],["A2","-","Wann gibt es Frühstück?","hoe laat is het ontbijt?"],["A2","-","Bis wann ist der Check-out?","tot hoe laat is het uitchecken?"],["A2","-","Wie ist das WLAN-Passwort?","wat is het wifi-wachtwoord?"],["A2","-","Gibt es einen Parkplatz?","is er een parkeerplaats?"],["B1","-","Das Zimmer ist zu laut.","de kamer is te lawaaiig"],["B1","-","Die Heizung funktioniert nicht.","de verwarming doet het niet"],["B1","-","Kann ich mein Gepäck hier lassen?","kan ik mijn bagage hier laten?"],["A2","-","Können Sie ein Taxi rufen?","kunt u een taxi bellen?"],["A2","e","Rezeption","receptie"],["A2","r","Aufzug","lift"],["A2","-","Ich möchte ein Zimmer buchen.","ik wil graag een kamer boeken"],["A2","s","Einzelzimmer","eenpersoonskamer"],["A2","e","Nacht","nacht (verblijf)"],["A2","-","Haben Sie noch freie Zimmer?","heeft u nog kamers vrij?"],["A2","e","Minibar","minibar"],["A2","s","Handtuch","handdoek"],["A2","-","Können Sie mich um sieben Uhr wecken?","kunt u me om zeven uur wekken?"],["B1","-","Das WLAN funktioniert nicht.","de wifi werkt niet"],["A2","-","Ich möchte auschecken.","ik wil graag uitchecken"],["A2","r","Zimmerservice","roomservice"],["B1","-","Können Sie uns ein anderes Zimmer geben?","kunt u ons een andere kamer geven?"],["A2","-","Wo kann ich parken?","waar kan ik parkeren?"],["A2","e","Bettwäsche","beddengoed"],["A2","-","Ist das Zimmer noch frei?","is de kamer nog vrij?"]
];
const WORDS_CH=[
["A1","-","Grüezi","hallo (Zwitsers)"],["A2","-","Merci vilmal","dank je wel (Zwitsers)"],["A2","s","Velo","fiets (Zwitsers-Duits)"],["A2","s","Billett","kaartje (Zwitsers-Duits)"],["A2","r","Franken","frank (CHF)"],["A2","-","Grüezi mitenand","hallo allemaal (Zwitsers)"],["A2","-","Uf Widerluege","tot ziens (Zwitsers)"],["B1","-","parkieren","parkeren (Zwitsers, DE: parken)"],["B1","s","Trottoir","stoep (Zwitsers, DE: Gehweg)"],["B1","s","Poulet","kip (Zwitsers, DE: Hähnchen)"],["B1","s","Znüni","tussendoortje rond 9 uur (Zwitsers)"],["B1","-","Es isch guet.","het is goed (Zwitsers)"],["A2","s","Müesli","muesli (Zwitsers ontbijt)"],["B1","r","Coiffeur","kapper (Zwitsers, DE: Friseur)"],["A2","-","Zmorge","ontbijt (Zwitsers, DE: Frühstück)"],["A2","-","Zmittag","lunch (Zwitsers, DE: Mittagessen)"],["A2","-","Znacht","avondeten (Zwitsers, DE: Abendessen)"],["B1","-","Zvieri","tussendoortje in de namiddag (Zwitsers)"],["A2","s","Natel","mobiele telefoon (Zwitsers woord)"],["B1","-","Röstigraben","denkbeeldige grens tussen Duits- en Franstalig Zwitserland"],["A2","-","Postauto","(post)bus op het platteland (Zwitsers)"],["B1","-","Beiz","eenvoudig café/kroeg (Zwitsers, DE: Kneipe)"],["A2","-","Guetzli","koekje (Zwitsers, DE: Keks)"],["B1","-","Chuchichäschtli","keukenkastje (bekend Zwitsers-Duits testwoord)"],["A1","-","Salü","hoi / hallo (informeel Zwitsers)"],["A2","-","Tschau zäme","doei allemaal (Zwitsers)"]
];
const WORDS_ZWIT=[
["A1","r","Berg","berg"],["A2","s","Tal","dal"],["B1","r","Gipfel","bergtop"],["A1","r","See","meer"],["A2","e","Seilbahn","kabelbaan"],["A2","e","Wanderung","bergwandeling / hike"],["A2","-","wandern","wandelen (in de bergen)"],["B1","r","Wanderweg","wandelpad"],["B1","e","Hütte","berghut"],["A1","s","Wetter","weer"],["A1","r","Schnee","sneeuw"],["B1","e","Aussicht","uitzicht"],["B1","-","steil","steil"],["B1","-","Ist der Weg schwierig?","is de route moeilijk?"],["A2","-","Wie komme ich zum Bahnhof?","hoe kom ik bij het station?"],["A2","r","Gletscher","gletsjer"],["B1","e","Alp","alpenweide"],["A2","-","klettern","klimmen"],["B1","-","rutschig","glad (onder de voeten)"],["A2","-","bergauf","bergop"],["A2","-","bergab","bergaf"],["B1","e","Höhe","hoogte"],["A2","r","Pass","bergpas"],["B1","-","Wir haben den Gipfel erreicht.","we hebben de top bereikt"],["A2","e","Ausrüstung","uitrusting"],["A2","r","Rucksack","rugzak"],["A2","e","Wasserflasche","waterfles"],["B1","-","Der Weg ist gut markiert.","de route is goed gemarkeerd"],["A2","-","Wie lange dauert die Wanderung?","hoe lang duurt de wandeling?"],["B1","r","Nebel","mist"]
];
const WORDS_GRAM=[
["A2","-","Ich hätte gern einen Kaffee.","ik wil graag een koffie (beleefd bestellen)"],["A2","-","Ich muss morgen arbeiten.","ik moet morgen werken"],["A2","-","Ich kann dir helfen.","ik kan je helpen"],["A2","-","Ich habe gestern gearbeitet.","ik heb gisteren gewerkt"],["B1","-","Ich bin nach Hause gegangen.","ik ben naar huis gegaan"],["A2","-","Morgen gehe ich ins Fitnessstudio.","morgen ga ik naar de sportschool"],["B1","-","Ich weiß, dass es teuer ist.","ik weet dat het duur is"],["B1","-","Ich sehe den Mann.","ik zie de man"],["B1","-","Ich helfe dem Mann.","ik help de man"],["A1","-","Sprechen Sie Deutsch?","spreekt u Duits? (beleefd)"],["A1","-","Kannst du mir helfen?","kun je me helpen? (informeel)"],["B1","-","Ich freue mich auf den Urlaub.","ik verheug me op de vakantie"],["A2","-","Am Wochenende fahre ich nach Bern.","in het weekend rijd ik naar Bern"],["B1","-","Ich glaube, dass er recht hat.","ik denk dat hij gelijk heeft"],["B1","-","Ich rufe dich an, wenn ich Zeit habe.","ik bel je als ik tijd heb"],["B1","-","Der Kunde wartet auf die Antwort.","de klant wacht op het antwoord"],["B1","-","Ich gebe der Frau das Buch.","ik geef de vrouw het boek"],["A2","-","Wir sind ins Kino gegangen.","we zijn naar de bioscoop gegaan"],["A2","-","Hast du das Auto gewaschen?","heb je de auto gewassen?"],["B1","-","Ich darf heute später kommen.","ik mag vandaag later komen"],["B1","-","Wir wollen morgen wandern gehen.","we willen morgen gaan wandelen"],["A1","-","Wie heißen Sie?","hoe heet u? (beleefd)"],["B1","-","Ich weiß nicht, ob er kommt.","ik weet niet of hij komt"],["B1","-","Ich habe ihr geholfen.","ik heb haar geholpen"],["A2","-","Kannst du mir bitte helfen?","kun je me alsjeblieft helpen?"]
];
const WORDS_ZIN=[
["A1","-","Wie spät ist es?","hoe laat is het?"],["A1","-","Wo ist die Toilette?","waar is het toilet?"],["A1","-","Was kostet das?","wat kost dat?"],["A1","-","Ich brauche Hilfe.","ik heb hulp nodig"],["A1","-","Alles klar.","helemaal duidelijk / oké"],["A2","-","Können Sie das wiederholen?","kunt u dat herhalen?"],["A2","-","Ich habe eine Frage.","ik heb een vraag"],["A2","-","Wo kann ich das kaufen?","waar kan ik dat kopen?"],["A2","-","Ich bin neu hier.","ik ben hier nieuw"],["A2","-","Das macht nichts.","dat maakt niet uit"],["B1","-","Könnten Sie mir bitte helfen?","zou u mij alstublieft kunnen helpen?"],["B1","-","Das habe ich nicht verstanden.","dat heb ik niet begrepen"],["B1","-","Wie lange dauert das?","hoe lang duurt dat?"],["B1","-","Ich melde mich später bei dir.","ik neem later contact met je op"],["B1","-","Es kommt darauf an.","het hangt ervan af"],["A1","-","Guten Rutsch!","fijne jaarwisseling!"],["A1","-","Bis bald!","tot snel!"],["A2","-","Ich brauche einen Moment.","ik heb een momentje nodig"],["A2","-","Können Sie langsamer sprechen?","kunt u langzamer spreken?"],["A2","-","Wo ist der Ausgang?","waar is de uitgang?"],["A2","-","Ich habe mich verlaufen.","ik ben verdwaald"],["B1","-","Das ergibt Sinn.","dat is logisch / dat slaat ergens op"],["A2","-","Genau richtig.","precies goed"],["B1","-","Ich bin mir nicht sicher.","ik weet het niet zeker"],["A1","-","Herzlichen Glückwunsch!","gefeliciteerd!"],["A2","-","Gute Besserung!","beterschap!"],["B1","-","Machen Sie sich keine Sorgen.","maakt u zich geen zorgen"],["A1","-","Schönen Tag noch!","nog een fijne dag!"]
];
const CATEGORY_WORDS_DE={bas:WORDS_BAS,tijd:WORDS_TIJD,eten:WORDS_ETEN,fam:WORDS_FAM,verb:WORDS_VERB,reis:WORDS_REIS,sport:WORDS_SPORT,auto:WORDS_AUTO,werk:WORDS_WERK,spreek:WORDS_SPREEK,rest:WORDS_REST,hotel:WORDS_HOTEL,ch:WORDS_CH,zwit:WORDS_ZWIT,gram:WORDS_GRAM,zin:WORDS_ZIN};
const W_DE=Object.entries(CATEGORY_WORDS_DE).flatMap(([cat,list])=>list.map(w=>[cat,...w]));

const ART={r:["der","a-der"],e:["die","a-die"],s:["das","a-das"],d:["de","a-der"],h:["het","a-das"]};
const GRAM_DE=[
["Werkwoord altijd op plek 2","In een gewone zin staat het vervoegde werkwoord ALTIJD op de tweede plek — ook als de zin met iets anders begint. Begin je met 'morgen', dan komt het werkwoord meteen daarna en schuift 'ik' erachter (inversie).",["Ich gehe morgen ins Gym.|Ik ga morgen naar de gym.","Morgen gehe ich ins Gym.|Morgen ga ik naar de gym.","Am Samstag arbeite ich nicht.|Zaterdag werk ik niet."]],
["Bijzin: werkwoord naar het einde","Na woorden als dass (dat), weil (omdat) en wenn (als) gaat het werkwoord helemaal naar het einde van de bijzin. Dit is dé regel die Duits 'Duits' maakt.",["Ich weiß, dass es teuer ist.|Ik weet dat het duur is.","Ich bleibe zu Hause, weil ich müde bin.|Ik blijf thuis omdat ik moe ben."]],
["Naamvallen light: der → den → dem","Het lidwoord verandert mee met de rol in de zin. Onderwerp: der Mann. Lijdend voorwerp (accusatief): den Mann. Na o.a. helfen, mit, zu (datief): dem Mann. Die en das veranderen alleen in de datief (der/dem).",["Der Mann ist nett.|De man is aardig. (onderwerp)","Ich sehe den Mann.|Ik zie de man. (accusatief)","Ich helfe dem Mann.|Ik help de man. (datief)"]],
["Verleden tijd: het Perfekt","Spreektaal gebruikt bijna altijd het Perfekt: haben/sein + voltooid deelwoord achteraan. Sein bij beweging of verandering (gegangen, gefahren), haben bij de rest. Net als in het Nederlands, alleen strikter: het deelwoord staat écht op het einde.",["Ich habe gestern gearbeitet.|Ik heb gisteren gewerkt.","Ich bin nach Zürich gefahren.|Ik ben naar Zürich gereden."]],
["Modale werkwoorden","Müssen (moeten), können (kunnen), wollen (willen), dürfen (mogen): het modale werkwoord staat op plek 2, het hele werkwoord gaat naar het einde.",["Ich muss morgen arbeiten.|Ik moet morgen werken.","Kann ich mit Karte zahlen?|Kan ik pinnen?","Ich will Deutsch lernen.|Ik wil Duits leren."]],
["Du of Sie? (+ Zwitserse tip)","Sie (met hoofdletter) tegen onbekenden, personeel en klanten — beleefd en altijd veilig. Du tegen vrienden en in de gym. In Zwitserland werkt je standaard Duits overal; je hoort er alleen Grüezi in plaats van Guten Tag en merci in plaats van danke. Gewoon Hochdeutsch terugpraten is prima.",["Sprechen Sie Englisch?|Spreekt u Engels?","Kannst du mir helfen?|Kun je me helpen?"]]
];

/* ================= TURKS ================= */
const CATS_TR={...CATS_DE,ch:"Typisch Turks",naamval:"Naamvallen & klinkerharmonie"};
const CAT_ICON_TR={...CAT_ICON_DE,eten:"🥙",rest:"🍲",zwit:"🎈",ch:"🍵",naamval:"🧩"};

const WORDS_TR_BAS=[
["A1","-","Günaydın","goedemorgen"],["A1","-","İyi günler","goedendag"],["A1","-","İyi akşamlar","goedenavond"],["A1","-","Hoşça kal","doei (tegen wie vertrekt)"],["A1","-","Güle güle","doei (tegen wie blijft)"],["A1","-","lütfen","alsjeblieft"],["A1","-","teşekkür ederim","dank je wel"],["A1","-","teşekkürler","bedankt"],["A1","-","affedersiniz","sorry / pardon"],["A1","-","Nasılsın?","hoe gaat het? (informeel)"],["A1","-","iyi","goed"],["A1","-","kötü","slecht"],["A1","-","Benim adım …","ik heet …"],["A1","-","Anlamıyorum","ik begrijp het niet"],["A1","-","yavaş","langzaam"],["A1","-","tabii","natuurlijk"],["A1","-","belki","misschien"],["A1","-","Merhaba","hallo"],["A1","-","Evet","ja"],["A1","-","Hayır","nee"],["A1","-","Hoşgeldiniz","welkom","Als antwoord zeg je 'Hoşbulduk' — de twee groeten horen bij elkaar."],["A1","-","Hoşbulduk","dankjewel voor het welkom (antwoord op Hoşgeldiniz)"],["A2","-","Nasılsınız?","hoe gaat het? (beleefd, meervoud)"],["A2","-","Efendim?","pardon? (niet verstaan)"],["A2","-","İyi şanslar","veel geluk"],["A2","-","Rica ederim","graag gedaan"],["A2","-","Hollanda'dan geliyorum","ik kom uit Nederland"],["A2","-","Görüşürüz","tot ziens (zie je snel)"],["B1","-","Memnun oldum","aangenaam kennis te maken"],["B1","-","Önemli değil","het geeft niet"],["B1","-","Kolay gelsin","gezegd tegen iemand die werkt, letterlijk 'moge het makkelijk komen'"]
];
const WORDS_TR_TIJD=[
["A1","-","bir","één"],["A1","-","iki","twee"],["A1","-","üç","drie"],["A1","-","dört","vier"],["A1","-","beş","vijf"],["A1","-","altı","zes"],["A1","-","yedi","zeven"],["A1","-","sekiz","acht"],["A1","-","dokuz","negen"],["A1","-","on","tien"],["A1","-","yirmi","twintig"],["A1","-","yüz","honderd"],["A1","-","bugün","vandaag"],["A1","-","yarın","morgen"],["A1","-","dün","gisteren"],["A1","-","şimdi","nu"],["A1","-","sonra","later"],["A1","-","saat","uur"],["A1","-","hafta","week"],["A1","-","yıl","jaar"],["A1","-","on bir","elf"],["A1","-","on iki","twaalf"],["A1","-","otuz","dertig"],["A1","-","Pazartesi","maandag"],["A1","-","Cuma","vrijdag"],["A2","-","ay","maand"],["A2","-","her zaman","altijd"],["A2","-","bazen","soms"],["B1","-","yakında","binnenkort"]
];
const WORDS_TR_ETEN=[
["A1","-","su","water"],["A1","-","kahve","koffie"],["A1","-","çay","thee"],["A1","-","ekmek","brood"],["A1","-","peynir","kaas"],["A2","-","kahvaltı","ontbijt"],["A2","-","öğle yemeği","lunch"],["A2","-","akşam yemeği","avondeten"],["A1","-","elma","appel"],["A1","-","et","vlees"],["A2","-","tavuk","kip (gerecht)"],["A1","-","balık","vis"],["A2","-","sebze","groente"],["A2","-","meyve","fruit"],["A2","-","hesap","rekening"],["A2","-","sipariş vermek","bestellen"],["A1","-","lezzetli","lekker"],["A2","-","tok","vol (verzadigd)"],["A1","-","restoran","restaurant"],["A2","-","menü","menukaart"],["A2","-","bira","bier"],["A2","-","şarap","wijn"],["A2","-","çorba","soep"],["A2","-","salata","salade"],["A2","-","süt","melk"],["A2","-","yumurta","ei"],["B1","-","baharatlı","pittig / kruidig"],["B1","-","vejetaryen","vegetarisch"]
];
const WORDS_TR_FAM=[
["A1","-","aile","familie / gezin"],["A1","-","baba","vader"],["A1","-","anne","moeder"],["A1","-","kardeş","broer of zus","Kardeş is geslachtsneutraal. Specifiek: erkek kardeş = broer, kız kardeş = zus."],["A2","-","abi","oudere broer","Voor een OUDERE broer zeg je 'abi', voor jongere gewoon 'kardeş' — leeftijd bepaalt het woord, niet alleen geslacht."],["A2","-","abla","oudere zus"],["A1","-","oğul","zoon"],["A1","-","kız","dochter","Kız betekent ook gewoon 'meisje' — context bepaalt de betekenis."],["A1","-","arkadaş","vriend(in)"],["A2","-","erkek arkadaş","vriendje"],["A2","-","kız arkadaş","vriendinnetje"],["A2","-","koca","echtgenoot"],["B1","-","eş","echtgenoot / echtgenote (neutraal)"],["A1","-","çocuk","kind"],["B1","-","ebeveyn","ouders"],["A1","-","dede","opa"],["A1","-","büyükanne","oma"],["A2","-","evli","getrouwd"],["A2","-","komşu","buurman / buurvrouw"],["A1","-","insanlar","mensen"],["A1","-","genç","jong"],["A1","-","yaşlı","oud"],["A2","-","amca","oom (vaderskant)","Turks maakt onderscheid: amca = vaders broer, dayı = moeders broer."],["A2","-","dayı","oom (moederskant)"],["A2","-","teyze","tante (moederskant)"],["A2","-","hala","tante (vaderskant)"],["B1","-","boşanmış","gescheiden"],["B1","-","torun","kleinkind"],["B1","-","akraba","verwant"]
];
const WORDS_TR_VERB=[
["A1","-","olmak","zijn"],["A1","-","var / yok","hebben (er is / er is niet)","Turks heeft geen werkwoord voor bezit: 'Param var' = 'ik heb geld' (letterlijk: mijn geld is-er)."],["A1","-","gitmek","gaan"],["A1","-","gelmek","komen"],["A1","-","yapmak","doen / maken"],["A1","-","söylemek","zeggen"],["A1","-","görmek","zien"],["A1","-","duymak","horen"],["A1","-","konuşmak","spreken"],["A1","-","yemek","eten"],["A1","-","içmek","drinken"],["A1","-","almak","kopen / nemen","Almak betekent zowel 'kopen' als 'nemen' — de context maakt het duidelijk."],["A2","-","ihtiyacı olmak","nodig hebben"],["A1","-","bilmek","weten"],["A2","-","düşünmek","denken"],["A2","-","bulmak","vinden"],["A2","-","yardım etmek","helpen"],["A2","-","aramak","zoeken / bellen","Aramak betekent ook 'bellen (telefoneren)' — heel gangbaar dubbelgebruik."],["A1","-","vermek","geven"],["A2","-","çalışmak","werken"],["A2","-","oynamak","spelen"],["A2","-","okumak","lezen"],["A2","-","yazmak","schrijven"],["B1","-","izin vermek","toestaan"],["B1","-","kaçınmak","vermijden"],["B1","-","acele etmek","zich haasten"]
];
const WORDS_TR_REIS=[
["A2","-","istasyon","station"],["A2","-","tren","trein"],["A2","-","uçak","vliegtuig"],["A2","-","havalimanı","luchthaven"],["A2","-","bilet","kaartje / ticket"],["A1","-","sol","links"],["A1","-","sağ","rechts"],["A2","-","düz","rechtdoor"],["A1","-","sokak","straat"],["A1","-","şehir","stad"],["A1","-","otel","hotel"],["A1","-","oda","kamer"],["A2","-","anahtar","sleutel"],["A2","-","seyahat","reis"],["A2","-","tatil","vakantie"],["A2","-","bagaj","bagage"],["A2","-","kalkmak","vertrekken"],["A2","-","varmak","aankomen"],["A2","-","rezervasyon yapmak","boeken"],["B1","-","gezi","uitje / excursie"],["A2","-","valiz","koffer"],["A2","-","gecikme","vertraging"],["A2","-","kimlik","identiteitsbewijs"],["B1","-","aktarma","aansluiting (overstap)"],["B1","-","aktarma yapmak","overstappen"],["B1","-","sınır","grens"]
];
const WORDS_TR_SPORT=[
["A2","-","spor","sport"],["A2","-","antrenman yapmak","trainen"],["A1","-","koşmak","hardlopen"],["A2","-","yüzmek","zwemmen"],["B1","-","kas","spier"],["A2","-","güçlü","sterk"],["A1","-","yorgun","moe"],["A2","-","sağlıklı","gezond"],["A1","-","hasta","ziek"],["A2","-","vücut","lichaam"],["A2","-","kalp","hart"],["B1","-","nefes almak","ademen"],["B1","-","dinlenmek","uitrusten"],["A2","-","uyku","slaap"],["A1","-","uyumak","slapen"],["A2","-","hedef","doel"],["A1","-","hızlı","snel"],["B1","-","güç","kracht"],["A2","-","pratik yapmak","oefenen"],["B1","-","kilo","gewicht"],["A2","-","yürüyüş yapmak","wandelen (rustig)"],["A2","-","formda","fit"],["B1","-","yaralanmak","zich blesseren"],["B1","-","yaralanma","blessure"],["B1","-","iyileşmek","herstellen"]
];
const WORDS_TR_AUTO=[
["A1","-","araba","auto"],["A2","-","araç","voertuig"],["A2","-","lastik","band"],["A2","-","tekerlek","wiel"],["A2","-","motor","motor"],["B1","-","motor kaputu","motorkap"],["A2","-","bagaj","kofferbak"],["B1","-","ön cam","voorruit"],["B1","-","boya","lak"],["B1","-","jant","velg"],["A2","-","deri","leer"],["B1","-","çizik","kras"],["B1","-","cilalamak","polijsten"],["A2","-","temizlemek","reinigen"],["A1","-","yıkamak","wassen"],["B1","-","köpük","schuim"],["B1","-","bez","doek"],["B1","-","elektrikli süpürge","stofzuiger"],["B1","-","parlamak","glanzen"],["A2","-","tamirhane","werkplaats / garage"],["A2","-","benzin almak","tanken"],["A2","-","sürücü","bestuurder"],["A2","-","fren","rem"],["B1","-","emniyet kemeri","veiligheidsgordel"],["B1","-","tamir etmek","repareren"],["B1","-","yağ değişimi","olieverversing"]
];
const WORDS_TR_WERK=[
["A1","-","iş","werk"],["A2","-","müşteri","klant"],["A2","-","randevu","afspraak"],["A2","-","şirket","bedrijf"],["A2","-","fiyat","prijs"],["A1","-","para","geld"],["A1","-","pahalı","duur"],["A2","-","ucuz","goedkoop"],["B1","-","sözleşme","contract"],["B1","-","sigorta","verzekering"],["B1","-","vergi","belasting"],["B1","-","serbest çalışan","zelfstandig (zzp)"],["B1","-","teklif","offerte / aanbod"],["A2","-","kazanmak","verdienen"],["A2","-","ödemek","betalen"],["A2","-","dakik","stipt / op tijd"],["B1","-","mesai","werktijd / overwerk"],["B1","-","deneyim","ervaring"],["B1","-","güvenilir","betrouwbaar"],["A2","-","patron","baas"],["A2","-","meslektaş","collega"],["B1","-","istifa","ontslag"],["B1","-","pazarlık yapmak","onderhandelen"],["A2","-","maaş","salaris"],["B1","-","zam","loonsverhoging"],["B1","-","evden çalışmak","vanuit huis werken"]
];
const WORDS_TR_SPREEK=[
["B1","-","fikir","mening"],["B1","-","Bence …","volgens mij / ik vind dat …","'Bence' = ben (ik) + -ce: een mooi voorbeeld van agglutinatie, één achtervoegsel maakt er 'volgens mij' van."],["B1","-","katılıyorum","ik ben het eens"],["B1","-","katılmıyorum","ik ben het niet eens"],["A2","-","öneri","voorstel"],["A2","-","soru","vraag"],["A2","-","cevap","antwoord"],["B1","-","açıklamak","uitleggen"],["A2","-","anlamak","begrijpen"],["B1","-","tavsiye etmek","aanbevelen"],["B1","-","aslında","eigenlijk"],["B1","-","muhtemelen","waarschijnlijk"],["A2","-","önemli","belangrijk"],["B1","-","karar","beslissing"],["B1","-","karar vermek","beslissen"],["B1","-","dört gözle beklemek","zich verheugen op","Letterlijk 'met vier ogen wachten' — een levendige uitdrukking voor ergens naar uitkijken."],["A2","-","Özür dilerim","het spijt me"],["A1","-","sorun değil","geen probleem"],["B1","-","sebep","reden"],["B1","-","bu yüzden","daarom"],["A2","-","doğru","juist / klopt"],["A2","-","yanlış","fout / onjuist"],["B1","-","haklısın","je hebt gelijk"],["B1","-","belki de","misschien wel"],["B1","-","abartmak","overdrijven"]
];
const WORDS_TR_REST=[
["A2","-","İki kişilik bir masa, lütfen.","een tafel voor twee, graag"],["A2","-","Menüyü alabilir miyim?","mag ik de menukaart?"],["A2","-","Bir su rica ediyorum.","ik wil graag een water"],["A2","-","Ne tavsiye edersiniz?","wat beveelt u aan?"],["A2","-","Hesabı alabilir miyim?","mag ik de rekening?"],["B1","-","Ayrı ödeyebilir miyiz?","kunnen we apart betalen?"],["A2","-","Kartla ödeyebilir miyim?","kan ik met kaart betalen?"],["A1","-","Afiyet olsun!","eet smakelijk"],["B1","-","Elimize sağlık!","complimenten voor de kok","Letterlijk 'gezondheid voor onze handen' — een warme Turkse manier om een maaltijd te prijzen."],["A2","-","Çok lezzetliydi.","het was erg lekker"],["A2","-","Başka bir şey?","nog iets?"],["B1","-","Fıstık alerjim var.","ik ben allergisch voor noten"],["A2","-","Soğansız, lütfen.","zonder ui, graag"],["A2","-","musluk suyu","kraanwater"],["A2","-","garson","ober / serveerder"],["A2","-","tatlı","toetje / dessert"],["A2","-","ön yemek","voorgerecht"],["A2","-","ana yemek","hoofdgerecht"],["A2","-","Masa boş mu?","is deze tafel vrij?"],["A1","-","Şerefe!","proost!"],["A2","-","bahşiş","fooi"],["B1","-","Acı mı?","is het pittig?"],["A2","-","Doydum.","ik zit vol"],["A2","-","Rezervasyonum var.","ik heb een reservering"],["A2","-","Kaç kişisiniz?","voor hoeveel personen?"]
];
const WORDS_TR_HOTEL=[
["A2","-","Bir oda ayırttım.","ik heb een kamer gereserveerd"],["A2","-","tek kişilik oda","eenpersoonskamer"],["A2","-","İki gece için çift kişilik oda.","tweepersoonskamer voor twee nachten"],["A2","-","Kahvaltı dahil mi?","is het ontbijt inbegrepen?"],["A2","-","Kahvaltı saat kaçta?","hoe laat is het ontbijt?"],["A2","-","Çıkış saati kaçta?","tot hoe laat is het uitchecken?"],["A2","-","Wifi şifresi nedir?","wat is het wifi-wachtwoord?"],["A2","-","Otopark var mı?","is er een parkeerplaats?"],["B1","-","Oda çok gürültülü.","de kamer is te lawaaiig"],["B1","-","Kalorifer çalışmıyor.","de verwarming doet het niet"],["B1","-","Bagajımı burada bırakabilir miyim?","kan ik mijn bagage hier laten?"],["A2","-","Taksi çağırabilir misiniz?","kunt u een taxi bellen?"],["A2","-","resepsiyon","receptie"],["A2","-","asansör","lift"],["A2","-","Boş odanız var mı?","heeft u nog kamers vrij?"],["A2","-","minibar","minibar"],["A2","-","havlu","handdoek"],["B1","-","Beni yedide uyandırabilir misiniz?","kunt u me om zeven uur wekken?"],["A2","-","oda servisi","roomservice"],["A2","-","Nerede park edebilirim?","waar kan ik parkeren?"],["A2","-","nevresim","beddengoed"],["A2","-","Check-out yapmak istiyorum.","ik wil graag uitchecken"],["A2","-","anahtar kartı","sleutelkaart"],["B1","-","Başka bir oda verebilir misiniz?","kunt u ons een andere kamer geven?"],["A2","-","Oda hâlâ boş mu?","is de kamer nog vrij?"]
];
const WORDS_TR_CH=[
["A2","-","Çok yaşa!","gezondheid! (tegen iemand die niest)","Het gebruikelijke antwoord is 'Sen de gör' (jij ook!)."],["A2","-","Sen de gör","jij ook! (antwoord op Çok yaşa)"],["B1","-","Nazar değmesin","moge het geen boze blik krijgen","Gezegd bij iets moois, verwijst naar het bijgeloof rond de nazar boncuğu (blauwe kraal)."],["B1","-","Maşallah","prachtig! / God behoede","Compliment-uitdrukking die tegelijk het boze oog afweert."],["B1","-","İnşallah","als God het wil / hopelijk"],["A2","-","Buyurun","alstublieft / ga uw gang (bij iets aanbieden)"],["A2","-","Eyvallah","bedankt / oké (informeel)"],["A2","-","Çay ister misiniz?","wilt u thee?"],["A1","-","Bir çay daha","nog een thee"],["A2","-","Türk kahvesi","Turkse koffie"],["A2","-","simit","sesamring (Turks straatgebak)"],["B1","-","Kapalıçarşı","de Grote Bazaar (Istanbul)"],["A2","-","hamam","Turks bad"],["B1","-","nazar boncuğu","blauwe kraal tegen het boze oog"],["A2","-","Geçmiş olsun","beterschap (bij ziekte of pech)"],["B1","-","Hayırlı olsun","moge het goed uitpakken (bij een nieuwe start)"],["B1","-","Allah'a emanet ol","het ga je goed (afscheidsgroet)"],["B1","-","Ellerine sağlık","complimenten voor je (hand)werk"],["A2","-","bayram","feestdag"],["A2","-","Bayramınız kutlu olsun","fijne feestdag!"],["A2","-","dolmuş","gedeelde minibustaxi"],["B1","-","Türk usulü","op zijn Turks / de Turkse manier"],["B1","-","keyif","genot / plezier"],["A1","-","sıcak","warm","Sıcak betekent ook 'gastvrij, hartelijk' als je het over mensen hebt."]
];
const WORDS_TR_ZWIT=[
["A1","-","dağ","berg"],["A2","-","vadi","dal"],["B1","-","zirve","bergtop"],["A1","-","göl","meer"],["A2","-","teleferik","kabelbaan"],["A2","-","yürüyüş","wandeling / hike"],["A2","-","yürüyüş yolu","wandelpad"],["B1","-","dağ evi","berghut"],["A1","-","hava durumu","weer"],["A1","-","kar","sneeuw"],["B1","-","manzara","uitzicht"],["B1","-","dik","steil"],["B1","-","Yol zor mu?","is de route moeilijk?"],["A2","-","İstasyona nasıl giderim?","hoe kom ik bij het station?"],["A2","-","buzul","gletsjer"],["B1","-","yayla","alpenweide / hoogvlakte"],["A2","-","tırmanmak","klimmen"],["B1","-","kaygan","glad (onder de voeten)"],["A2","-","sıcak hava balonu","heteluchtballon","Cappadocië is wereldberoemd om de heteluchtballonvaarten bij zonsopgang."],["B1","-","peri bacaları","sprookjesschoorstenen","De unieke rotsformaties van Cappadocië, ontstaan door erosie."],["B1","-","vadi turu","dalentocht"],["B1","-","Zirveye ulaştık.","we hebben de top bereikt"],["A2","-","ekipman","uitrusting"],["A2","-","sırt çantası","rugzak"],["A2","-","su şişesi","waterfles"],["A2","-","Yürüyüş ne kadar sürer?","hoe lang duurt de wandeling?"],["B1","-","sis","mist"]
];
const WORDS_TR_GRAM=[
["A2","-","Kitabı okuyorum.","ik lees het boek","-yor is de uitgang voor de tegenwoordige tijd: oku+yor+um = 'ik ben aan het lezen'."],["A2","-","Yarın İstanbul'a gidiyorum.","morgen ga ik naar Istanbul","Richting wordt uitgedrukt met de uitgang -a/-e, niet met een los voorzetsel 'naar'."],["A2","-","Evde kalıyorum çünkü yorgunum.","ik blijf thuis omdat ik moe ben"],["A2","-","Dün çalıştım.","ik heb gisteren gewerkt","Verleden tijd -tı/-ti/-tu/-tü past zich aan op klank: dit heet klinkerharmonie."],["B1","-","Eve gittim.","ik ben naar huis gegaan"],["A2","-","Yarın spor salonuna gidiyorum.","morgen ga ik naar de sportschool"],["B1","-","Pahalı olduğunu biliyorum.","ik weet dat het duur is","Turks gebruikt geen los voegwoord 'dat': de bijzin wordt een zelfstandig naamwoord met -dığı(nı)."],["B1","-","Adamı görüyorum.","ik zie de man","Accusatief -ı bij een bepaald lijdend voorwerp (belirtme hali)."],["B1","-","Adama yardım ediyorum.","ik help de man","Datief -a: 'yardım etmek' (helpen) vraagt om de datiefvorm."],["A1","-","Türkçe biliyor musunuz?","spreekt u Turks? (beleefd)"],["A1","-","Bana yardım edebilir misin?","kun je me helpen? (informeel)"],["B1","-","Tatili iple çekiyorum.","ik verheug me op de vakantie","Idioom: 'iple çekmek' = ergens vol verlangen naar uitkijken."],["B1","-","Yarın gelip gelmeyeceğini bilmiyorum.","ik weet niet of hij morgen komt"],["B1","-","Ona yardım ettim.","ik heb hem/haar geholpen"],["A2","-","Bana yardım eder misin?","kun je me alsjeblieft helpen?"],["A2","-","Kahve içmek istiyorum.","ik wil graag koffie drinken"],["B1","-","Yarın çalışmam lazım.","ik moet morgen werken","'Lazım' (nodig/moeten) + bezittelijke uitgang op het werkwoord: çalışma+m lazım."],["A2","-","Sana yardım edebilirim.","ik kan je helpen"],["A1","-","evler","huizen","Meervoud -ler/-lar volgt klinkerharmonie: evler, maar kitaplar."],["A1","-","kitaplar","boeken"],["A2","-","Kalemim var.","ik heb een pen","Bezit wordt uitgedrukt met 'var' (er is), niet met een werkwoord 'hebben'."],["A2","-","Param yok.","ik heb geen geld","'Yok' is het tegenovergestelde van 'var': 'er is niet'."]
];
const WORDS_TR_ZIN=[
["A1","-","Saat kaç?","hoe laat is het?"],["A1","-","Tuvalet nerede?","waar is het toilet?"],["A1","-","Bu ne kadar?","wat kost dat?"],["A1","-","Yardıma ihtiyacım var.","ik heb hulp nodig"],["A2","-","Anlaşıldı.","helemaal duidelijk / oké"],["A2","-","Tekrar edebilir misiniz?","kunt u dat herhalen?"],["A2","-","Bir sorum var.","ik heb een vraag"],["A2","-","Bunu nereden alabilirim?","waar kan ik dat kopen?"],["A2","-","Buraya yeniyim.","ik ben hier nieuw"],["A2","-","Önemli değil.","dat maakt niet uit"],["B1","-","Bana yardım edebilir misiniz?","zou u mij kunnen helpen?"],["B1","-","Anlamadım.","dat heb ik niet begrepen"],["B1","-","Ne kadar sürer?","hoe lang duurt dat?"],["B1","-","Sana sonra haber veririm.","ik neem later contact met je op"],["B1","-","Duruma göre değişir.","het hangt ervan af"],["A1","-","İyi yıllar!","fijne jaarwisseling!"],["A1","-","Görüşmek üzere!","tot snel!"],["A2","-","Bir dakika lütfen.","een momentje alstublieft"],["A2","-","Daha yavaş konuşabilir misiniz?","kunt u langzamer spreken?"],["A2","-","Çıkış nerede?","waar is de uitgang?"],["A2","-","Kayboldum.","ik ben verdwaald"],["B1","-","Mantıklı.","dat is logisch"],["A2","-","Tam olarak öyle.","precies goed"],["B1","-","Emin değilim.","ik weet het niet zeker"],["A1","-","Tebrikler!","gefeliciteerd!"],["A2","-","Geçmiş olsun!","beterschap!"],["B1","-","Merak etme.","maak je geen zorgen"],["A1","-","İyi günler dilerim!","nog een fijne dag!"]
];
const WORDS_TR_NAAMVAL=[
["A2","-","evde","in huis (ev = huis)","Lokatief -de/-da: 'in/op/bij' zit in het achtervoegsel, niet in een los woord. Na e/i klinkt het -de, na a/ı/o/u -da."],
["A2","-","eve","naar huis (richting)","Richtingsuitgang (datief) -e/-a: 'eve' = naar huis. Volgt dezelfde klinkerharmonie als -de/-da."],
["A2","-","evden","vanuit huis / van huis","Ablatief -den/-dan: 'vandaan, uit'. Weer dezelfde harmonie: e/i → -den, a/ı/o/u → -dan."],
["B1","-","okuldan","vanuit school (okul = school)","Zelfde ablatief -dan, nu met de a/ı/o/u-groep omdat 'okul' een achterklinker-woord is."],
["A2","-","okula","naar school","Richting -a omdat 'okul' een achterklinker-woord is (harmonie: a/ı/o/u-groep)."],
["B1","-","kitabı","het boek (bepaald lijdend voorwerp; kitap = boek)","Medeklinkerverzachting: p wordt b vóór een klinker. Kitap + -ı (accusatief) → kitabı, niet 'kitapı'."],
["B1","-","dolabı","de kast (bep. lijdend voorwerp; dolap = kast)","Zelfde verzachting: p→b. Dolap + -ı → dolabı."],
["B1","-","ağacı","de boom (bep. lijdend voorwerp; ağaç = boom)","Verzachting ç→c: ağaç + -ı → ağacı."],
["A1","-","kediler","katten (kedi = kat)","Meervoud -ler: kedi heeft een voorklinker (e/i/ö/ü), dus -ler, niet -lar."],
["A1","-","kutular","dozen (kutu = doos)","Meervoud -lar: kutu heeft een achterklinker (a/ı/o/u), dus -lar, niet -ler."],
["B1","-","gözlerim","mijn ogen (göz = oog)","Meervoud + bezit gestapeld: göz+ler+im. Alle achtervoegsels volgen dezelfde voorklinker-harmonie."],
["A2","-","arabam","mijn auto (araba = auto)","Bezittelijk achtervoegsel -m: 'mijn'. Na araba (eindigt op a) blijft het gewoon -m."],
["B1","-","arabanız","uw auto (beleefd/meervoud)","Bezittelijk -nız/-niz/-nuz/-nüz volgt ook harmonie; hier -nız omdat araba een a/ı/o/u-woord is."],
["B1","-","defterde","in het schrift (defter = schrift)","Geen p/ç/t/k aan het eind, dus gewoon -de (voorklinker-harmonie, geen extra wissel nodig)."],
["B1","-","parkta","in het park (park = park)","Stemloze medeklinker aan het eind (k,p,ç,t,s,ş,h,f) maakt van -da/-de juist -ta/-te: park eindigt op k → parkta, niet 'parkda'."],
["B1","-","sokakta","op straat (sokak = straat)","Zelfde stemloze wissel: sokak eindigt op k → -ta."],
["B1","-","sokağı","de straat (bepaald lijdend voorwerp)","Verzachting k→ğ (in plaats van b of c) bij dit type woord: sokak → sokağı."],
["A2","-","Kalemim var.","ik heb een pen (kalem = pen)","Bezit -im + var: letterlijk 'mijn pen is-er'. Geen apart werkwoord 'hebben'."],
["A2","-","Kalemim yok.","ik heb geen pen","Zelfde bezitsvorm, nu met 'yok' (is er niet) voor de ontkenning."],
["B1","-","Türkiye'den","uit Turkije","Ablatief -den na een eigennaam; de apostrof scheidt het achtervoegsel van de naam, maar harmonie en uitspraak werken hetzelfde."]
];
const CATEGORY_WORDS_TR={bas:WORDS_TR_BAS,tijd:WORDS_TR_TIJD,eten:WORDS_TR_ETEN,fam:WORDS_TR_FAM,verb:WORDS_TR_VERB,reis:WORDS_TR_REIS,sport:WORDS_TR_SPORT,auto:WORDS_TR_AUTO,werk:WORDS_TR_WERK,spreek:WORDS_TR_SPREEK,rest:WORDS_TR_REST,hotel:WORDS_TR_HOTEL,ch:WORDS_TR_CH,zwit:WORDS_TR_ZWIT,gram:WORDS_TR_GRAM,zin:WORDS_TR_ZIN,naamval:WORDS_TR_NAAMVAL};
const W_TR=Object.entries(CATEGORY_WORDS_TR).flatMap(([cat,list])=>list.map(w=>[cat,...w]));

const GRAM_TR=[
["Klinkerharmonie: achtervoegsels passen zich aan","Turkse achtervoegsels hebben geen vaste klank — ze volgen de laatste klinker van het woord. Na e/i klinkt een achtervoegsel met e/i, na a/ı met a/ı, enzovoort. Zo blijft een woord prettig uit te spreken, hoeveel achtervoegsels er ook bij komen.",["evler|huizen (ev + ler)","kitaplar|boeken (kitap + lar)","gözler|ogen (göz + ler)"]],
["Agglutinatie: één stam, een rits achtervoegsels","Turks plakt betekenissen (tijd, persoon, ontkenning, vraag) als losse blokjes achter elkaar op de stam, in plaats van er aparte woorden voor te gebruiken. Elk blokje heeft een eigen, vaste rol.",["okuyorum|ik lees (nu) — oku + yor + um","geliyor musunuz?|komt u? — gel + iyor + mu + sunuz"]],
["Naamvallen light: -ı/-i en -a/-e","Een bepaald lijdend voorwerp krijgt de uitgang -ı/-i/-u/-ü (accusatief). Een richting ('naar …') krijgt -a/-e (datief) — een los voorzetsel zoals 'naar' bestaat niet, het achtervoegsel doet het werk.",["Kitabı okuyorum.|Ik lees het boek.","İstanbul'a gidiyorum.|Ik ga naar Istanbul.","Adama yardım ediyorum.|Ik help de man."]],
["Tegenwoordige tijd: -yor","Voor 'nu bezig zijn met iets' plak je -yor (plus persoonsuitgang) achter de stam. Het is verreweg de meest gebruikte tegenwoordige tijd in gesproken Turks.",["Ne yapıyorsun?|Wat ben je aan het doen?","Çalışıyorum.|Ik ben aan het werken.","Yarın İstanbul'a gidiyorum.|Morgen ga ik naar Istanbul."]],
["Verleden tijd: -dı/-di/-du/-dü","De verleden tijd volgt dezelfde klinkerharmonie als het meervoud, plus een extra wissel naar -tı/-ti/-tu/-tü na een stemloze medeklinker (p, ç, t, k, …).",["Dün çalıştım.|Ik heb gisteren gewerkt.","Eve gittim.|Ik ben naar huis gegaan."]],
["Bezit en ja/nee-vragen: var, yok en mi","Turks heeft geen werkwoord voor 'hebben': 'var' (er is) en 'yok' (er is niet) drukken bezit uit. Voor een gewone ja/nee-vraag plak je geen vraagteken-woord vast aan de zin, maar een los deeltje mi/mı/mu/mü — dat zelf ook klinkerharmonie volgt.",["Param var.|Ik heb geld.","Vaktim yok.|Ik heb geen tijd.","Türkçe biliyor musunuz?|Spreekt u Turks?"]]
];

/* ================= NEDERLANDS (grammatica, eentalig) ================= */
const CATS_NL={lidw:"Lidwoorden de/het",ww:"Werkwoordspelling",dt:"d/t/dt-fouten",spel:"Spelling: lettergrepen",zin:"Woordvolgorde",bijv:"Bijvoeglijk naamwoord",er:"Het woordje 'er'",voorz:"Vaste voorzetsels",verklein:"Verkleinwoorden & valkuilen"};
const CAT_ICON_NL={lidw:"📛",ww:"✍️",dt:"🔤",spel:"🔠",zin:"🔀",bijv:"🎨",er:"🔍",voorz:"🔗",verklein:"🤏"};

const WORDS_NL_LIDW=[
["A2","h","huisje","huisje — de of het?","Verkleinwoorden (-je) zijn altijd het-woorden, wat het grondwoord ook is."],
["A2","h","boekje","boekje — de of het?","Verkleinwoorden (-je) zijn altijd het-woorden."],
["A2","h","tafeltje","tafeltje — de of het?","Verkleinwoorden (-je) zijn altijd het-woorden, ook al is 'tafel' zelf een de-woord."],
["A2","h","kopje","kopje — de of het?","Verkleinwoorden (-je) zijn altijd het-woorden."],
["A2","h","hondje","hondje — de of het?","Verkleinwoorden (-je) zijn altijd het-woorden, ook al is 'hond' zelf een de-woord."],
["A2","h","kastje","kastje — de of het?","Verkleinwoorden (-je) zijn altijd het-woorden."],
["A2","h","bloempje","bloempje — de of het?","Verkleinwoorden zijn altijd het-woorden; de tussen-p maakt de uitspraak makkelijker."],
["A2","h","meisje","meisje — de of het?","Historisch een verkleinwoord van 'meid' — daarom, ondanks dat het over een persoon gaat, toch het."],
["A2","h","mannetje","mannetje — de of het?","Verkleinwoorden zijn altijd het-woorden, ook al is 'man' zelf een de-woord."],
["A2","h","weekje","weekje — de of het?","Verkleinwoorden zijn altijd het-woorden."],
["A2","h","feestje","feestje — de of het?","Verkleinwoorden zijn altijd het-woorden."],
["A2","h","cadeautje","cadeautje — de of het?","Verkleinwoorden zijn altijd het-woorden; bij een woord op -o komt er een extra 'tje' bij."],
["A2","d","huizen","huizen (meervoud van huis) — de of het?","Meervoudsvormen zijn altijd de-woorden, ook al is het enkelvoud 'het huis'."],
["A2","d","boeken","boeken (meervoud van boek) — de of het?","Meervoudsvormen zijn altijd de-woorden, ook al is het enkelvoud 'het boek'."],
["A2","d","kinderen","kinderen (meervoud van kind) — de of het?","Meervoudsvormen zijn altijd de-woorden, ook al is het enkelvoud 'het kind'."],
["A2","d","steden","steden (meervoud van stad) — de of het?","Meervoudsvormen zijn altijd de-woorden."],
["A2","d","dieren","dieren (meervoud van dier) — de of het?","Meervoudsvormen zijn altijd de-woorden, ook al is het enkelvoud 'het dier'."],
["A2","d","seizoenen","seizoenen (meervoud van seizoen) — de of het?","Meervoudsvormen zijn altijd de-woorden, ook al is het enkelvoud 'het seizoen'."],
["A2","d","jaren","jaren (meervoud van jaar) — de of het?","Meervoudsvormen zijn altijd de-woorden, ook al is het enkelvoud 'het jaar'."],
["A2","d","dagen","dagen (meervoud van dag) — de of het?","Meervoudsvormen zijn altijd de-woorden."],
["A2","d","weken","weken (meervoud van week) — de of het?","Meervoudsvormen zijn altijd de-woorden."],
["A2","d","problemen","problemen (meervoud van probleem) — de of het?","Meervoudsvormen zijn altijd de-woorden, ook al is het enkelvoud 'het probleem'."],
["A2","h","Nederlands","Nederlands (de taal) — de of het?","Namen van talen zijn het-woorden."],
["A2","h","Engels","Engels (de taal) — de of het?","Namen van talen zijn het-woorden."],
["A2","h","Frans","Frans (de taal) — de of het?","Namen van talen zijn het-woorden."],
["A2","h","Duits","Duits (de taal) — de of het?","Namen van talen zijn het-woorden."],
["A2","h","Spaans","Spaans (de taal) — de of het?","Namen van talen zijn het-woorden."],
["A2","h","Turks","Turks (de taal) — de of het?","Namen van talen zijn het-woorden."],
["A2","h","goud","goud — de of het?","Namen van metalen zijn het-woorden."],
["A2","h","zilver","zilver — de of het?","Namen van metalen zijn het-woorden."],
["A2","h","ijzer","ijzer — de of het?","Namen van metalen zijn het-woorden."],
["A2","h","lood","lood — de of het?","Namen van metalen zijn het-woorden."],
["A2","h","koper","koper — de of het?","Namen van metalen zijn het-woorden."],
["A2","h","tin","tin — de of het?","Namen van metalen zijn het-woorden."],
["A2","h","noorden","noorden — de of het?","Windrichtingen zijn het-woorden."],
["A2","h","zuiden","zuiden — de of het?","Windrichtingen zijn het-woorden."],
["A2","h","oosten","oosten — de of het?","Windrichtingen zijn het-woorden."],
["A2","h","westen","westen — de of het?","Windrichtingen zijn het-woorden."],
["B1","h","water","water — de of het?","Onthouden: het water."],
["B1","h","brood","brood — de of het?","Onthouden: het brood."],
["B1","h","ei","ei — de of het?","Onthouden: het ei."],
["B1","h","hoofd","hoofd — de of het?","Onthouden: het hoofd."],
["B1","h","land","land — de of het?","Onthouden: het land."],
["B1","h","jaar","jaar — de of het?","Onthouden: het jaar (het meervoud 'de jaren' is wél een de-woord)."],
["B1","h","gezin","gezin — de of het?","Onthouden: het gezin."],
["B1","h","weer","weer — de of het?","Onthouden: het weer."],
["B1","h","licht","licht — de of het?","Onthouden: het licht."],
["B1","h","papier","papier — de of het?","Onthouden: het papier."],
["B1","h","geld","geld — de of het?","Onthouden: het geld."],
["B1","h","werk","werk — de of het?","Onthouden: het werk."],
["B1","h","leven","leven — de of het?","Onthouden: het leven."],
["B1","h","gevoel","gevoel — de of het?","Onthouden: het gevoel."],
["B1","h","systeem","systeem — de of het?","Onthouden: het systeem."],
["B1","h","programma","programma — de of het?","Onthouden: het programma."],
["B1","h","idee","idee — de of het?","Onthouden: het idee."],
["B1","h","probleem","probleem — de of het?","Onthouden: het probleem (het meervoud 'de problemen' is wél een de-woord)."],
["B1","h","moment","moment — de of het?","Onthouden: het moment."],
["B1","h","project","project — de of het?","Onthouden: het project."],
["B1","h","resultaat","resultaat — de of het?","Onthouden: het resultaat."],
["B1","h","niveau","niveau — de of het?","Onthouden: het niveau."],
["B1","h","seizoen","seizoen — de of het?","Onthouden: het seizoen (het meervoud 'de seizoenen' is wél een de-woord)."],
["B1","h","gebied","gebied — de of het?","Onthouden: het gebied."],
["B1","h","bedrijf","bedrijf — de of het?","Onthouden: het bedrijf."],
["B1","h","kantoor","kantoor — de of het?","Onthouden: het kantoor."],
["B1","h","dorp","dorp — de of het?","Onthouden: het dorp."],
["B1","h","plein","plein — de of het?","Onthouden: het plein."],
["B1","h","park","park — de of het?","Onthouden: het park."],
["B1","h","museum","museum — de of het?","Onthouden: het museum."],
["B1","h","ziekenhuis","ziekenhuis — de of het?","Onthouden: het ziekenhuis."],
["B1","h","station","station — de of het?","Onthouden: het station."],
["B1","h","vliegtuig","vliegtuig — de of het?","Onthouden: het vliegtuig."],
["B1","h","glas","glas — de of het?","Onthouden: het glas."],
["B1","h","bord","bord — de of het?","Onthouden: het bord."],
["B1","h","mes","mes — de of het?","Onthouden: het mes."],
["B1","h","boek","boek — de of het?","Onthouden: het boek (het meervoud 'de boeken' is wél een de-woord)."],
["B1","h","schip","schip — de of het?","Onthouden: het schip."],
["B1","h","ijs","ijs — de of het?","Onthouden: het ijs."],
["B1","h","vuur","vuur — de of het?","Onthouden: het vuur."],
["B1","h","huis","huis — de of het?","Onthouden: het huis (het meervoud 'de huizen' is wél een de-woord)."],
["A1","d","man","man — de of het?","Onthouden: de man."],
["A1","d","vrouw","vrouw — de of het?","Onthouden: de vrouw."],
["A1","d","jongen","jongen — de of het?","Onthouden: de jongen."],
["A1","d","vriend","vriend — de of het?","Onthouden: de vriend."],
["A1","d","buurman","buurman — de of het?","Onthouden: de buurman."],
["A1","d","dokter","dokter — de of het?","Onthouden: de dokter."],
["A1","d","leraar","leraar — de of het?","Onthouden: de leraar."],
["A1","d","student","student — de of het?","Onthouden: de student."],
["A1","d","vader","vader — de of het?","Onthouden: de vader."],
["A1","d","moeder","moeder — de of het?","Onthouden: de moeder."],
["A1","d","zoon","zoon — de of het?","Onthouden: de zoon."],
["A1","d","dochter","dochter — de of het?","Onthouden: de dochter."],
["A1","d","broer","broer — de of het?","Onthouden: de broer."],
["A1","d","zus","zus — de of het?","Onthouden: de zus."],
["A1","d","oom","oom — de of het?","Onthouden: de oom."],
["A1","d","tante","tante — de of het?","Onthouden: de tante."],
["A1","d","opa","opa — de of het?","Onthouden: de opa."],
["A1","d","oma","oma — de of het?","Onthouden: de oma."],
["A1","d","hond","hond — de of het?","Onthouden: de hond (maar 'het hondje' — verkleinwoorden zijn altijd het)."],
["A1","d","kat","kat — de of het?","Onthouden: de kat."],
["A1","d","vogel","vogel — de of het?","Onthouden: de vogel."],
["A1","d","vis","vis — de of het?","Onthouden: de vis."],
["A1","d","koe","koe — de of het?","Onthouden: de koe."],
["A1","h","paard","paard — de of het?","Onthouden: het paard — één van de weinige dieren die toch een het-woord zijn."],
["A1","d","olifant","olifant — de of het?","Onthouden: de olifant."],
["A1","d","leeuw","leeuw — de of het?","Onthouden: de leeuw."],
["A1","d","muis","muis — de of het?","Onthouden: de muis (maar 'het muisje' — verkleinwoorden zijn altijd het)."],
["A1","d","aap","aap — de of het?","Onthouden: de aap."],
["A1","d","tafel","tafel — de of het?","Onthouden: de tafel (maar 'het tafeltje' — verkleinwoorden zijn altijd het)."],
["A1","d","stoel","stoel — de of het?","Onthouden: de stoel."],
["A1","d","deur","deur — de of het?","Onthouden: de deur."],
["A1","d","muur","muur — de of het?","Onthouden: de muur."],
["A1","d","lamp","lamp — de of het?","Onthouden: de lamp."],
["A1","d","klok","klok — de of het?","Onthouden: de klok."],
["A1","d","computer","computer — de of het?","Onthouden: de computer."],
["A1","d","telefoon","telefoon — de of het?","Onthouden: de telefoon."],
["A1","d","auto","auto — de of het?","Onthouden: de auto."],
["A1","d","fiets","fiets — de of het?","Onthouden: de fiets."],
["A1","d","trein","trein — de of het?","Onthouden: de trein."],
["A1","d","bus","bus — de of het?","Onthouden: de bus."],
["A1","d","straat","straat — de of het?","Onthouden: de straat."],
["A1","d","stad","stad — de of het?","Onthouden: de stad (maar 'de steden' in het meervoud is ook een de-woord)."],
["A1","d","winkel","winkel — de of het?","Onthouden: de winkel."],
["A1","d","markt","markt — de of het?","Onthouden: de markt."],
["A1","d","krant","krant — de of het?","Onthouden: de krant (maar 'het krantje' — verkleinwoorden zijn altijd het)."],
["A1","d","brief","brief — de of het?","Onthouden: de brief."],
["A1","d","foto","foto — de of het?","Onthouden: de foto."],
["A1","d","film","film — de of het?","Onthouden: de film."],
["A1","d","keuken","keuken — de of het?","Onthouden: de keuken."],
["A1","d","kamer","kamer — de of het?","Onthouden: de kamer."],
["A1","d","tuin","tuin — de of het?","Onthouden: de tuin."],
["A1","d","boom","boom — de of het?","Onthouden: de boom (maar 'de bomen' in het meervoud blijft ook de)."],
["A1","d","bloem","bloem — de of het?","Onthouden: de bloem (maar 'het bloempje' — verkleinwoorden zijn altijd het)."],
["A1","d","zon","zon — de of het?","Onthouden: de zon."],
["A1","d","maan","maan — de of het?","Onthouden: de maan (het meervoud is 'de manen', met één a — open lettergreep)."],
["A1","d","lucht","lucht — de of het?","Onthouden: de lucht."],
["A1","d","regen","regen — de of het?","Onthouden: de regen."],
["A1","d","wind","wind — de of het?","Onthouden: de wind."],
["A1","d","zomer","zomer — de of het?","Onthouden: de zomer."],
["A1","d","winter","winter — de of het?","Onthouden: de winter."],
["A1","d","lente","lente — de of het?","Onthouden: de lente."],
["A1","d","herfst","herfst — de of het?","Onthouden: de herfst."]
];

const WORDS_NL_WW=[
["A2","-","ik werkte","werken — verleden tijd, ik-vorm","'t Kofschip: de stam 'werk' eindigt op k (een 't kofschip-letter), dus -te: werkte."],
["A2","-","ik leefde","leven — verleden tijd, ik-vorm","De stam is 'leef', maar de onderliggende medeklinker is v (stemhebbend, geen 't kofschip-letter) → -de: leefde."],
["A2","-","jij praatte","praten — verleden tijd, jij-vorm","De stam 'praat' eindigt al op t ('t kofschip) → -te; samen met de stam-t wordt dat 'praatte'."],
["A2","-","wij hoorden","horen — verleden tijd, wij-vorm","De stam 'hoor' eindigt op r (geen 't kofschip-letter) → -de(n): hoorden."],
["A2","-","ik fietste","fietsen — verleden tijd, ik-vorm","De stam 'fiets' eindigt op s ('t kofschip) → -te: fietste."],
["B1","-","ik reisde","reizen — verleden tijd, ik-vorm","De stam eindigt op s, maar de onderliggende medeklinker is z (stemhebbend) → toch -de: reisde."],
["A2","-","geklopt","kloppen — voltooid deelwoord","De stam 'klop' eindigt op p ('t kofschip) → -t: geklopt."],
["A2","-","gebrand","branden — voltooid deelwoord","De stam 'brand' eindigt op d (geen 't kofschip-letter) → -d: gebrand."],
["A2","-","gewandeld","wandelen — voltooid deelwoord","De stam 'wandel' eindigt op l (geen 't kofschip-letter) → -d: gewandeld."],
["A2","-","gemist","missen — voltooid deelwoord","De stam 'mis' eindigt op s ('t kofschip) → -t: gemist."],
["B1","-","hij geloofde","geloven — verleden tijd, hij-vorm","De stam is 'geloof', maar de onderliggende medeklinker v is stemhebbend → -de: geloofde."],
["A2","-","ik stopte","stoppen — verleden tijd, ik-vorm","De stam 'stop' eindigt op p ('t kofschip) → -te: stopte."],
["A2","-","gehuurd","huren — voltooid deelwoord","De stam 'huur' eindigt op r (geen 't kofschip-letter) → -d: gehuurd."],
["B1","-","zij kuste","kussen — verleden tijd, zij-vorm (ev)","De stam 'kus' eindigt op s ('t kofschip) → -te: kuste."],
["A2","-","geregeld","regelen — voltooid deelwoord","De stam 'regel' eindigt op l (geen 't kofschip-letter) → -d: geregeld."],
["A2","-","wij hoopten","hopen — verleden tijd, wij-vorm","De stam 'hoop' eindigt op p ('t kofschip) → -te(n): hoopten."],
["A2","-","geduwd","duwen — voltooid deelwoord","De stam 'duw' eindigt op w (geen 't kofschip-letter) → -d: geduwd."],
["A2","-","ik wachtte","wachten — verleden tijd, ik-vorm","De stam 'wacht' eindigt al op t ('t kofschip) → -te; samen met de stam-t wordt dat 'wachtte'."]
];

const WORDS_NL_DT=[
["B1","-","hij wordt","worden — hij, tegenwoordige tijd","De stam 'word' eindigt al op d; erbij + t (voor hij/zij/het/u) geeft dt: wordt."],
["B1","-","ik word","worden — ik, tegenwoordige tijd","De ik-vorm krijgt nooit een t, ook al eindigt de stam op d: gewoon de kale stam 'word'."],
["B1","-","Word jij morgen dertig?","worden — vraagzin met jij (inversie)","Bij inversie (jij ná het werkwoord) krijgt de stam geen extra t: 'word', niet 'wordt'."],
["B1","-","jij vindt","vinden — jij, vóór het werkwoord","De stam 'vind' eindigt al op d; + t (voor jij/hij/u) geeft dt: vindt."],
["B1","-","Vind jij dat leuk?","vinden — vraagzin met jij (inversie)","Bij inversie krijgt de stam geen extra t: 'vind', niet 'vindt'."],
["B1","-","zij houdt","houden — zij (ev), tegenwoordige tijd","De stam 'houd' + t geeft dt: houdt."],
["B1","-","u antwoordt","antwoorden — u, tegenwoordige tijd","De stam 'antwoord' + t (voor u) geeft dt: antwoordt."],
["A2","-","jij praat","praten — jij, vóór het werkwoord","De stam 'praat' eindigt al op t — er komt geen extra t bij: gewoon 'praat', nooit 'praatt'."],
["A2","-","hij wacht","wachten — hij, tegenwoordige tijd","De stam eindigt al op t — geen dubbele t: 'wacht', niet 'wachtt'."],
["B1","-","geworden","worden — voltooid deelwoord","Bij het voltooid deelwoord speelt dt geen rol: gewoon ge + stam + en."],
["B1","-","jij rijdt","rijden — jij, vóór het werkwoord","De stam 'rijd' + t geeft dt: rijdt."],
["B1","-","Rijd jij mee?","rijden — vraagzin met jij (inversie)","Bij inversie krijgt de stam geen extra t: 'rijd', niet 'rijdt'."],
["B1","-","Hij kan boos worden.","worden — na een ander werkwoord (kan/moet/wil)","Na 'kan' blijft 'worden' een hele infinitief — geen d/t-vervoeging nodig."],
["B1","-","het gebeurt","gebeuren — het, tegenwoordige tijd","De stam 'gebeur' eindigt niet op d, dus gewoon enkele t: gebeurt (geen dt)."],
["B1","-","jij belooft","beloven — jij, vóór het werkwoord","De stam 'beloof' eindigt niet op d, dus gewoon enkele t: belooft (geen dt)."],
["B1","-","hij landt","landen — hij, tegenwoordige tijd","De stam 'land' + t geeft dt: landt."]
];

const WORDS_NL_SPEL=[
["A2","-","manen","maan — meervoud","De lange aa wordt in een open lettergreep één a: ma-nen."],
["A2","-","mannen","man — meervoud","De korte a blijft kort; om de lettergreep gesloten te houden verdubbel je de medeklinker: man-nen."],
["A2","-","boten","boot — meervoud","De lange oo wordt in een open lettergreep één o: bo-ten."],
["A2","-","botten","bot — meervoud","De korte o blijft kort; medeklinkerverdubbeling: bot-ten."],
["A2","-","peren","peer — meervoud","De lange ee wordt in een open lettergreep één e: pe-ren."],
["A2","-","pennen","pen — meervoud","De korte e blijft kort; medeklinkerverdubbeling: pen-nen."],
["A2","-","buren","buur — meervoud","De lange uu wordt in een open lettergreep één u: bu-ren."],
["A2","-","bussen","bus — meervoud","De korte u blijft kort; medeklinkerverdubbeling: bus-sen."],
["A2","-","muren","muur — meervoud","De lange uu wordt in een open lettergreep één u: mu-ren."],
["A2","-","karren","kar — meervoud","De korte a blijft kort; medeklinkerverdubbeling: kar-ren."],
["B1","-","ik woon","wonen — ik-vorm","In de kale stam (gesloten lettergreep) schrijf je de lange oo dubbel: woon."],
["B1","-","ik loop","lopen — ik-vorm","In de kale stam (gesloten lettergreep) blijft de lange oo dubbel geschreven: loop."],
["B1","-","ik zit","zitten — ik-vorm","De korte i in een gesloten lettergreep hoeft niet verdubbeld te worden: zit (de dubbele t in 'zitten' komt door de open lettergreep erna)."],
["B1","-","ik leg","leggen — ik-vorm","De korte e blijft kort in de gesloten lettergreep 'leg'; in 'leggen' wordt de g verdubbeld om de e kort te houden vóór de open lettergreep."],
["A2","-","scholen","school — meervoud","De lange oo wordt in een open lettergreep één o: scho-len."],
["A2","-","stokken","stok — meervoud","De korte o blijft kort; medeklinkerverdubbeling: stok-ken."]
];

const WORDS_NL_ZIN=[
["A2","-","Ik kijk morgen een film.","Zet in de juiste volgorde: ik / kijk morgen / een film","In een hoofdzin staat de persoonsvorm ('kijk') altijd op de tweede plaats."],
["B1","-","Morgen kijk ik een film.","Begin de zin met 'morgen' in plaats van 'ik'","Begin je met iets anders dan het onderwerp, dan verhuist het onderwerp naar plek 3 en blijft de persoonsvorm op plek 2 (inversie)."],
["B1","-","..., omdat ik morgen een film kijk.","Maak van 'ik kijk morgen een film' een omdat-bijzin","Na 'omdat' gaat de persoonsvorm helemaal naar het einde van de bijzin."],
["B1","-","Ik denk dat hij morgen komt.","ik denk / hij komt morgen → zin met 'dat'","Na 'dat' gaat het werkwoord ('komt') naar het einde van de bijzin."],
["A2","-","Kom jij morgen?","Maak een ja/nee-vraag van: jij komt morgen","Een ja/nee-vraag begint met de persoonsvorm (inversie), zonder extra t bij jij."],
["B1","-","Als ik tijd heb, help ik je.","ik heb tijd → ik help je (met 'als')","Na 'als' gaat het werkwoord naar het einde van de bijzin; in de hoofdzin erna is er weer inversie ('help ik')."],
["B1","-","Ik denk dat hij het gedaan heeft.","ik denk dat / hij heeft het gedaan","In een bijzin met twee werkwoorden gaan ze allebei naar het eind, meestal deelwoord vóór hulpwerkwoord."],
["B1","-","Ik ga morgen niet naar school.","Ontken 'ik ga morgen naar school'","'Niet' staat meestal vlak vóór het zinsdeel dat ontkend wordt (hier: 'naar school'), niet per se aan het eind."],
["A2","-","Waar ga jij naartoe?","Maak een vraag met een vraagwoord: jij gaat waarheen","Bij een vraagwoord-vraag staat het vraagwoord vooraan, gevolgd door de persoonsvorm (inversie)."],
["B1","-","Dit is het boek dat ik lees.","Maak een betrekkelijke bijzin met 'dat': dit is het boek / ik lees het","Ook in een betrekkelijke bijzin (met die/dat) gaat het werkwoord naar het einde."],
["A2","-","Ik werk en zij studeert.","Verbind met 'en': ik werk / zij studeert","'En' verbindt twee hoofdzinnen; beide houden hun eigen volgorde (persoonsvorm op plek 2)."],
["B1","-","Omdat ik moe ben, ga ik vroeg naar bed.","Begin de hele zin met de omdat-bijzin","Begint de hele zin met een bijzin, dan komt er inversie in de hoofdzin erna: 'ga ik'."],
["A2","-","Ik moet vandaag werken.","ik moet / vandaag werken","De persoonsvorm ('moet') staat op plek 2; de hele infinitief ('werken') gaat naar het einde."],
["B1","-","Ik bel jou morgen op.","opbellen: ik / jou morgen","Bij een scheidbaar werkwoord (opbellen) gaat het losse deel ('op') naar het einde van de hoofdzin."]
];

const WORDS_NL_BIJV=[
["A2","-","de grote hond","de hond + groot","Een de-woord met een lidwoord ervoor krijgt altijd -e bij het bijvoeglijk naamwoord."],
["B1","-","het grote huis","het huis + groot (met 'het')","Een het-woord mét het bepaald lidwoord 'het' krijgt tóch -e."],
["A2","-","een groot huis","huis + groot (met 'een')","Een het-woord met 'een' (onbepaald) krijgt geen -e."],
["B1","-","groot huis","huis + groot (zonder lidwoord)","Een het-woord zonder lidwoord ervoor krijgt geen -e."],
["B1","-","dit interessante boek","boek + interessant (met 'dit')","'Dit' telt als bepaald, dus toch -e — ook al is 'boek' een het-woord."],
["A2","-","een interessant boek","boek + interessant (met 'een')","Een het-woord met 'een' krijgt geen -e."],
["A2","-","de snelle auto's","de auto's + snel (meervoud)","In het meervoud krijgt het bijvoeglijk naamwoord altijd -e, bij de- én het-woorden."],
["B1","-","het kleine kind","kind + klein (met 'het')","Een het-woord met het bepaald lidwoord 'het' krijgt -e."],
["A2","-","een klein kind","kind + klein (met 'een')","Een het-woord met 'een' krijgt geen -e."],
["A2","-","de ronde tafel","de tafel + rond","Een de-woord krijgt altijd -e, met of zonder lidwoord ervoor."],
["B1","-","koud water","water + koud (zonder lidwoord)","Een het-woord zonder lidwoord ervoor (hier: een ontelbare stof) krijgt geen -e."],
["B1","-","het mooie weer","het weer + mooi","Een het-woord met 'het' krijgt -e."],
["B1","-","mijn nieuwe programma","programma + nieuw (met 'mijn')","Een bezittelijk voornaamwoord (mijn/jouw/zijn…) telt als bepaald, dus toch -e."],
["B1","-","iets lekkers","iets + lekker","Na 'iets', 'niets', 'veel' of 'wat' krijgt het bijvoeglijk naamwoord juist een -s in plaats van -e."]
];

const WORDS_NL_ER=[
["B1","-","Ik woon er.","Vervang de plaats: Ik woon in Utrecht.","'Er' als plaatsaanduiding vervangt een plaatsbepaling (hier: in Utrecht)."],
["B1","-","Ik praat erover.","Vervang: Ik praat over dat boek.","'Er' + voorzetsel (erover, ermee, erop) verwijst naar iets niet-persoonlijks dat net genoemd is."],
["B1","-","Er staat een man voor de deur.","Begin met 'er': een man staat voor de deur","'Er' is een plaatshouder-onderwerp wanneer het echte onderwerp onbepaald is en niet vooraan staat."],
["B1","-","Ik heb er twee.","Heb je broers? (antwoord met een hoeveelheid)","'Er' verwijst naar een aantal dat net genoemd is, samen met een getal of 'veel/weinig'."],
["B1","-","Er wordt gebeld.","Maak dit onpersoonlijk/lijdend: iemand belt","'Er' vult de onderwerpspositie in een lijdende zin zonder genoemd onderwerp."],
["B1","-","Ik schrijf ermee.","Vervang: Ik schrijf met die pen.","'Er' + 'mee' (van 'met') verwijst terug naar iets net genoemds."],
["B1","-","Er lopen er twee in de tuin.","Er lopen twee honden in de tuin (dubbel 'er')","Het eerste 'er' is het plaatshouder-onderwerp, het tweede verwijst naar de hoeveelheid — dat mag samen in één zin."],
["B1","-","Ik denk eraan.","Waar denk je aan? (antwoord)","'Er' + 'aan' (van 'denken aan') is dezelfde er+voorzetsel-constructie."],
["B1","-","Ja, er is nog brood.","Is er nog brood? (bevestigend antwoord)","'Er' als plaatshouder wanneer je het bestaan van iets bevestigt."],
["B1","-","Ik ga ernaartoe.","Vervang: Ik ga naar het feest.","'Er' + 'naartoe' (richting) is ook een er+voorzetsel-combinatie."],
["B1","-","Ik heb er geen.","Hoeveel appels heb je? (ontkennend antwoord)","Ook bij een ontkende hoeveelheid ('geen') gebruik je 'er'."],
["B1","-","Er wordt hier veel gezongen.","Maak dit onpersoonlijk: men zingt hier veel","Weer de lijdende vorm zonder eigen onderwerp — 'er' neemt de onderwerpspositie in."]
];

const WORDS_NL_VOORZ=[
["A2","-","houden van","___ iemand houden (liefhebben)","'Houden van' is een vaste combinatie."],
["A2","-","wachten op","___ de bus wachten","'Wachten op' is vast; niet 'wachten voor'."],
["A2","-","hopen op","___ goed weer hopen","'Hopen op' is de vaste combinatie."],
["A2","-","denken aan","___ je vakantie denken","'Denken aan' is voor iets in gedachten hebben (vgl. 'denken over' = een mening hebben)."],
["A2","-","geïnteresseerd in","___ muziek geïnteresseerd zijn","'Geïnteresseerd in' is vast."],
["A2","-","trots op","___ je werk trots zijn","'Trots op' is vast."],
["A2","-","bang voor","___ spinnen bang zijn","'Bang voor' is vast."],
["B1","-","afhankelijk van","___ je ouders afhankelijk zijn","'Afhankelijk van' is vast."],
["B1","-","zich ergeren aan","___ lawaai ergeren","'Zich ergeren aan' is vast."],
["A2","-","verliefd op","___ iemand verliefd zijn","'Verliefd op' is vast (niet 'voor')."],
["B1","-","twijfelen aan","___ jezelf twijfelen","'Twijfelen aan' is vast."],
["A2","-","genieten van","___ het weekend genieten","'Genieten van' is vast."],
["B1","-","zich verheugen op","___ de reis verheugen","'Zich verheugen op' is vast (uitkijken naar iets)."],
["B1","-","gewend aan","___ het klimaat gewend zijn","'Gewend aan' is vast."],
["B1","-","vertrouwen op","___ je gevoel vertrouwen","'Vertrouwen op' is vast."],
["B1","-","zich schamen voor","___ zijn gedrag schamen","'Zich schamen voor' is vast."]
];

const WORDS_NL_VERKLEIN=[
["A2","-","kammetje","kam — verkleinwoord","Na een korte klinker + m: -etje, met een extra m om de klank kort te houden: kammetje."],
["A2","-","krantje","krant — verkleinwoord","Na -nt: gewoon -je: krantje."],
["A2","-","ringetje","ring — verkleinwoord","Na -ng: -etje: ringetje."],
["A2","-","autootje","auto — verkleinwoord","Na een lange klinker aan het eind: -tje met verdubbelde klinker: autootje."],
["A2","-","baantje","baan — verkleinwoord","Na -aan: gewoon -tje: baantje."],
["A2","-","kippetje","kip — verkleinwoord","Na een korte klinker + p: medeklinker verdubbelen + -etje: kippetje."],
["B1","-","Hij heeft hun het boek gegeven.","hen/hun: hij heeft ___ het boek gegeven (meewerkend voorwerp)","'Hun' is het meewerkend voorwerp (aan wie?); 'hen' gebruik je als lijdend voorwerp of na een voorzetsel."],
["B1","-","Ik zag hen gisteren op straat.","hen/hun: ik zag ___ gisteren op straat (lijdend voorwerp)","'Hen' is het lijdend voorwerp (wie zag je?) — hier geen 'hun'."],
["B1","-","Ik ga met hen mee.","hen/hun: ik ga met ___ mee (na voorzetsel)","Na een voorzetsel (met, voor, door, …) gebruik je 'hen'."],
["B1","-","Is dit jouw tas?","jou/jouw: is dit ___ tas? (bezittelijk)","'Jouw' (met -w) is bezittelijk: van wie? Van jou."],
["B1","-","Dit cadeau is voor jou.","jou/jouw: dit cadeau is voor ___ (na voorzetsel)","Na een voorzetsel gebruik je 'jou' (zonder -w), nooit 'jouw'."],
["B1","-","Zij is groter dan ik.","als/dan: zij is groter ___ ik (vergelijking)","Bij een vergelijkende trap (groter, sneller, …) gebruik je 'dan', nooit 'als'."],
["B1","-","Als het regent, blijf ik binnen.","als/dan: ___ het regent, blijf ik binnen (voorwaarde)","Voor een voorwaarde ('in het geval dat') gebruik je 'als', niet 'dan'."],
["A2","-","vrouwtje","vrouw — verkleinwoord","Na -ouw: gewoon -tje: vrouwtje."]
];

const CATEGORY_WORDS_NL={lidw:WORDS_NL_LIDW,ww:WORDS_NL_WW,dt:WORDS_NL_DT,spel:WORDS_NL_SPEL,zin:WORDS_NL_ZIN,bijv:WORDS_NL_BIJV,er:WORDS_NL_ER,voorz:WORDS_NL_VOORZ,verklein:WORDS_NL_VERKLEIN};
const W_NL=Object.entries(CATEGORY_WORDS_NL).flatMap(([cat,list])=>list.map(w=>[cat,...w]));

/* ================= taal-config & decks ================= */
const DECKS={de:W_DE,tr:W_TR,nl:W_NL};
const LANGS={
  de:{id:"de",name:"Duits",flag:"🇩🇪",type:"vertaal",speechLang:"de-DE",hasArticles:true,articleLegend:[["r","der"],["e","die"],["s","das"]],cats:CATS_DE,catIcon:CAT_ICON_DE,gramGuide:GRAM_DE,
    landmarks:["🥨","⛰️","🏰","🍺","🎄"],
    cheer:{3:["Klasse!","Super gemacht!","Weiter so!","Ausgezeichnet!"],2:["Gut gemacht!","Prima!","Nicht schlecht!"],1:["Fast!","Gleich hast du's!"]}
  },
  tr:{id:"tr",name:"Turks",flag:"🇹🇷",type:"vertaal",speechLang:"tr-TR",hasArticles:false,cats:CATS_TR,catIcon:CAT_ICON_TR,gramGuide:GRAM_TR,
    landmarks:["🎈","🕌","🌷","🫖","🧿"],
    cheer:{3:["Harika!","Mükemmel!","Aferin!"],2:["Çok iyi!","Güzel!","Aynen öyle!"],1:["Neredeyse!","Devam et!"]}
  },
  nl:{id:"nl",name:"Nederlands",flag:"🇳🇱",type:"grammatica",speechLang:"nl-NL",hasArticles:true,articleLegend:[["d","de"],["h","het"]],cats:CATS_NL,catIcon:CAT_ICON_NL,
    landmarks:["🌷","🚲","🧀","⚙️","🚤"],
    cheer:{3:["Goed zo!","Knap!","Uitstekend!"],2:["Prima!","Netjes!","Bijna helemaal goed!"],1:["Bijna!","Kom op, nog een keer!"]}
  }
};
