

if(localStorage.getItem('products') === null) {
    localStorage.setItem('products',JSON.stringify([]))
}


let buttons = document.querySelectorAll('.btn');

for(let btn of buttons) {
    btn.onclick = function(e) {
        e.preventDefault();

        let pr_id = e.target.parentElement.parentElement.id;
        let pr_name = e.target.previousElementSibling.previousElementSibling.innerHTML;
        let pr_price = e.target.previousElementSibling.innerHTML;
        let pr_image = e.target.parentElement.previousElementSibling.src;
        
        let basket = JSON.parse(localStorage.getItem('products'));

        let exist_prod = basket.find(pr => pr.Id === pr_id);

        if(exist_prod === undefined) {
            basket.push({
                Id: pr_id,
                Name: pr_name,
                Price: pr_price,
                Image: pr_image,
                Count: 1
            })
            document.querySelector('#alert p').innerHTML = 'Added to cart'
            document.getElementById('alert').style.right = '20px'
        }
        else{
            exist_prod.Count += 1;
            document.querySelector('#alert p').innerHTML = 'This product has already been added'
            document.getElementById('alert').style.right = '20px'
            document.getElementById('alert').style.backgroundColor = '#FF0033'
        }

        localStorage.setItem('products',JSON.stringify(basket));
        setTimeout(() => {
            document.getElementById('alert').style.right = '-500px'
        }, 1500);
        BasketCount();
    }
}

function BasketCount() {
  let basket = JSON.parse(localStorage.getItem('products'));
  document.getElementById('count').innerHTML =  basket.length;
}

BasketCount();