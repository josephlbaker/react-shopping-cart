import React, { PureComponent } from 'react';
import '../styles/styles.css';

class Home extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      items: []
    }
  }

  componentWillMount() {
    this.fetchItems();
  }

  fetchItems = () => {
    fetch("http://localhost:8000/", {
      method: 'GET'
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        for (let i = 0; i < res.objects.length; i++) {
          if (res.objects[i].type === 'ITEM') {
            let item = {};
            item['name'] = res.objects[i].item_data.name;
            item['price'] = (res.objects[i].item_data.variations[0].item_variation_data.price_money.amount / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });;
            item['description'] = res.objects[i].item_data.description;
            item['id'] = res.objects[i].id;
            item['quantity'] = 1;

            if (res.objects[i + 1].type === 'IMAGE') {
              item['image'] = res.objects[i + 1].image_data.url;
            }
            let joined = this.state.items.concat(item);
            this.setState({
              items: joined
            });
          };
        };
      });
  };

  render() {

    let items = this.state.items.map((item) => {
      return (
        <div className="item-wrapper" key={item.id}>
          <h3>{item.name}</h3>
          <img className="item-image" src={item.image} alt={item.name} />
        </div>
      )
    });

    return (
      <div className="store-wrapper">
        {items}
      </div>
    )
  }
}

export default Home
