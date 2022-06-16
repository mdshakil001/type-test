import { useState } from 'react';
import { useQuery } from 'react-query';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';

import { Wrapper } from './App.styles';
import { StyledButton } from './App.styles';

import Item from './Items/Item';
import Cart from './cart/Cart';

// ====== Types =====
export type CartItemType = {
	id: number;
	category: string;
	description: string;
	image: string;
	price: number;
	title: string;
	amount: number;
};

const getProducts = async (): Promise<CartItemType[]> => {
	return await (await fetch(`https://fakestoreapi.com/products`)).json();
};

function App() {
	const [cartOpen, setCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([] as CartItemType[]);
	
	const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);
	console.log("products === ", data);

	const getTotalItems = (items: CartItemType[]) =>
		items.reduce((ack: number, item) => ack + item.amount, 0);
	
	const handleAddToCart = (clickedItem: CartItemType) => { 

		setCartItems(prev => { 

			const isItemInCart = prev.find(item => item.id === clickedItem.id);
			if (isItemInCart) { 
				return prev.map(item => (
					item.id === clickedItem.id
						? { ...item, amount: item.amount + 1 }
						: item
				))
			}
			return [...prev, { ...clickedItem, amount: 1 }];
		})
	}

	const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

	// if (isLoading) return <LinearProgress />;
	if (isLoading)
		return (
			<Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<CircularProgress size={70} thickness={4} />
			</Box>
		);
	if (error) return <div>something went wrong ...!</div>;
	
	return (
		<Wrapper>
			{/* <h3>navbar</h3> */}
			<Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
				<Cart
					cartItems={cartItems}
          			addToCart={handleAddToCart}
					removeFromCart={handleRemoveFromCart}
				/>
			</Drawer>

			<StyledButton onClick={() => setCartOpen(true)}>
				<Badge badgeContent={getTotalItems(cartItems)} color='error'>
					<AddShoppingCartIcon />
				</Badge>
			</StyledButton>

			<Grid container spacing={3}>
				{data?.map((item) => {
					return <Grid item key={item.id} xs={12} sm={4}>
						<Item item={item} handleAddToCart={ handleAddToCart} />
					</Grid>
				}) }
			</Grid>
		</Wrapper>

	);
	
}

export default App;