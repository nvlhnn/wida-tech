function section3(l, t, final = [], arr = [], idx = 0, val = 1) {
  while (val <= 9) {
    arr[idx] = val;
    if (idx < l - 1) {
      section3(l, t, final, arr, idx + 1, val + 1);
    } else {
      let total = arr.reduce((prev, curr) => {
        return prev + curr;
      }, 0);
      if (total == t) {
        final.push(arr.map((a) => +a.toString()));
      }
    }
    val++;
  }

  return final;
}

const res = section3(3, 15);
console.log(res);
