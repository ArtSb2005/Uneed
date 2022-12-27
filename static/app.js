let tg = window.Telegram.WebApp;
tg.expand();

tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";

function get42() {
    var tds = document.querySelectorAll('.active'),
        result = [];
    for (var i = 0; i < tds.length; i++) {
        result.push(tds[i].innerText);
    }
    return result;
}

    $(document).ready(function() {
        $('#nav-masthead li').click(function(e) {
            e.preventDefault();
            $('#nav-masthead li').removeClass("active");
            $(this).addClass("active");
        });
    });

    $('.list-prod .button_block').click(function(){
        $(this).find('path').attr('d', 'M1005.97,4556.22l-1.01,4.02a0.031,0.031,0,0,0-.01.02,0.87,0.87,0,0,1-.14.29,0.423,0.423,0,0,1-.05.07,0.7,0.7,0,0,1-.2.18,0.359,0.359,0,0,1-.1.07,0.656,0.656,0,0,1-.21.08,1.127,1.127,0,0,1-.18.03,0.185,0.185,0,0,1-.07.02H993c-0.03,0-.056-0.02-0.086-0.02a1.137,1.137,0,0,1-.184-0.04,0.779,0.779,0,0,1-.207-0.08c-0.031-.02-0.059-0.04-0.088-0.06a0.879,0.879,0,0,1-.223-0.22s-0.007-.01-0.011-0.01a1,1,0,0,1-.172-0.43l-1.541-6.14H988a1,1,0,1,1,0-2h3.188a0.3,0.3,0,0,1,.092.02,0.964,0.964,0,0,1,.923.76l1.561,6.22h9.447l0.82-3.25a1,1,0,0,1,1.21-.73A0.982,0.982,0,0,1,1005.97,4556.22Zm-7.267.47c0,0.01,0,.01,0,0.01a1,1,0,0,1-1.414,0l-2.016-2.03a0.982,0.982,0,0,1,0-1.4,1,1,0,0,1,1.414,0l1.305,1.31,4.3-4.3a1,1,0,0,1,1.41,0,1.008,1.008,0,0,1,0,1.42ZM995,4562a3,3,0,1,1-3,3A3,3,0,0,1,995,4562Zm0,4a1,1,0,1,0-1-1A1,1,0,0,0,995,4566Zm7-4a3,3,0,1,1-3,3A3,3,0,0,1,1002,4562Zm0,4a1,1,0,1,0-1-1A1,1,0,0,0,1002,4566Z');
        $(this).find('path').attr('transform', "translate(-987 -4552)");
        tg.MainButton.hide();
        tg.MainButton.setText("Вы выбрали товар 1!");
        tg.MainButton.show();
    });


    var d = document,
    itemBox = d.querySelectorAll('.item_box'), // блок каждого товара
    cartCont = d.getElementById('cart_content'); // блок вывода данных корзины
// Функция кроссбраузерной установка обработчика событий
function addEvent(elem, type, handler){
  if(elem.addEventListener){
    elem.addEventListener(type, handler, false);
  } else {
    elem.attachEvent('on'+type, function(){ handler.call( elem ); });
  }
  return false;
}
// Получаем данные из LocalStorage
function getCartData(){
  return JSON.parse(localStorage.getItem('cart'));
}
// Записываем данные в LocalStorage
function setCartData(o){
  localStorage.setItem('cart', JSON.stringify(o));
  return false;
}
// Добавляем товар в корзину
function addToCart(e){

  this.disabled = true; // блокируем кнопку на время операции с корзиной
  var cartData = getCartData() || {}, // получаем данные корзины или создаём новый объект, если данных еще нет
      parentBox = this.parentNode, // родительский элемент кнопки "Добавить в корзину"
      itemId = this.getAttribute('data-id'), // ID товара
      itemTitle = parentBox.querySelector('.item_title').innerHTML, // название товара
      itemPrice = parentBox.querySelector('.item_price').innerHTML; // стоимость товара
      itemSize = parentBox.querySelector('.active').innerText;
  if(cartData.hasOwnProperty(itemId)){ // если такой товар уже в корзине, то добавляем +1 к его количеству
    cartData[itemId][2] += 1;
  } else { // если товара в корзине еще нет, то добавляем в объект
    cartData[itemId] = [itemTitle, itemPrice, itemSize, 1];
  }
  if(!setCartData(cartData)){ // Обновляем данные в LocalStorage
    this.disabled = false; // разблокируем кнопку после обновления LS
  }
 return false;
}
// Устанавливаем обработчик события на каждую кнопку "Добавить в корзину"
for(var i = 0; i < itemBox.length; i++){
  addEvent(itemBox[i].querySelector('.add_item'), 'click', addToCart);
}
// Открываем корзину со списком добавленных товаров
function openCart(e){
  var cartData = getCartData(), // вытаскиваем все данные корзины
      totalItems = '';
  // если что-то в корзине уже есть, начинаем формировать данные для вывода
  if(cartData !== null){
    totalItems = '<table class="shopping_list"><tr><th>Наименование</th><th>Цена</th><th>Кол-во</th></tr>';
    for(var items in cartData){
      totalItems += '<tr>';
      for(var i = 0; i < cartData[items].length; i++){
        totalItems += '<td>' + cartData[items][i] + '</td>';
          console.log(cartData[items][i])
      }
      totalItems += '</tr>';
    }
    totalItems += '</table>';
    cartCont.innerHTML = totalItems;
  } else {
    // если в корзине пусто, то сигнализируем об этом
    cartCont.innerHTML = 'В корзине пусто!';
  }
  return false;
}
/* Открыть корзину */
addEvent(d.getElementById('checkout'), 'click', openCart);
/* Очистить корзину */
addEvent(d.getElementById('clear_cart'), 'click', function(e){
  localStorage.removeItem('cart');
  cartCont.innerHTML = 'Корзина очишена.';
});
