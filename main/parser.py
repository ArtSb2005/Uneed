import requests
from bs4 import BeautifulSoup

from main.models import Categories


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