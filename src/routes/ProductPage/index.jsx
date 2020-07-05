import React from 'react'
import ProductList from '../../components/ProductList'
import {connect} from 'dva'

 class ProductPage extends React.Component {
    render() {
        const { product, dispatch } = this.props

        return (
            <div>
                product
                <ProductList dispatch={dispatch} product={product}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.product
    }
}

export default connect(mapStateToProps)(ProductPage)