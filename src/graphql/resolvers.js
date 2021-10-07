import { gql } from 'apollo-boost';
import { addItemToCart } from './cart.utils';

export const typeDefs = gql`
    extend type Item {
        quantity: Int
    }
    extend type Mutation {
        ToggleCartHidden : Boolean!
        AddItemToCart(item: Item!): [Item]!
    }
`;

//Selecting cartHidden property from client cache
const GET_CART_HIDDEN = gql`
    {
        cartHidden @client
    }
`
const GET_CART_ITEMS = gql `
    {
        cartItems @client
    }
`
export const resolvers = {
    Mutation: {
        toogleCartHidden: (_root, _args, { cache }) => {
            //Reading the what is inside of cartHidden local cache using readQuery
            const { cartHidden } = cache.readQuery({
               query: GET_CART_HIDDEN,
            });
            //Modifying the content of inside of cartHidden local cache using writeQuery
            cache.writeQuery({
                query: GET_CART_HIDDEN,
                data: { cartHidden: !cartHidden}
            });
            //returning the newly modified cartHidden which is !cartHidden
            return !cartHidden;
        },
        addItemToCart: (_root, { item }, {cache}) => {
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });

            const newCartItems = addItemToCart( cartItems, item );

            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: { cartItems: newCartItems }
            })

            return newCartItems;
        }

    }
}