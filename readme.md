# React Photo App

Aplikacja internetowa dedykowana fotografom. <br>
Głównym zadaniem aplikacji jest umożliwienie klientowi obejrzenia i wybrania zdjęć po sesji fotograficznej, które mają zostać poddane retuszowi, napisanie swoich uwag i dodanie odbitek.

## Użyte technologie

<img src="http://maciejf.pl/img/reactApp/reaact128.png" alt="logo"> _React_ 
<img src="http://maciejf.pl/img/reactApp/reaact-router128.png" alt="logo">_React-router_

- _JavaScript_
- _PHP5_
- _MySQL_
- _HTML_
- _SASS_

## Opis i prezentacja

### **_Logowanie_**

Single page aplication składająca się z trzech głównych komponentów :

- panelu logowania
- panelu fotografa
- panelu klienta

Formularz logowania jest walidowany aby nie dopuścić do wysyłania pustych pół loginu i hasła, następnie skrypt PHP wysyła zapytanie do bazy danych i sprawdza czy dany użytkownik i hasło są poprawne i czy jest to klient czy fotograf.

Na podstawie zwróconych danych `React-router` podejmuje decyzję do którego panelu przekieruje użytkownika.

### Logowanie

<img alt="Logo" src="http://maciejf.pl/reactApp/login_1.gif" style="max-width:100%;">
