from django.shortcuts import get_object_or_404, render
from django.views.generic import TemplateView

from main.models import Categories, Products
from main.parser import Pars


class CatalogPageView(TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs):
        context = super(CatalogPageView, self).get_context_data(**kwargs)
        Pars().pars_catalog()
        context['catalog'] = Categories.objects.all()
        return context

    def detail_view(request, id):
        post = get_object_or_404(Categories, id=id)
        Pars().pars_tovar(post.url)
        model = Products.objects.filter(category=post.url)
        return render(request, 'list.html', {
            'post': model
        })