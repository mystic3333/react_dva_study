import React from 'react';
import { connect } from 'dva';
import ProductPage from '../ProductPage';
// import Demo1 from '../../components/Demo1';


function IndexPage() {
  return (
    <div >
      {/* <Demo1/> */}
      home
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
