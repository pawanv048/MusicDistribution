import React, {useContext, useState, useReducer} from 'react';

const DetailsContext = React.createContext();

export const DetailsDataProvider = ({children}) => {
  const [valueToPass, setValueToPass] = useState([]);
  
  return (
    <DetailsContext.Provider value={{valueToPass, setValueToPass}}>
      {children}
    </DetailsContext.Provider>
  );
};

export default () => useContext(DetailsContext);