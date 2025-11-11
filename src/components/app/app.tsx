import { ConstructorPage, Feed } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal } from '@components';
import { Route, Routes, useLocation, useNavigate, useMatch } from 'react-router-dom';
import { OrderInfo } from '../order-info/order-info'
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { checkUserAuth } from '../../services/user/actions';
import { Protected } from "../protected"
import { Login } from '../../pages/login/login'
import { Register } from '../../pages/register/register'
import { ForgotPassword } from '../../pages/forgot-password/forgot-password'
import { Profile } from '../../pages/profile/profile'
import { ResetPassword } from '../../pages/reset-password/reset-password'
import { ProfileOrders } from '../../pages/profile-orders/profile-orders'
import { getIngredients } from '../../services/ingredients/actions'
import { NotFound404 } from '../../pages/not-fount-404/not-fount-404'

const App = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const backgroundLocation = location.state?.background
  const dispatch = useDispatch();
  const feedMatch = useMatch('/feed/:number');
  const profileMatch = useMatch('/profile/orders/:number');

  useEffect(() => {
    dispatch(checkUserAuth())
    dispatch(getIngredients())
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/ingredients/:ingredientId' element={
          <div className={styles.detailPageWrap}>
            <p className={`text text_type_main-large ${styles.detailHeader}`}>
              Детали ингредиента
            </p>
            <IngredientDetails />
          </div>
        } />
        <Route path='/feed/:number' element={
          <div className={styles.detailPageWrap}>
            <p className={`text text_type_main-large ${styles.detailHeader}`}>
              {`${feedMatch?.params.number}`}
            </p>
            <OrderInfo />
          </div>
        } />
        <Route path='/login' element={<Protected onlyUnAuth component={<Login />} />} />
        <Route path='/register' element={<Protected onlyUnAuth component={<Register />} />} />
        <Route path='/forgot-password' element={<Protected onlyUnAuth component={<ForgotPassword />} />} />
        <Route path='/reset-password' element={<Protected onlyUnAuth component={<ResetPassword />} />} />
        <Route path='/profile' element={<Protected component={<Profile />} />} />
        <Route path='/profile/orders' element={<Protected component={<ProfileOrders />} />} />
        <Route path='/profile/orders/:number' element={<Protected component={<OrderInfo />} />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && <Routes>
        <Route path='/ingredients/:ingredientId' element={<Modal title={'Детали ингредиента'} onClose={() => navigate(-1)} > <IngredientDetails /> </Modal>} />
        <Route path='/feed/:number' element={<Modal title={`${feedMatch?.params.number}`} onClose={() => navigate(-1)} > <OrderInfo /> </Modal>} />
        <Route path='/profile/orders/:number' element={<Protected component={<Modal title={`${profileMatch?.params.number}`} onClose={() => navigate(-1)} > <OrderInfo /> </Modal>} />} />
      </Routes>
      }
    </div>
  )
};

export default App;
