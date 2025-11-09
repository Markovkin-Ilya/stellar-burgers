import { useSelector } from '../../services/store';

import styles from './constructor-page.module.css';
import { useEffect } from 'react'
import { getIngredients } from '../../services/ingredients/actions'
import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { selectIsIngredientsLoading } from "../../services/ingredients/slice"
import { FC } from 'react';
import { useDispatch } from '../../services/store';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch()
  /** TODO: взять переменную из стора */
  const isIngredientsLoading = useSelector(selectIsIngredientsLoading);

  useEffect(() => {
    if (isIngredientsLoading === false) {
    dispatch(getIngredients());
    }
  }, []);

  return (
    <>
      {!isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
