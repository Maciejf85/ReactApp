# React Photo App

Aplikacja internetowa dedykowana fotografom. <br>
Głównym zadaniem aplikacji jest umożliwienie klientowi wybrania zdjęć, które mają zostać poddane retuszowi, napisanie swoich uwag i dodanie odbitek.

## Użyte technologie

<img alt="Logo" src="http://maciejf.pl/img/reactApp/tech60080.png" style="max-width:50%;">

## Opis i prezentacja

### **_1. Logowanie_**

Single page aplication składająca się z trzech głównych komponentów :

- panelu logowania
- panelu fotografa
- panelu klienta

Formularz logowania jest walidowany aby nie dopuścić do wysyłania pustych pól loginu i hasła, następnie poprzez **fetch API** dane wysyłane są do serwera a tam skrypt napisany w **PHP** wysyła zapytanie do bazy danych i sprawdza czy dany użytkownik i hasło są poprawne i czy jest to **klient** czy **fotograf**.

Na podstawie zwróconych danych **React-router** podejmuje decyzję do którego panelu przekieruje użytkownika.
Po zaznaczeniu _Nie wylogowuj mnie_, użytkownik będzie cały czas zalogowany. Wyłączenie przeglądarki nie spowoduje wylogowania.

<img alt="Logo" src="http://maciejf.pl/img/reactApp/gif/login.gif" style="max-width:100%;">

### **_2. Panel fotografa_**

Panel fotografa składa się z 2 podstron. <br>
Strona główna to formularz służący do dodawania nowego klienta:

#### _1. Panel fotografa --> Dodanie nowego klienta_

Formularz jest 2 krotnie walidowany.
Pierwsza walidacja, po wpisaniu wartości i odznaczeniu pola sprawdzane jest czy wprowadzone dane spełniają kryteria walidacji. Jeśli tak, pojawia się zielony znaczek sugerujący, że wszystko jest ok, w przeciwnym wypadku wyświetlana jest podpowiedź i blokowane jest wysłanie formularza.

Druga walidacja następuje po dodaniu zdjęć i kliknięciu przycisku *wyślij*

Ostatnim etapem jest zaznaczenie checkboxów i dodanie zdjęć:

- Sesja opłacona - zaznaczenie spowoduje, że naliczana będzie opłata tylko za dodatkowe zdjęcia.
- Odbitki - włącza możliwość dodawania odbitek do wybranego zdjęcia.
- Dodawanie komentarzy - włącza możliwość dodawania uwag/komentarzy do zdjęcia.

<img  alt="Logo" src="http://maciejf.pl/img/reactApp/gif/form.gif" style="max-width:100%;">
<br>

Po wysłaniu formularza na serwerze powstaje katalog ze zdjęciami i plikiem do którego będą zapisywane informacje o wybranych zdjęciach, treść komentarzy oraz rodzaj i ilość odbitek.

Następnie do bazy **mysql** wysyłane są dane z formularza.

<img alt="Logo" src="http://maciejf.pl/img/reactApp/katalog.jpg" style="max-width:100%;">
<img alt="Logo" src="http://maciejf.pl/img/reactApp/mysql2.jpg" style="max-width:100%;">

#### _2. Panel fotografa --> Lista klientów_

Po dodaniu nowego użytkownika w bazie klientów pojawi się nowa pozycja.
Jeśli podczas dodawania sesji fotograf popełni błąd, wystarczy kliknąć przycisk _edytuj_ i poprawić błąd.
Po zatwierdzeniu, wszystkie dane aktualizowane są na serwerze, a lista jest odświeżana.

<img  alt="Logo" src="http://maciejf.pl/img/reactApp/gif/lista-klientów.gif" style="max-width:100%;">

Jeśli klient wybierze conajmniej tyle zdjęć ile kupił w pakiecie, `status` zmieni się na _gotowe_, obok daty pojawi się link do pobrania pliku .bat który skopiuje wybrane przez klienta zdjęcia do osobnego katalogu.

Jest to bardzo przydatne jeśli po sesji mamy bardzo dużo plików i trzeba by było wyszukiwać w katalogu pliku .jpg oraz RAW zgodnego z wyborem klienta. Tutaj wszystko robi za nas przygotowany skrypt.

<img  alt="Logo" src="http://maciejf.pl/img/reactApp/gif/plik.gif" style="max-width:100%;">

Dodatkowo w prawym dolnym rogu pojawi się przycisk przenoszący nas do podstrony na której znajduje się lista wybranych przez klienta zdjęć z komentarzem i odbitkami.

<img  alt="Logo" src="http://maciejf.pl/img/reactApp/gif/lista.gif" style="max-width:100%;">

##### _słaba jakość zdjeć wynika z ograniczenia palety barw do 256 kolorów_

### **_3. Panel klienta_**
<br>

Po zalogowaniu się, klient widzi podstawowe informacje o sesji oraz galerię zdjęć.

Jeśli klient wybierze więcej zdjęć niż zawiera pakiet, zacznie być naliczana dopłata za każde następne zdjęcie.
Jeśli fotograf nie zaznaczył checkboxa `sesja opłacona` to pozycja `dopłata` będzie zawierała cenę sesji + dopłatę za dodatkowe zdjęcia.

Użytkownik może wybrać interesujące go zdjęcie na 2 sposoby:

1. Klikając przycisk **wybierz** znajdujący się pod zdjęciem.

Jeśli fotograf zezwolił na dodawanie _odbitek_ i _komentarzy_ po wybraniu zdjęcia pojawią się dodatkowe przyciski.
<br>

<img  alt="Logo"  src="http://maciejf.pl/img/reactApp/gif/button1.gif" >
Jeśli zdjęcie zawiera komentarz i odbitki, przyciski zmieniają kolor i pojawia się ikonka z liczbą wybranych odbitek.
<img  alt="Logo" src="http://maciejf.pl/img/reactApp/button1.jpg" >
<br>

2. Klikając w zdjęcie i wybierając z pełno ekranowej galerii.
   Galerię można przewijać  strzałkami obok zdjęć lub tymi na klawiaturze.

<img  alt="Logo" src="http://maciejf.pl/img/reactApp/gif/wybór_1.gif" style="max-width:100%;">

##### _słaba jakość zdjeć wynika z ograniczenia palety barw do 256 kolorów_

<br>

### **_3. Na zakończenie_**

Aplikacja jest stale rozwijana, dodawane są nowe funkcjonalności.
