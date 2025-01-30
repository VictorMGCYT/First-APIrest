
function prepareGifts(gifts) {

    const dataArr = new Set(gifts);
  
    let result = [...dataArr];

    
    return result.toSorted((a, b) => a - b)
}

const gifts1 = [3, 1, 2, 3, 4, 2, 5, 5, 5, 7]

console.log(prepareGifts(gifts1))