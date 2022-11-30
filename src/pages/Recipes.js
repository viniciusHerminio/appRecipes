import React from 'react';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function Recipes() {
  return (
    <div>
      <div>
        <h1>Recipes</h1>
      </div>
      <footer
        className="position-fixed fixed-bottom"
        data-testid="footer"

      >
        <Footer />
      </footer>
    </div>
  );
}

export default Recipes;
