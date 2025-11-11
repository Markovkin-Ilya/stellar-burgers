import { FC, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { selectConstructorItems, deleteConstructorItems } from '../../services/constructor/slice'
import { selectOrderRequest, selectOrderModalData, deleteOrderState, setOrederIngredients, selectOrderIngredients } from '../../services/order/slice'
import { orderBurger } from '../../services/order/actions'
import { selectUser } from '../../services/user/slice'

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(selectConstructorItems)
  const OrderIngredients = useSelector(selectOrderIngredients)
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const orderRequest = useSelector(selectOrderRequest);
  const rawOrderData = useSelector(selectOrderModalData);
  const user = useSelector(selectUser);
  const location = useLocation();
  const orderModalData = rawOrderData ? rawOrderData.order : null;
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(setOrederIngredients(constructorItems))
  }, [constructorItems]);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    else {
      if (!user) {
        navigate('/login', { state: { from: location } })
      }
      else {
        dispatch(orderBurger(OrderIngredients))
      }
    }
  };

  const closeOrderModal = () => {
    dispatch(deleteOrderState())
    dispatch(deleteConstructorItems())
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
