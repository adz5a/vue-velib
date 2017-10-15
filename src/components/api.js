import { struct, list, maybe, String as string, Number as number } from "tcomb";
const base = "https://opendata.paris.fr/api/records/1.0/search/";

const parseParams = ( o = {} ) => {
  return Object.keys(o)
    .reduce((res, key) => {
      return res + "&" + key + "=" + o[key];
    }, "");
};


const url = (params) => `${base}?${parseParams(Object.assign({}, params, { dataset: "stations-velib-disponibilites-en-temps-reel" }))}`;


const validateParams = struct({
  q: maybe(string),
  start: maybe(number)
}, {
  defaultProps: {
    q: "",
    start: 0
  }
});

export const validateRecord = struct({
  recordid: string,
  fields: struct({
    address: string,
    available_bike_stands: number,
    available_bikes: number,
    bike_stands: number,
    last_update: string,
    status: string // should be enum
  })
});

export const validateRecordList = list(validateRecord);

export const validateResponse = struct({
  records: validateRecordList
});

/*
 * @params = {}
 * @params.start: Number : cursor for the start
 *
 */
export const refresh = (params = {}) => {
  return new Promise((resolve) => {
    resolve(fetch(url(validateParams(params)))
      .then(res => res.json()));
  });
};
