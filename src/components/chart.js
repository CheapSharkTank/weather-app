import React from "react";

export default function Chart(props) {
  const [chartData, setChartData] = React.useState({
    time: [],
    temp_c: [],
  });

  const updateChartData = (data) => {
    const formattedData = data.map((item) => {
      // Convert time to "10am" format
      const time = new Date(item.time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      });
      return {
        time: time,
        temp_c: item.temp_c,
      };
    });
    setChartData((prevChartData) => ({
      time: formattedData.map((item) => item.time),
      temp_c: formattedData.map((item) => item.temp_c),
    }));
  };

  React.useEffect(() => {
    if (props.futureHoursData) {
      updateChartData(props.futureHoursData);
    }
  }, [props.futureHoursData]);


  return (
    <div className="forecast--chart">
      <table className="charts-css line show-labels hide-data">
        <caption>Weather Forecast Chart</caption>

        <tbody>
          <tbody>
            {chartData.time.map((time, index) => (
              <tr key={index}>
                <th scope="row">{time}</th>
                <td
                  style={{
                    "--start": `${1 - (index + 1) * 0.1}`,
                    "--end": `${1 - (index + 2) * 0.1}`,
                  }}
                >
                  {chartData.temp_c[index]}°C
                </td>
              </tr>
            ))}
          </tbody>
        </tbody>
      </table>
    </div>
  );
}
