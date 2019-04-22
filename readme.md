# React Photo App

Aplikacja internetowa dedykowana fotografom. <br>
Głównym zadaniem aplikacji jest umożliwienie klientowi obejrzenia i wybrania zdjęć po sesji fotograficznej, które mają zostać poddane retuszowi, napisanie swoich uwag i dodanie odbitek.

## Użyte technologie

<img alt="Logo" src="http://maciejf.pl/img/reactApp/tech60080.png" style="max-width:50%;">

## Opis i prezentacja

### **_1. Logowanie_**

Single page aplication składająca się z trzech głównych komponentów :

- panelu logowania
- panelu fotografa
- panelu klienta

Formularz logowania jest walidowany aby nie dopuścić do wysyłania pustych pół loginu i hasła, następnie poprzez **fetch API** dane wysyłane są do serwera a tam skrypt napisany w **PHP** wysyła zapytanie do bazy danych i sprawdza czy dany użytkownik i hasło są poprawne i czy jest to _klient_ czy _fotograf_.

Na podstawie zwróconych danych **React-router** podejmuje decyzję do którego panelu przekieruje użytkownika.
Po zaznaczeniu *Nie wylogowuj mnie*, użytkownik będzie cały czas zalogowany. Wyłączenie przeglądarki nie spowoduje wylogowania.

<img alt="Logo" src="http://maciejf.pl/img/reactApp/gif/login.gif" style="max-width:100%;">

### **_2. Panel fotografa_**

Panel fotografa składa się z 2 podstron kontrolowanych przez **React-router**. <br>
Strona główna to formularz służący do dodawania nowego klienta:

#### *1. Panel fotografa --> Dodanie nowego klienta*
Formularz jest 2 krotnie walidowany.
Pierwsza walidacja, po wpisaniu wartości i odznaczeniu pola sprawdzane jest czy wprowadzone dane spełniają kryteria walidacji. Jeśli tak, pojawia się zielony znaczek sugerujący, że wszystko jest ok, w przeciwnym wypadku wyświetlana jest podpowiedź i blokowane jest wysłanie formularza.

Ostatnim etapem jest zaznaczenie checkboxów i dodanie zdjęć:
* Sesja opłacona - zaznaczenie spowoduje, że naliczana będzie opłata tylko za dodatkowe zdjęcia.
* Odbitki - włącza możliwość dodawania odbitek do wybranego zdjęcia.
* Dodawanie komentarzy - włącza możliwość dodawania uwag/komentarzy do zdjęcia.

<img  alt="Logo" src="http://maciejf.pl/img/reactApp/gif/form.gif" style="max-width:100%;">
<br>

Po wysłaniu formularza na serwerze powstaje katalog ze zdjęciami i plikiem json przechowującym informacje o wybranych zdjęciach, komentarzach i odbitkach.
Następnie do bazy **mysql** wysyłane są dane z formularza.

<img alt="Logo" src="http://maciejf.pl/img/reactApp/katalog.jpg" style="max-width:100%;">
<img alt="Logo" src="http://maciejf.pl/img/reactApp/mysql2.jpg" style="max-width:100%;">

#### *2. Panel fotografa --> Lista klientów*

Po dodaniu nowego użytkownika w bazie klientów pojawi się nowa pozycja.
Jeśli podczas dodawania sesji fotograf popełni błąd, wystarczy kliknąć przycisk *edytuj* i poprawić dane.
Po zatwierdzeniu, wszystkie dane aktualizowane są na serwerze.

<img  alt="Logo" src="http://maciejf.pl/img/reactApp/gif/lista-klientów.gif" style="max-width:100%;">


Jeśli klienta wybierze conajmniej tyle zdjęć ile kupił w pakiecie, `status` zmieni się na *gotowe*, obok daty pojawi się link do pobrania pliku .bat który skopiuje wybrane przez klienta zdjęcia do osobnego katalogu.

<img  alt="Logo" src="http://maciejf.pl/img/reactApp/plik.png" style="max-width:100%;">

Dodatkowo w prawym dolnym rogu pojawi się przycisk przenoszący nas do podstrony na której znajduje się lista wybranych przez klienta zdjęć z komentarzem i odbitkami.

<img  alt="Logo" src="http://maciejf.pl/img/reactApp/gif/lista.gif" style="max-width:100%;">
