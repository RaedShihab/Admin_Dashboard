export const options = {
      // path where resources get loaded from, or a function
  // returning a path:
  // function(lngs, namespaces) { return customPath; }
  // the returned path will interpolate lng, ns if provided like giving a static path
  loadPath: '/local/{{en}}/{{ns}}.json',

  // path to post missing resources
  addPath: 'locales/add/{{lng}}/{{ns}}',

  // your backend server supports multiloading
  // /locales/resources.json?lng=de+en&ns=ns1+ns2
  // Adapter is needed to enable MultiLoading https://github.com/i18next/i18next-multiload-backend-adapter
  // Returned JSON structure in this case is
  // {
  //  lang : {
  //   namespaceA: {},
  //   namespaceB: {},
  //   ...etc
  //  }
  // }
  allowMultiLoading: false, // set loadPath: '/locales/resources.json?lng={{lng}}&ns={{ns}}' to adapt to multiLoading

  // parse data after it has been fetched
  // in example use https://www.npmjs.com/package/json5
  // here it removes the letter a from the json (bad idea)
  parse: function(data) { return data.replace(/a/g, ''); },

  //parse data before it has been sent by addPath
  parsePayload: function(namespace, key, fallbackValue) { return { key } },

  // allow cross domain requests
  crossDomain: false,

  // allow credentials on cross domain requests
  withCredentials: false,

  // overrideMimeType sets request.overrideMimeType("application/json")
  overrideMimeType: false,

  // custom request headers sets request.setRequestHeader(key, value)
  customHeaders: {
    authorization: 'foo',
    // ...
  },

  // define a custom xhr function
  // can be used to support XDomainRequest in IE 8 and 9
  //
  // 'url' will be passed the value of 'loadPath'
  // 'options' will be this entire options object
  // 'callback' is a function that takes two parameters, 'data' and 'xhr'.
  //            'data' should be the key:value translation pairs for the
  //            requested language and namespace, or null in case of an error.
  //            'xhr' should be a status object, e.g. { status: 200 }
  // 'data' will be a key:value object used when saving missing translations
  ajax: function (url, options, callback, data) {},

  // adds parameters to resource URL. 'example.com' -> 'example.com?v=1.3.5'
  queryStringParams: { v: '1.3.5' }
}