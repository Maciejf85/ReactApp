# React Photo App

Aplikacja internetowa dedykowana fotografom. <br>
Głównym zadaniem aplikacji jest umożliwienie klientowi obejrzenia i wybrania zdjęć po sesji fotograficznej, które mają zostać poddane retuszowi, napisanie swoich uwag i dodanie odbitek.

## Użyte technologie

- _React_ , _React-router_
- _JavaScript_
- _PHP5_
- _MySQL_
- _HTML_
- _SASS_

## Opis i prezentacja

### **_1. Logowanie_**

Single page aplication składająca się z trzech głównych komponentów :

- panelu logowania
- panelu fotografa
- panelu klienta

Formularz logowania jest walidowany aby nie dopuścić do wysyłania pustych pół loginu i hasła, następnie poprzez **fetch API** dane wysyłane są do serwera a tam skrypt napisany w **PHP** wysyła zapytanie do bazy danych i sprawdza czy dany użytkownik i hasło są poprawne i czy jest to _klient_ czy _fotograf_.

Na podstawie zwróconych danych **React-router** podejmuje decyzję do którego panelu przekieruje użytkownika.

<img alt="Logo" src="http://maciejf.pl/img/reactApp/gif/login.gif" style="max-width:100%;">


### **_2. Panel fotografa_**

Panel fotografa składa się z 2 podstron kontrolowanych przez **React-router**. <br>
Strona główna to formularz służący do dodawania nowego klienta:

<img align="left" alt="Logo" src="http://maciejf.pl/img/reactApp/form.jpg" style="max-width:50%;">
<img align="right" alt="Logo" src="http://maciejf.pl/img/reactApp/gif/pole-formularza.gif" style="max-width:50%;">
<img align="right" alt="Logo" src="http://maciejf.pl/img/reactApp/gif/pole-formularza.gif" style="max-width:50%;">
<img align="right" alt="Logo" src="http://maciejf.pl/img/reactApp/gif/pole-formularza.gif" style="max-width:50%;">

