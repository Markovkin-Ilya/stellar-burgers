import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { profileOrders } from '../../services/order/actions';
import { selectprofileOrders } from '../../services/order/slice';


export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  
  
  useEffect(() => {
      dispatch(profileOrders())
    }, []);

  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectprofileOrders);

  return <ProfileOrdersUI orders={orders} />;
};
