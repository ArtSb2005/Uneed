from django.urls import path

from main import views
from main.views import *

urlpatterns = [
    path("", CatalogPageView.as_view(), name="catalogs"),
    path("<int:id>", views.CatalogPageView.detail_view, name="category"),
]