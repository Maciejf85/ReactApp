# React Photo App

Aplikacja internetowa dedykowana fotografom. <br>
Głównym zadaniem aplikacji jest umożliwienie klientowi obejrzenia i wybrania zdjęć po sesji fotograficznej, które mają zostać poddane retuszowi, napisanie swoich uwag i dodanie odbitek.

## Użyte technologie

<img src="http://maciejf.pl/img/reactApp/technologys.png" alt="logo"> _React_ <br>



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
