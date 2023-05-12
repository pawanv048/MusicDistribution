export const handleSearch = (searchQuery, data, searchKeys) => {
  if (!searchQuery) {
    return data;
  } else {
    const filteredData = data.filter((item) => {
      for (let key of searchKeys) {
        const itemData = item[key] ? item[key].toString().toLowerCase() : '';
        if (itemData.includes(searchQuery.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
    return filteredData;
  }
};
