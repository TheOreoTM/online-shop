import { cart } from '$lib/stores/cart';
import { getItemByCode } from '$lib/utils';

export async function addItemToCart(itemCode: string) {
	const item = await getItemByCode(itemCode);
	const currentCart = cart;
	currentCart.update((items) => {
		const existingItem = items.find((i) => i.id === item.itemCode);
		if (item.itemQty === '0') {
			throw new Error('OutOfStock');
		}

		if (existingItem) {
			if (existingItem.quantity + 1 > parseInt(item.itemQty)) {
				existingItem.quantity = parseInt(item.itemQty);
				throw new Error('MaxQtyReached');
			}
			existingItem.quantity += 1;
		} else {
			let price = parseFloat(item.itemPrice);
			if (item.discount) {
				price = price - (price * item.discount) / 100;
			}

			items.push({
				id: item.itemCode,
				name: item.itemName,
				price: price,
				quantity: 1,
				code: item.itemCode
			});
		}
		return items;
	});
}
