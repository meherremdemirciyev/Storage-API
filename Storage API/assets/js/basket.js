
function GetItems() {
    let basket = JSON.parse(localStorage.getItem('products'));

    if (basket.length === 0) {
        document.getElementById('empty').classList.remove('d-none')
        document.getElementById('btn_delete').style.display = 'none'
        document.getElementById('ttl').style.display = 'none'
    }
    else {
        document.getElementById('ttl').style.display = 'inline-block'

        document.querySelector('.table').classList.remove('d-none')
        let html = '';
        let total = 0;
        let tcount = 0;
        for (let item of basket) {
            let tprice = Number(item.Price.slice(0, -4)) * Number(item.Count)
            html += `
                <tr>
                    <th id="idd" scope="row">${item.Id}</th>
                    <td style="width:20%">
                        <img src=${item.Image} alt="">
                    </td>
                    <td>${item.Name}</td>
                    <td>
                    <button onclick="Minus(this)" class="counts minus">-</button>
                    <span class="cnt" style="font-size: 1rem;">${item.Count}</span>
                    <button onclick="Plus(this)" class="counts plus">+</button>
                    </td>
                    <td>${tprice} AZN</td>
                </tr>
            `
            total += tprice;
            tcount += item.Count;
        }
        document.querySelector('.table tbody').innerHTML = html
        document.querySelector('.total .say span').innerHTML = tcount
        document.querySelector('.total .mebleg span').innerHTML = total + ' AZN'

    }




}




GetItems();




document.getElementById('btn_delete').onclick = function () {
    localStorage.removeItem('products')
    location.reload();
}







var Minus = function (min) {
    let basket = JSON.parse(localStorage.getItem('products'));
    console.log(min.nextElementSibling.innerHTML)
    let idd = min.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML

    if (basket.length > 1) {
        let exist_prod = basket.find(pr => pr.Id === idd);
        if (Number(exist_prod.Count) > 1) {
            exist_prod.Count -= 1;
            localStorage.setItem('products', JSON.stringify(basket));
        } 
        else {
            let ubasket = basket.filter(function (obj) {
                return obj.Id != exist_prod.Id;
            });
            localStorage.setItem('products', JSON.stringify(ubasket));

        }
    } 
    else {
        let exist_prod = basket.find(pr => pr.Id === idd);
        if (Number(exist_prod.Count) > 1) {
            exist_prod.Count -= 1;
            localStorage.setItem('products', JSON.stringify(basket));
        }
        else {
            localStorage.removeItem('products')
            location.reload();
        }
    }
    GetItems()
}

var Plus = function (min) {
    let basket = JSON.parse(localStorage.getItem('products'));
    console.log(min.previousElementSibling.innerHTML)
    let idd = min.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML

    let exist_prod = basket.find(pr => pr.Id === idd);
    exist_prod.Count += 1
    localStorage.setItem('products', JSON.stringify(basket));
    GetItems()
}


