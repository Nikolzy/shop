export const state = () => ({
  productsAmount: 0,
  orders: [],
  cartItems: {},
  products: [{
    id: 1,
    imageURL: 'petrushka.jpg',
    title: 'Петрушка',
    price: '13',
    count: 1,
    description: 'Петрушка містить безліч вітамінів і мікроелементів - аскорбінову і нікотинову кислоту, тіамін, каротин, рибофлавін, ретинол, флавоноїди і фітонциди, а також калій, кальцій, магній, залізо, фосфор.'
  }, {
    id: 2,
    imageURL: 'mint.jpg',
    title: 'М\'ята',
    price: '10',
    count: 1,
    description: 'Однією з найважливіших властивостей м’яти є те, що вона створює антиспазматичні та вітрогінні ефекти, які допомагають боротися з травними проблемами, особливо у випадках шлунково-кишкових розладів, метеоризму, болі в животі або коліків.'
  }, {
    id: 3,
    imageURL: 'salad.jpg',
    title: 'Салат',
    price: '15',
    count: 1,
    description: 'Завдяки високому вмісту в листках салату вітамінів, мінералів і макроелементів, він входить в десятку корисних продуктів харчування. Його рекомендують якомога частіше вживати в їжу дітям і людям похилого віку. Адже він позитивно впливає на імунну систему, нормалізує діяльність нервової системи, допомагає швидко відновити сили після тривалої хвороби, має легкий снодійний ефект, сприяє переварюванню їжі, розпалює апетит. '
  }, {
    id: 4,
    imageURL: 'shpinat.jpg',
    title: 'Шпинат',
    price: '10',
    count: 1,
    description: 'У шпинаті є білки, вуглеводи і навіть жири: насичені та ненасичені жирні кислоти, клітковина, крохмаль; вітаміни А, Е, С, Н, К, РР, багато вітамінів групи В, бета-каротин; кальцій, магній, натрій, калій, фосфор, залізо, цинк, мідь, марганець, селен. В листях '
  }, {
    id: 5,
    imageURL: 'ukrop.jpg',
    title: 'Укроп',
    price: '12',
    count: 1,
    description: 'Кріп має сечогінні та жовчогінні властивості, а також застосовується як засіб посилення секреції молока у годуючих матерів. А ще зелень кропу миттєво полегшує головний біль і допомагає впоратися з безсонням. Настій трави кропу знижує кров\'яний тиск, розширює судини, розслаблює кишечник і збільшує діурез.'
  }]
});

export const getters = {
  getProductsAmount: state => state.productsAmount,
  getCartItems: state => state.cartItems,
  getProducts: state => state.products,
  getOrders: state => state.orders
};

export const mutations = {
  updateProductsAmount(state, payload) {
    state.cartItems[payload.id] = {
      count: +payload.count,
      price: +payload.price,
      title: state.products.find(e => e.id === payload.id).title
    };
    let count = 0;
    for (let key in state.cartItems) {
      count += state.cartItems[key].count;
    }
    state.productsAmount = count;
  },
  updateProducts(state, payload) {
    const data = state.products.find(el => el.id === payload.id);
    data.count = +payload.count;
    data.status = payload.status;
  },
  setOrder (state) {
    // const data = {};
    // let price = 0;
    // for (let key in state.cartItems) {
    //   price += state.cartItems[key].price * state.cartItems[key].count;
    // }
    // data.order = state.cartItems;
    // data.price = price;
    state.orders.push(state.cartItems);
    state.cartItems = {};
    state.productsAmount = 0;
    state.products = state.products.map(el => ({
      ...el, status: 'removed', count: 1
    }))
  }
};
