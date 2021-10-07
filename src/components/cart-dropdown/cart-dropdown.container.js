import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import CartDropdown from './cart-dropdown.component';

const TOOGLE_CART_HIDDEN = gql`
    mutation ToogleCartHidden {
        toogleCartHidden @ client
    }
`;

const GET_CART_ITEMS =  gql `
    {
        cartItems @client
    }
`;

const CartDropdownContainer = () => (
    <Mutation mutation={TOOGLE_CART_HIDDEN}>
        {
          toogleCartHidden => (  
            <Query query = {GET_CART_ITEMS}>
                {
                    ({ data: { cartItems }}) => (
                        <CartDropdown
                            cartItems={cartItems}
                            toogleCartHidden ={toogleCartHidden}
                        />
                        )
                }
            </Query>
         )
        }
    </Mutation>
);

export default CartDropdownContainer;