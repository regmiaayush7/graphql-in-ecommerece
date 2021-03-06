import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import CartIcon from './cart-icon.component';

const TOOGLE_CART_HIDDEN = gql`
    mutation ToogleCartHidden {
        toogleCartHidden @ client
    }
`;


const CartIconContainer = () =>(
    <Mutation mutation={TOOGLE_CART_HIDDEN}>
        {
            toogleCartHidden => <CartIcon toogleCartHidden={toogleCartHidden}/>
        }
    </Mutation>
);

export default CartIconContainer;
 

