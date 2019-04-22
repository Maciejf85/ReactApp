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
Po zaznaczeniu _Nie wylogowuj mnie_, użytkownik będzie cały czas zalogowany. Wyłączenie przeglądarki nie spowoduje wylogowania.

<img alt="Logo" src="http://maciejf.pl/img/reactApp/gif/login.gif" style="max-width:100%;">

### **_2. Panel fotografa_**

Panel fotografa składa się z 2 podstron kontrolowanych przez **React-router**. <br>
Strona główna to formularz służący do dodawania nowego klienta:

#### _1. Panel fotografa --> Dodanie nowego klienta_

Formularz jest 2 krotnie walidowany.
Pierwsza walidacja, po wpisaniu wartości i odznaczeniu pola sprawdzane jest czy wprowadzone dane spełniają kryteria walidacji. Jeśli tak, pojawia się zielony znaczek sugerujący, że wszystko jest ok, w przeciwnym wypadku wyświetlana jest podpowiedź i blokowane jest wysłanie formularza.

Ostatnim etapem jest zaznaczenie checkboxów i dodanie zdjęć:

- Sesja opłacona - zaznaczenie spowoduje, że naliczana będzie opłata tylko za dodatkowe zdjęcia.
- Odbitki - włącza możliwość dodawania odbitek do wybranego zdjęcia.
- Dodawanie komentarzy - włącza możliwość dodawania uwag/komentarzy do zdjęcia.

<img  alt="Logo" src="http://maciejf.pl/img/reactApp/gif/form.gif" style="max-width:100%;">
<br>

Po wysłaniu formularza na serwerze powstaje katalog ze zdjęciami i plikiem json przechowującym informacje o wybranych zdjęciach, komentarzach i odbitkach.
Następnie do bazy **mysql** wysyłane są dane z formularza.

<img alt="Logo" src="http://maciejf.pl/img/reactApp/katalog.jpg" style="max-width:100%;">
<img alt="Logo" src="http://maciejf.pl/img/reactApp/mysql2.jpg" style="max-width:100%;">

#### _2. Panel fotografa --> Lista klientów_

Po dodaniu nowego użytkownika w bazie klientów pojawi się nowa pozycja.
Jeśli podczas dodawania sesji fotograf popełni błąd, wystarczy kliknąć przycisk _edytuj_ i poprawić dane.
Po zatwierdzeniu, wszystkie dane aktualizowane są na serwerze.

<img  alt="Logo" src="http://maciejf.pl/img/reactApp/gif/lista-klientów.gif" style="max-width:100%;">

Jeśli klienta wybierze conajmniej tyle zdjęć ile kupił w pakiecie, `status` zmieni się na _gotowe_, obok daty pojawi się link do pobrania pliku .bat który skopiuje wybrane przez klienta zdjęcia do osobnego katalogu.

Jest to bardzo przydatne jeśli po sesji mamy bardzo dużo plików i trzeba by było wyszukiwać w katalogu pliku .jpg oraz RAW zgodnego z wyborem klienta. Tutaj wszystko robi za nas przygotowany skrypt.

<img  alt="Logo" src="http://maciejf.pl/img/reactApp/gif/plik.gif" style="max-width:100%;">

Dodatkowo w prawym dolnym rogu pojawi się przycisk przenoszący nas do podstrony na której znajduje się lista wybranych przez klienta zdjęć z komentarzem i odbitkami.

<img  alt="Logo" src="http://maciejf.pl/img/reactApp/gif/lista.gif" style="max-width:100%;">
###### _słaba jakość wynika z ograniczenia palety barw do 256 kolorów_


### **_3. Panel klienta_**

<br>

Po zalogowaniu się, klient widzi podstawowe informacje odnośnie sesji oraz galerię zdjęć.

Użytkownik może wybrać interesujące go zdjęcie na 2 sposoby:

1. Klikając przycisk **wybierz** znajdujący się pod zdjęciem.

Jeśli fotograf zezwolił na dodawanie _odbitek_ i _komentarzy_ po wybraniu zdjęcia pojawią się 2 przyciski.
<br>

<img  alt="Logo"  src="http://maciejf.pl/img/reactApp/gif/button1.gif" >
Po dodaniu komentarza przycisk zmienia kolor na fioletowy, a po dodaniu odbitek przyciska zmienia kolor na zielony i pojawia się ikonka z liczbą odbitek.
<img  alt="Logo" src="http://maciejf.pl/img/reactApp/button1.jpg" >
<br>

2. Klikając w zdjęcie i wybierając z pełno ekranowej galerii.
   Galerię można przewijać klikając w strzałki obok zdjęcia na klawiaturze.

<img  alt="Logo" src="http://maciejf.pl/img/reactApp/gif/wybór_1.gif" style="max-width:100%;">
###### _słaba jakość wynika z ograniczenia palety barw do 256 kolorów_

<br>

### **_3. Na zakończenie_**

Aplikacja jest stale rozwijana, dodawane są nowe funkcjonalności.
