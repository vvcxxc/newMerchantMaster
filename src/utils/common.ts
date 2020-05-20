/**
 *
 * 数组的去重
 */
export function RemoveDup(arr: Array<any>) {
  var hash = [];
  for (var i = 0; i < arr.length; i++) {
    if (hash.indexOf(arr[i]) == -1) {
      hash.push(arr[i]);
    }
  }
  return hash;
}
