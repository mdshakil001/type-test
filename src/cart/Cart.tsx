import { Wrapper } from './Cart.styles';
import { CartItemType } from '../App'
import CartItem from '../cartItem/CartItem'

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map(item => (
          <CartItem
              key={item.id}
              item={item}
              addToCart={addToCart}
              removeFromCart={ removeFromCart}
          />
      ))}
    </Wrapper>
  );
};

export default Cart;