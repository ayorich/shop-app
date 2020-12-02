import React, { useState } from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import * as Font from "expo-font";
// import { composeWithDevTools } from "redux-devtools-extension";
import productsReducer from "./store/reducers/products";
import ordersReducer from "./store/reducers/order";
import cartReducer from "./store/reducers/cart";
import ShopNavigator from "./navigation/ShopNavigator";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  // if (!fontLoaded) {
  //   return (
  //     <AppLoading
  //       startAsync={fetchFonts}
  //       onFinish={() => {
  //         setFontLoaded(true);
  //       }}
  //     />
  //   );
  // }

  return (
    <Provider store={store}>
      {fontLoaded ? (
        <ShopNavigator />
      ) : (
        <AppLoading
          startAsync={fetchFonts}
          onFinish={() => {
            setFontLoaded(true);
          }}
        />
      )}
    </Provider>
  );
}
