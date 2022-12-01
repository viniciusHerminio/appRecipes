import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
// import Footer from '../components/Footer';
import { fetchDrinksById, drinksAPI } from '../services/drinksAPI';
import { fetchFoodById, foodsAPI } from '../services/foodsAPI';
import '../styles/RecipeDetails.css';
import shareIcon from '../images/shareIcon.svg';

function RecipeDetails({ type, match, history }) {
  const { id } = match.params;
  const [recipe, setRecipe] = useState([]);
  const [video, setvideo] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const test = async () => {
      const thisRecipe = await type === 'meals'
        ? await fetchFoodById(id) : await fetchDrinksById(id);
      const allRecipes = await type === 'meals'
        ? await drinksAPI().then((items) => items.drinks)
        : await foodsAPI().then((items) => items.meals);
      setRecipe(thisRecipe[0]);
      setRecipes(allRecipes);
      if (type === 'meals') {
        const ytVideo = thisRecipe[0].strYoutube;
        const a = ytVideo.replace('watch?v=', 'embed/');
        setvideo(a);
      }
    };
    console.log(recipes);
    test();
  }, [id]);

  useEffect(() => {
    const arrIng = [];
    const arrMeasure = [];
    const fifth = 15;
    const getIngredients = async () => {
      for (let i = 1; i <= fifth; i += 1) {
        arrIng.push(recipe[`strIngredient${i}`]);
        arrMeasure.push(recipe[`strMeasure${i}`]);
      }
      console.log(arrIng);
      setIngredients(arrIng);
      setMeasure(arrMeasure);
    };
    getIngredients();
  }, [recipe]);

  const title = type === 'meals' ? recipe.strMeal : recipe.strDrink;
  const thumb = type === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb;
  const cat = type === 'meals' ? recipe.strCategory : recipe.strAlcoholic;

  const startRecipeClick = () => {
    // console.log(history.location);
    history.push(`${history.location.pathname}/in-progress`);
  };

  const shareClick = () => {
    copy(`http://localhost:3000${history.location.pathname}`);
    setCopied(true);
  };

  return (
    <main className="recipe">
      <section className="recipe-item">
        <h2
          data-testid="recipe-title"
        >
          { title }
        </h2>
        <img
          data-testid="recipe-photo"
          src={ thumb }
          alt={ title }
        />
        <p
          data-testid="recipe-category"
        >
          Category:
          {' '}
          { cat }
        </p>
        <div>
          <button
            className="share-btn"
            type="button"
            data-testid="share-btn"
            onClick={ shareClick }
          >
            <img
              src={ shareIcon }
              alt="Share Icon"
            />
          </button>
          { copied && <span>Link copied!</span> }
          <button className="share-btn" type="button" data-testid="favorite-btn">
            Favoritar
          </button>
        </div>
        <ul>
          Ingredients
          {ingredients.map((ing, index) => {
            if (type === 'meals') {
              return ing !== '' ? (
                <li
                  key={ `${index}-ingredient-name-and-measure` }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { ing }
                  {' '}
                  { measure[index] }
                </li>) : null;
            }
            return ing !== null ? (
              <li
                key={ `${index}-ingredient-name-and-measure` }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { ing }
                {' '}
                { measure[index] }
              </li>) : null;
          })}
        </ul>
        <h3>
          Instructions
        </h3>
        <p data-testid="instructions">
          { recipe.strInstructions }
        </p>
        {
          type === 'meals' ? <iframe
            title={ title }
            src={ video }
            data-testid="video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          /> : null
        }
      </section>
      <footer
        className="position-fixed fixed-bottom"
        data-testid="footer"
      >
        <button
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ startRecipeClick }
        >
          Start Recipe
        </button>
        {/* <Footer /> */}
      </footer>
    </main>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  type: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeDetails;
