export function formParams(params: Record<string, any>) {
  var str = "";
  for (var key in params) {
    if (str !== "") {
      str += "&";
    }
    str += key + "=" + encodeURIComponent(params[key]!.toString());
  }
  return str;
}
