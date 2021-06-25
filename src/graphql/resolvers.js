import { gql } from 'apollo-boost';

export const typeDefs = gql`
    extend type Mutation {
        ToggleCartHidden : Boolean!
    }
`;

//Selecting cartHidden property from client cache
const GET_CART_HIDDEN = gql`
    {
        cartHidden @client
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
        } 
    }
}