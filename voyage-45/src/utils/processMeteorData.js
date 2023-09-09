export const processDataByYear = (data) => {
    const dataByYear = {};

    data.forEach(meteor => {
      const year = new Date(meteor.properties.year).getFullYear();

      if (!dataByYear[year]) {
        dataByYear[year] = { small: 0, medium: 0, large: 0 };
      }

      if (meteor.properties.mass <= 1000) {
        dataByYear[year].small++;
      } else if (meteor.properties.mass <= 5000) {
        dataByYear[year].medium++;
      } else {
        dataByYear[year].large++;
      }
    });

    return dataByYear;
}