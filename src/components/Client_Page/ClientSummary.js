import React from 'react'


class MainClient extends React.Component {
    state = {
        name: '',
        packageQ: '',
        price: '',
        priceAdd: '',
        payed: '',
        choosed: 0,
        supplement: '',
        type: ''
    }

    handleData = value => {
        this.setState({
            name: value.name + ' ' + value.surname,
            packageQ: value.package,
            price: value.price,
            priceAdd: value.price_add,
            payed: value.payed,
            type: value.typeof
        })
    }

    componentDidMount() {
        fetch(
            "https://cors-anywhere.herokuapp.com/http://maciejf.pl/reactApp/getClientData.php",
            // "http://maciejf.pl/reactApp/getClientData.php",
            {
                method: "POST",
                body: JSON.stringify({ token: this.props.value.token })
            }
        )
            .then(resp => {
                if (resp.ok) return resp.json();
                else throw new Error("Błąd sieci!");
            })
            .then(response => {
                console.log(response[0])
                this.handleData(response[0]);

            })
            .catch(err => {
                this.setState({
                    response: err
                });
            });
    }

    render() {
        const { name, packageQ, price, priceAdd, payed, choosed, type } = this.state;
        return (

            <div className='client-summary-container'>
                <h2>Podsumowanie</h2>
                <h2></h2>
                <h5>Sesja {type}</h5>
                <h6>{name}</h6>
                <h6>pakiet: {packageQ}</h6>
                <h6>cena: {price}</h6>
                <h6>sesja {payed ? 'opłacona ' : 'nieopłacona'}</h6>
                <h6>wybrane {choosed}/{packageQ}</h6>
                <h6>dopłata{(choosed - packageQ) * priceAdd}</h6>
            </div>

        )
    }
}

export default MainClient;