import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/ingredients/slice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const params = useParams();
  const ingredients = useSelector(selectIngredients);
  const ingredient = ingredients?.filter(
    (ingredient) => ingredient._id === params.ingredientId
  );
  if (ingredient) {
    const ingredientData = ingredient[0];

    if (!ingredientData) {
      return <Preloader />;
    }

    return <IngredientDetailsUI ingredientData={ingredientData} />;
  }
};
