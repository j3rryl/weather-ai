export interface WeatherModel {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    humidity: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
  };
}
