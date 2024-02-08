import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import $ from 'jquery';

import React, { useEffect } from 'react';

useEffect(() => {
  // Make sure to use the correct path to your Bootstrap and Bootstrap Selectpicker JS files
  require('jquery');
  require('bootstrap/dist/js/bootstrap.bundle.min.js');
  require('bootstrap-select/dist/js/bootstrap-select.min.js');
}, []);

const BootstrapSelectpicker = () => {
  useEffect(() => {
    // Initialize the Bootstrap Selectpicker after the component mounts
    $('.selectpicker').selectpicker();
  }, []);

  return (
    <select className="selectpicker" data-live-search="true">
      <option data-tokens="apple">Apple</option>
      <option data-tokens="banana">Banana</option>
      <option data-tokens="orange">Orange</option>
    </select>
  );
};

export default BootstrapSelectpicker;
