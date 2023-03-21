import React, {useContext, useState, useReducer} from 'react';

const DetailsContext = React.createContext();

export const DetailsDataProvider = ({children}) => {
  const [releaseData, setReleaseData] = useState([]);
  
  return (
    <DetailsContext.Provider value={{releaseData, setReleaseData}}>
      {children}
    </DetailsContext.Provider>
  );
};

export default () => useContext(DetailsContext);