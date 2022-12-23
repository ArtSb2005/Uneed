import requests
from bs4 import BeautifulSoup

from main.models import Categories, Products


class Pars():

    def pars_catalog(self):
        url = 'https://uneed.ru/catalog/'
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'lxml')
        categories = soup.find_all('li', class_='name')
        cat_list = []
        for i in categories:
            href = i.find_all('a', href=True)
            for a in href:
                created = Categories.objects.get_or_create(title=i.text.split("\n")[1], url=str(a['href']), amount=i.text.split("\n")[2])
                if not created:
                    new_post = Categories(title=i.text.split("\n")[1], amount=i.text.split("\n")[1])
                    new_post.save()
                else:
                    model = Categories.objects.get(title=i.text.split("\n")[1])
                    model.amount = i.text.split("\n")[2]
                    model.save()
        return cat_list

    def pars_tovar(self, url_cat):
        url = f'https://uneed.ru{url_cat}?SHOWALL_1=1'
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'lxml')
        for i in soup.find_all('div', class_='catalog-block-view__item'):
            img = 'uneed.ru' + i.find_all('img', class_='img-responsive')[0]['data-src']
            color = i.find_all('div', class_='color_in_list')
            title = i.find('a', class_='dark_link').text
            url = i.find('a', class_='dark_link')['href']
            nal = i.find('span', class_='value').text
            price = ''
            try:
                price+=i.find('span', class_='price_value').text
            except:
                pass

            try:
                obj = Products.objects.get(url=url)
                Products.objects.filter(url=url).update(title=title, url=url, amount=nal, img_url=img, price=price, colors=color,
                                    category=url_cat)
            except Products.DoesNotExist:
                new_post = Products(title=title, url=url, amount=nal, img_url=img, price=price, colors=color,
                                    category=url_cat)
                new_post.save()

