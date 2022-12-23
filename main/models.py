from django.db import models

# Create your models here.
class Categories(models.Model):
    title = models.CharField(max_length=255, verbose_name='Название')
    url = models.CharField(max_length=255, verbose_name='Ссылка')
    amount = models.CharField(max_length=255, verbose_name='Кол-во')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Категории'
        verbose_name_plural = 'Категории'

class Products(models.Model):
    title = models.CharField(max_length=255, verbose_name='Название')
    url = models.CharField(max_length=255, verbose_name='Ссылка')
    amount = models.CharField(max_length=255, verbose_name='Наличие')
    img_url = models.CharField(max_length=255, verbose_name='Изображение')
    price = models.CharField(max_length=255, verbose_name='Стоимость', null=True, blank=True)
    colors = models.CharField(max_length=255, verbose_name='Цвета')
    category = models.CharField(max_length=255, verbose_name='Категория')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Товары'
        verbose_name_plural = 'Товары'