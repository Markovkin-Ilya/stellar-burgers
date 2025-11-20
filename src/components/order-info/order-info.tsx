import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { useParams } from 'react-router-dom';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { selectIngredients } from '../../services/ingredients/slice';
import { selectFeedOrders } from '../../services/feed/slice';
import { getFeed } from '../../services/feed/actions';
import { getOrders } from '../../services/profile-orders/actions';
import { selectProfileOrders } from '../../services/profile-orders/slice';

export const OrderInfo: FC = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const ordersFeed = useSelector(selectFeedOrders);
  const ordersProfile = useSelector(selectProfileOrders);
  const allOrders = [...ordersFeed, ...ordersProfile];
  const order = allOrders?.filter(
    (order) => `${order.number}` === params.number
  );

  useEffect(() => {
    if (order.length === 0) {
      dispatch(getFeed());
      dispatch(getOrders());
    }
  }, []);

  const orderData = order[0];
  /** TODO: взять переменные orderData и ingredients из стора */
  const ingredientState = useSelector(selectIngredients);
  if (ingredientState) {
    const ingredients: TIngredient[] = ingredientState;

    /* Готовим данные для отображения */
    const orderInfo = useMemo(() => {
      if (!orderData || !ingredients.length) return null;

      const date = new Date(orderData.createdAt);

      type TIngredientsWithCount = {
        [key: string]: TIngredient & { count: number };
      };

      const ingredientsInfo = orderData.ingredients.reduce(
        (acc: TIngredientsWithCount, item) => {
          if (!acc[item]) {
            const ingredient = ingredients.find((ing) => ing._id === item);
            if (ingredient) {
              acc[item] = {
                ...ingredient,
                count: 1
              };
            }
          } else {
            acc[item].count++;
          }

          return acc;
        },
        {}
      );

      const total = Object.values(ingredientsInfo).reduce(
        (acc, item) => acc + item.price * item.count,
        0
      );

      return {
        ...orderData,
        ingredientsInfo,
        date,
        total
      };
    }, [orderData, ingredients]);

    if (!orderInfo) {
      return <Preloader />;
    }

    return <OrderInfoUI orderInfo={orderInfo} />;
  }
};
