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